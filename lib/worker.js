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


    var library = steps.getLibrary();
    var yadda = new Yadda.Yadda(library);

    var feature = featureParser.parse(fs.readFileSync(message.path, 'utf8'));

    var driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();

    // process.stderr.write("to err is lame!  err: " + err + "\n");
    var flow = webdriver.promise.controlFlow();

    feature.scenarios.forEach(function(scenario) {


        _.each(scenario.steps, function (step) {
            flow.execute(function () {
                yadda.yadda(step, { driver: driver});
            });
        });
    });

    flow.execute(function () {
        process.stderr.write("DONE\n");
        driver.quit().then(function () {
            process.send('done!');
        });
    });
});
