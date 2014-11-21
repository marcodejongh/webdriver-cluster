process.on('message', function(message) {
    var steps = require('./steps');
    var fs = require('fs');
    var Yadda = require('yadda');
    var glob = require('glob');
    var _ = require('underscore');
    var config = require('../webdriver-cluster');
    var webdriver = require('selenium-webdriver');
    var featureParser = new Yadda.parsers.FeatureParser();
    var Yadda = require('yadda');

    Yadda.plugins.mocha.StepLevelPlugin.init();

    var library = steps.getLibrary();
    var yadda = new Yadda.Yadda(library);


    featureFile(file, function(feature) {
        var driver;

        before(function(done) {
            driver = new webdriver.Builder()
                .usingServer('http://localhost:4444/wd/hub')
                .withCapabilities(webdriver.Capabilities.firefox())
                .build();
            done();

        });

        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                console.log(step);
                yadda.yadda(step, { done: done, driver: driver});
            });
        });

        afterEach(function () {
            takeScreenshotOnFailure(this.currentTest, driver);
        });

        after(function (done) {
            driver.quit().then(function () {
                process.send('bla');
                done();
            });
        });
    });
});
