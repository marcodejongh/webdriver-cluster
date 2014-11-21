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

// allocate a compute cluster
var cc = new computecluster({
  module: './lib/worker.js'
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
        console.log('\n\n##############################################');
        console.log('######     ' + result.featureFile + '########');
        console.log('##############################################\n\n');

        _.each(result.result, function (item) {
            console.log(item);
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
