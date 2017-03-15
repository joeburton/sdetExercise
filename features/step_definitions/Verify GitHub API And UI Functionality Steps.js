/**
 * Created by kacy_ on 15/03/2017.
 */

module.exports = function () {

    // Givens
    this.Given(/^I launch the GitHub application$/, () =>
        page.common.goToUrl(shared.testProperties.urls.github)
    );

    // Whens
    this.When(/^I make a GET API call to GitHub for (.*)$/, (name) =>
        page.common.getFullName(name)
    );

    this.When(/^I sign up with (.*)$/, (username) => {
        page.common.waitAndClickElem(page.loginPage.elements.signUpBtn)
            .then(() => page.common.setElemValue(page.loginPage.elements.usernameField, username))
    });

    // Thens
    this.Then(/^the correct (.*) is returned$/, (name) => {
        expect(page.common.variables.fullname).to.equal(name)
    });

    this.Then(/^the (.*) is displayed$/, (errorMessage) =>
        page.common.isDisplayedOnPage(page.loginPage.elements.error, errorMessage)
    );
};

