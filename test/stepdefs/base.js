var webdriver = require('selenium-webdriver');
var chai = require('chai');
var expect = chai.expect;

var Steps = {
	using: function(library, ctx) {
		library
				.when("I open the test enviroment", function () {
					var self = this;
					var promise = webdriver.promise.defer();
					this.driver.get('http://www.duckduckgo.com').then(function () {
						promise.fulfill();
					});
					return promise;

				})
				.when("I open $URL", function(url) {
					var self = this;
					var promise = webdriver.promise.defer();
					this.driver.get(url).then(function () {
						promise.fulfill();
					});
					return promise;
				})
				.then("the title should be $TITLE", function(expected){
					var self = this;
					var promise = webdriver.promise.defer();
					this.driver.getTitle().then(function(title) {
						try {
							expect(expected).to.equal(title);
						} catch (e) {
							self.done(e);
						}

						promise.fulfill();
					});
					return promise;
				})
				.then("I should see a $element", function (element) {
					var self = this;
					var elementSelector = ctx.getElementFromView(element);
					var promise = webdriver.promise.defer();
					var error;
					this.driver.findElement(webdriver.By.css(elementSelector)).then(function(title) {
						try {
							expect('123').to.equal('123456');
						} catch (e) {
							self.done(e);
						}

						promise.fulfill();
					});
					return promise;

				})
				.then("I should see $text in the $element", function (expected, element) {
					var elementSelector = ctx.getElementFromView(element);
					var self = this;
					var promise = webdriver.promise.defer();
					this.driver.findElement(webdriver.By.css(elementSelector)).getText().then(function(text) {
						try {
							expect(text).to.contain(title);
						} catch (e) {
							self.done(e);
						}

						promise.fulfill();
					});
					return promise;
				})
				.when('I type $text in the $element', function (text, element) {
					var elementSelector = ctx.getElementFromView(element),
						webElement = this.driver.findElement(webdriver.By.css(elementSelector));
					var self = this;
					var promise = webdriver.promise.defer();

					webElement
						.click()
						.then(function () {
							try {
								webElement.sendKeys(text).then(function() {
									self.driver.sleep(500).then(function () {})
									promise.fulfill();
								});
							} catch (e) {
								self.done(e);
							}


						});

					return promise;
				})
	}
};

exports.steps = Steps;
