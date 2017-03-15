module.exports = function () {

    this.Given(/^I open Google's search page$/, function (done) {
        driver.get('http://google.com');
        driver.wait(until.elementLocated(by.css('body')));
        done();
    });

    this.Then(/^the title is "([^"]*)"$/, function (title, done) {
        driver.getTitle().then(function(pageTitle){
            expect(pageTitle).to.equal(title);
            done();
        });
    });

    this.Then(/^I search for "([^"]*)"$/, function (keywords) {
        page.google.doSearch(keywords);
    });

    this.Then(/^I should see search results$/, function () {
        return driver.wait(until.elementsLocated(by.css('div.g')), 10000, 'no search results');
    });
};