#!/usr/bin/env node

/*
 * webdriver-cluster
 * https://github.com/marcodejongh/webdriver-cluster
 *
 * Copyright (c) 2014 Marco de Jongh
 * Licensed under the MIT license.
 */

'use strict';

var computecluster = require('compute-cluster');
var glob = require('glob');
var config = require('../webdriver-cluster.json');
var _ = require('underscore');
var terminal = require('color-terminal');

// allocate a compute cluster
var cc = new computecluster({
  module: './lib/mochaworker.js'
});


cc.on('error', function(e) { console.log('OMG!', e); });
cc.on('info', function(e) { console.log('INFO:', e); });
cc.on('debug', function(e) { console.log('DEBUG:', e); });

// then you can perform work in parallel
var features = glob.sync(config.features_path)

var toRun = features.length;
var allResults = [];

function printReport (results) {
    _.each(results, function (result) {
        terminal.color('magenta').write('\n\n###### ' + _.last(result.featureFile.split('/')) + ' ########\n');


        _.each(result.result, function (item) {
            var color;
            var message = item.message;
            switch (item.type) {
                case 'error':
                    color = 'red';
                    break;
                case 'step':
                    color = 'green';
                    break;
                case 'scenario':
                    color = 'blue';
                    message = '\n' + message;
                    break;
                default:
                    color = 'white';
                    break;
            }

            terminal.color(color).write(message + '\n');
        });

    });
}


features.forEach(function (file) {
    var message = {
        path: file
    };
    cc.enqueue(message, function(err, r) {
        if (err) console.log("an error occured:", err);
        else {
            allResults.push({
                featureFile: file,
                result: r
            });
        }

        if (--toRun === 0) {
            printReport(allResults);

            cc.exit();
        }
    });
});
