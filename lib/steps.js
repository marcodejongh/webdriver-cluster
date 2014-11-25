var glob = require('glob');
var config = require('../webdriver-cluster.json');
var Yadda = require('yadda');
var _ = require('underscore');

exports.getLibrary = function (library) {


    var context = {
        getElementFromView: function (element) {
            if (context.views && context.views[element]) {
                return context.views[element];
            } else {
                //If we can not find it maybe the given string was a selector itself
                return element;
            }
        },
        views: { //TODO: Implement view support
            "search box": "#search_form_input_homepage",
            "search button": "#search_button_homepage",
            "page": "body"
        }
    };

    glob.sync(config.stepdefs_path).forEach(function (stepdef) {
        var fileName = stepdef.replace('.js', '');
        require('../' + fileName).steps.using(library, context);
    });

    return library;
};
