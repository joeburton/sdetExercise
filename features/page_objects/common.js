/**
 * Created by kacy_ on 15/03/2017.
 */

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = {

    /**
     * global variables
     */
    variables: {
        fullname: null
    },

    /*
     * launch application
     */
    goToUrl(url) {
        return driver.get(url);
    },

    /*
     * Set element with a value
     */
    setElemValue(elementName, elementValue) {
        return driver.findElement(elementName).sendKeys(elementValue);
    },

    /*
     * Wait for element to be visible
     * and set it with a value
     */
    waitAndSetElemValue(elementName, elementValue) {
        return driver.wait(until.elementLocated(elementName), 300000).sendKeys(elementValue);
    },

    /*
     * Click element
     */
    clickElem(elementName) {
        return driver.findElement(elementName).click();
    },

    /*
     * Wait for element to be visible
     * and click
     */
    waitAndClickElem(elementName) {
        return driver.wait(until.elementLocated(elementName), 300000).click();
    },

    /*
     * Verify text is displayed on page
     */
    isDisplayedOnPage(elementName, elementValue) {
        return driver.wait(until.elementLocated(elementName), 300000)
            .getText().then((value) => {
                expect(value).to.equal(elementValue);
            });
    },

    /*
     * a GET call to GitHub API to
     * retrieve the correct full name
     */
    getFullName(name) {
        /*
         * the resource string contains the name argument
         */
        let nameTrimmed = name.replace(' ', '');
        const resource = `https://api.github.com/users/${nameTrimmed}`;

        const request = new XMLHttpRequest();
        request.open('GET', resource, false);
        request.onreadystatechange = () => {

            if (request.readyState === 4 && request.status === 200) {

                // console.log('Status:', request.status);
                // console.log('Body:', request.responseText);

                /*
                 * convert response string
                 * to a Javascript array
                 */
                const resArr = JSON.parse(request.responseText);

                /*
                 * store full name as a global variable
                 */
                page.common.variables.fullname = resArr.name;

                console.log(page.common.variables.fullname);
            }
        };
        request.send();
    }
};