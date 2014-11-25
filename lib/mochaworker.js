process.on('message', function(message) {
    var steps = require('./steps');
    var fs = require('fs');
    var Yadda = require('yadda');
    Yadda.plugins.mocha.StepLevelPlugin.init();

    var glob = require('glob');
    var _ = require('underscore');
    var config = require('../webdriver-cluster');
    var webdriver = require('selenium-webdriver');

    var featureParser = new Yadda.parsers.FeatureParser();


    var language = Yadda.localisation[config.yadda_language];
    var library = language.library();
    library = steps.getLibrary(library);
    var yadda = new Yadda.Yadda(library);


    function takeScreenshotOnFailure(test, driver) {
        if (test.state != 'passed') {
            var path = 'screenshots/' + test.title.replace(/\W+/g, '_').toLowerCase() + '.png';
            driver.takeScreenshot().then(function(data) {
                fs.writeFile(path, data, 'base64', function () {});
            });
        }
    }

    featureFile([message.path], function(feature) {
        var driver;

        process.stderr.write("to err is lame!33333  err: \n");


    });
});
