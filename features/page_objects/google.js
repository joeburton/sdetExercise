/**
 * We use page objects in this format to make it more logical and similar to Java/C# implementations
 */
module.exports = {

    /* list your selectors by name and assicoated CSS selector */
    elements: {
        searchInput: by.css('input[name="q"]'),
        submitButton: by.css('input[type=submit]')
    },

    /**
    * @description insert a search terms and clicks the search button
    * @param {string} keywords - search terms
    */
    doSearch: function (keywords) {
        driver.findElement(page.google.elements.searchInput).sendKeys(keywords);
        driver.findElement(page.google.elements.searchInput).sendKeys(selenium.Key.ENTER);
    }
};