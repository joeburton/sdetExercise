var DEFAULT_WAIT_TIMEOUT_SECS = 20 * 1000,
    WAIT_FOR_PAGE_LOADED_DELAY = 3000,
    DEFAULT_SLEEP_TIMEOUT_MILLIS = 2000;

module.exports = {

    elements: {
        loader: by.css('#loader'),
        modalWindow: by.css('div[class="dialog-body"]')
    },

    /**
     * Checks if the given attribute of an element has the expected value.
     * @param {string} css selector used to locate the element
     * @param {string} attribute to inspect
     * @param {string} attribute value to use for comparrison 
     * @example
     *      shared.helper.attributeEquals('html', 'lang','en');
     */
    attributeEquals: function(selector, attributeName, value) {

        // get the element from the page
        driver.findElement(by.css(selector)).then(function(el) {

            // now get the attribute
            el.getAttribute(attributeName).then(function(attributeValue) {

                // now check its value
                expect(attributeValue).to.equal(value);
            });
        });
    },

    /**
     * checks if the correct error message is displayed within a ca-form
     * @param {string} error message to compare
     * @returns {void} fails unable to assert value matches
     * @example
     *      shared.helper.checkFieldErrorMessage('invalid phone number');
     */
    checkFieldErrorMessage: function (errorMessage) {
        shared.helper.attributeEquals("ca-form Label[data-error='" + errorMessage + "']", "data-error", errorMessage);
    },

    /**
     * Schedules a command to refresh the current page.
     * @returns {Promise} A promise that will be resolved when the navigation event has completed.
     * @example
     *      shared.helper.refreshPageWindow();
     */
    refreshPageWindow: function () {
        return driver.refresh();
    },

    /***
     * returns the value of an attribute on an element   
     * @param {string} css selector used to find the element
     * @param {string} attribute name to retrieve
     * @returns {string} the value of the attribute or empty string if not found
     * @example
     *      shared.helper.getAttributeValue('body', 'class');
     */
    getAttributeValue: function (selector, attributeName) {

        // get the element from the page
        return driver.findElement(by.css(selector)).then(function(el) {

            // now get the attribute
            return el.getAttribute(attributeName).then(function(attributeValue) {

                return attributeValue;
            })
            .catch(function(){
                return '';
            });
        });
    },

    /***
     * Get the visible (i.e. not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.
     * @param {string} css selector used to locate the element
     * @returns {string} innerText content of the element or empty string
     * @example
     *      shared.helper.getTextFromElement('h1');
     */
    getTextFromElement: function (selector) {

        // get the element from the page
        return driver.findElement(by.css(selector)).then(function(el) {

            return el.getText().then(function(value) {
                return value || '';
            });
        });
    },

    /***
     * clicks a button matching a css selector with an optional wait for visibility
     * @param {string} css selector of button to be clicked
     * @param {bool} true if a wait for visibility is required, otherwise false
     * @returns {void}
     * @example
     *      shared.helper.clickButton('button[name="button1"]');
     */
    clickButton: function (buttonSelector, waitUntilVisible) {

        if (waitUntilVisible) {
            driver.wait(until.elementLocated(by.css(buttonSelector)), DEFAULT_WAIT_TIMEOUT_SECS).click();
        }
        else {
            driver.findElement(by.css(buttonSelector)).click();
        }
    },

    // TODO: CONVERT TO SELENIUM
    clickElement: function (elementName) {
        return this.api.useCss().click(elementName.selector);
    },

    // TODO: CONVERT TO SELENIUM
    clickElementWithSelector: function (elementName) {
        return this.api.click(elementName);
    },

    // TODO: CONVERT TO SELENIUM
    clickElementWithSelectorXPATH: function (elementName) {
        return this.api.useXpath().click(elementName).useCss();

    },

    // TODO: CONVERT TO SELENIUM
    isErrorMessageDisplayed: function (errorMessage) {
        var selector = 'ca-form label[data-error="' + errorMessage + '"]';
        return this.api.assert.visible(selector);
    },

    // TODO: CONVERT TO SELENIUM
    errorMessageNotDisplayed: function () {
        var selector = 'ca-form label[data-error="This field must have a value"]';
        return this.api.assert.elementNotPresent(selector);
    },


    /***
     * waits for defined milli seconds
     */
    // TODO: CONVERT TO SELENIUM
    waitFor: function (milliSecs) {
        return this.api.pause(milliSecs);
    },

    /**
     *
     * @param sel - wait for an element to be visible with a specified time duration
     * @param timeDuration - defaulted to Default wait time
     */
    // TODO: CONVERT TO SELENIUM
    waitAndCheckForElementVisible: function (sel, timeDuration) {
        if (timeDuration === '') {
            timeDuration = DEFAULT_WAIT_TIMEOUT_SECS;
        }
        return this.api.waitForElementVisible(sel, timeDuration);
    },

    /**
     * Whenever the UI does an AJAX request it shows a loader to the user. By checking
     * for the presence of that loader, we can identify when an ajax request has completed
     */
    // TODO: CONVERT TO SELENIUM
    waitForLoaderToDisappear: function () {
        // wait for ajax loader to disappear
        return this.api.waitForElementNotVisible(page.elements.loader.selector, DEFAULT_WAIT_TIMEOUT_SECS);
    },

    // TODO: replace the contents of this function with the actual login stuff
    // TODO: CONVERT TO SELENIUM
    login: function(username, password) {

        var addFakeAuthToken = function() {
            document.addEventListener('DOMContentLoaded', function(event) {
                sessionStorage.webapiCredentials = '123';
                alert('hello');
            });
        };

        return this.api.execute(addFakeAuthToken);
    },

    /**
     * Waits for ca-crud to exist and then clicks the create button
     */
    // TODO: CONVERT TO SELENIUM
    clickCreateEntry: function () {

        var selector = '.list-view .buttons button:first-child';

        return this.api.page.helper()
            .scrollBottom()
            //                .execute('window.scrollTo(0, document.body.scrollHeight)')      // scroll to bottom to bring it into view
            //                .waitForDuration(2000)
            .waitForElementVisible(selector, DEFAULT_SLEEP_TIMEOUT_MILLIS)  // wait for the create button to appear
            .click(selector);                                               // click the create button

        // .waitForLoaderToDisappear()                // wait for ajax loader to disappear


    },

    /***
     *
     * @param element selector
     * @returns the text for each element in an array
     */
    // TODO: CONVERT TO SELENIUM
    getTextForElementsFromQuerySelector: function (element) {
        var listToArray = Array.prototype.slice;

        return listToArray.call(document.querySelectorAll(element)).map(function (item) {
            return item.textContent;
        });
    },

    /***
     *
     * @param selector
     * @returns the text for each element in an array
     */
    // TODO: CONVERT TO SELENIUM
    getTextForElementFromQuerySelector: function (selector) {
        return document.querySelector(selector).textContent;
    },

    /***
     *
     * @param data - data table of a property
     * @returns {*}
     */
    // TODO: CONVERT TO SELENIUM
    tableHeaderCheck: function (data) {
        console.log(JSON.stringify(data.hashes()));
        var list = data.hashes().map(item => item.property);
        list.forEach(key => {
            this.api.page.helper().checkAttributeInTableHeader(key);
        });
        return this.api;
    },

    // TODO: CONVERT TO SELENIUM
    viewDialogDataCheck: function (data, pageObject) {
        var list = data.hashes().map(item => item.property);
        console.log(list);
        list.forEach(key => {
            this.api.page.helper().checkValue(key, pageObject[key]);
        });
        return this.api;
    },

    // TODO: CONVERT TO SELENIUM
    checkTableHeaders: function (keyName) {
        var selector = 'ca-list th[data-key"' + keyName + '"] span';
        return this.api.assert.elementPresent(selector);
    },

    // TODO: CONVERT TO SELENIUM
    checkValue: function (keyName, arg2) {
        selector = 'ca-summary p[data-key="' + keyName + '"]';
        return this.api.expect.element(selector).text.to.contains(arg2);

    },

    // TODO: CONVERT TO SELENIUM
    checkFieldValue: function (keyname, expValue) {
        //return this.api.expect.element(keyname.selector).value.to.contains(expValue);
        return this.api.expect.element(keyname.selector).to.have.value.that.equals(expValue);
    },

    // TODO: CONVERT TO SELENIUM
    checkElementValue: function (selElement, arg2) {

        return this.api.expect.element(selElement.selector).text.to.contains(arg2);
    },

    // TODO: CONVERT TO SELENIUM
    checkElement: function (selElement) {
        this.api.page.helper().waitForDuration(5000);
        //return this.api.assert.attributeContains(selElement.selector, 'value', 'Start');
        return this.api.expect.element(selElement.selector).to.be.present;
    },

    // TODO: CONVERT TO SELENIUM
    getTextFromViewDialog: function (keyName) {
        selector = 'ca-summary p[data-key="' + keyName + '"]';
        return this.api.page.helper().getTextFromElement(selector);
    },

    // TODO: CONVERT TO SELENIUM
    getValueFromViewDialog: function (keyName) {
        selector = 'ca-summary div ca-property[name="' + keyName + '"] p';
        return this.api.page.helper().getTextFromElement(selector);
    },

    /***
     *
     * @param result object from the UI
     */
    // TODO: CONVERT TO SELENIUM
    checkError: function (result) {
        if (result.error) {
            console.log('error? ' + result.error);
        }
    },

    // TODO: CONVERT TO SELENIUM
    waitUntilElementNotPresent: function (selector) {
        return this.api.waitForElementNotPresent(selector, DEFAULT_WAIT_TIMEOUT_SECS);
    },

    // TODO: CONVERT TO SELENIUM
    waitUntilElementIsPresent: function (selector) {
        return this.api.waitForElementPresent(selector, DEFAULT_WAIT_TIMEOUT_SECS);
    },

    // TODO: CONVERT TO SELENIUM
    waitForElementVisibility: function (selector, timeOut) {
        return this.api.waitForElementVisible(selector, timeOut);
    },

    /**
     * Sets input elements where data table keys match page element keys
     * @param {object} elements - page.elements to set
     * @param {object} dataRow - single data table row that contains matching keys
     */
    // TODO: CONVERT TO SELENIUM
    setElementValuesFromDataTable: function (elements, dataRow) {

        for (var key in dataRow) {
            if (dataRow.hasOwnProperty(key) && elements.hasOwnProperty(key)) {
                console.log("dataRow[" + dataRow[key] + "]");
                //TODO: investigate why we have to setValue twice for it to be accepted!?
                // could it be an internal ca-form request or validation issue?
                this.api.setValue(elements[key].selector, '')  // there is a bug here, it does not always set value first time round so we issue a clear first
                    .setValue(elements[key].selector, dataRow[key])
                    .pause(100);
            }
        }

        // return api instance to allow chaining
        return this.api;
    },

    // TODO: CONVERT TO SELENIUM
    setSpecificElementValue: function (elementName, dataValue) {
        return this.api.setValue(elementName.selector, dataValue).pause(500);
    },

    // TODO: CONVERT TO SELENIUM
    setSpecificElementValueWithSelectorXpath: function (elementName, dataValue) {
        return this.api.pause(100).useXpath().setValue(elementName, dataValue).useCss().pause(500);
    },

    // TODO: CONVERT TO SELENIUM
    setSpecificElementValueWithSelector: function (elementName, dataValue) {
        return this.api.setValue(elementName, dataValue).pause(500);
    },

    /***
     *
     * @param value - Amount of time to wait in milliseconds
     */
    // TODO: CONVERT TO SELENIUM
    waitForDuration: function (value) {
        return this.api.pause(value);
    },

    /**
     * Check if an item exists in a ca-list table (executes JS function within the browser)
     * @param {string} columnName - the header value of the column you wish to search
     * @param {string} value - the string value you wish to search for
     */
    // TODO: CONVERT TO SELENIUM
    doesItemExistInCaList: function (columnName, value) {

        // keep a local copy of the api so we can use it in the result function
        var nightwatch = this.api;

        //
        // table search function to be executed within the browser context
        //
        var findItemInTableCell = function (colName, valueToFind) {

            // use slice to convert nodelist's to array (so we can use map/indexOf)
            var listToArray = Array.prototype.slice;

            // get an array of text from header cells
            var headers = listToArray.call(document.querySelectorAll('ca-list thead th')).map(function (item) {
                return item.getAttribute('data-key') || item.textContent || item.innerText;
                //return item.textContent;
            });

            // get the col index of the header that matched the column name passed in
            var colIndex = headers.indexOf(colName);

            // get an array of cell data for all cells within the column index found above
            var cellContent = listToArray.call(document.querySelector('ca-list table').rows).map(function (item) {
                return item.cells[colIndex].textContent || item.cells[colIndex].innerText;
            });

            // return the position of the value within the cell content array -1 = not found
            return cellContent.indexOf(valueToFind);
        }

        console.log("column name = " + columnName);

        // execute the above function in the dom and test the result
        return this.api.execute(findItemInTableCell, [columnName, value], function (result) {

            // if we got an index > -1 the item was located
            var itemFound = result.value > -1;

            // carry out the assert, if this fails the test fails
            nightwatch.assert.equal(itemFound, true, 'Checking list value ' + columnName + ' : ' + value);
        });
    },

    /***
     * Get the number of rows in the item marks
     */
    // TODO: CONVERT TO SELENIUM
    countItemMarksRows: function (expectedRows) {
        var nightwatch = this.api;

        var findNoOfRows = function (selectorValue) {
            console.log("selector = " + selectorValue);
            var listToArray = Array.prototype.slice;
            return listToArray.call(document.querySelectorAll(selectorValue)).length;
        }

        return this.api.execute(findNoOfRows, ['ca-input-array div'], function (result) {
            console.log("result = " + result.value);
            var itemFound = result.value - expectedRows > 0;

            // carry out the assert, if this fails the test fails
            nightwatch.assert.equal(itemFound, true, 'Checking the number of rows');
        });

    },

    /**
     *
     * @param selector
     * @param isoDateString
     * @returns {*}
     */
    // TODO: CONVERT TO SELENIUM
    setCaDateTimeInput: function (selector, isoDateString) {

        var nightwatch = this.api;

        // function to execute within the browser
        var setDateValue = function (sel, value) {
            var el = document.querySelector(sel);
            if (el) {
                el.value = value;
            }
        };

        // execute the above function in the dom and test the result
        return this.api.execute(setDateValue, [selector, isoDateString], function (result) {
            // check the value was set
            return nightwatch.assert.value(selector, isoDateString);
        });
    },

    /***
     * Check any rows are present
     * @returns {*}
     */
    // TODO: CONVERT TO SELENIUM
    checkRowsNotPresent: function () {
        var nightwatch = this.api;
        var findItemsNotPresent = function () {
            var temp = function () {
                if (document.querySelector('ca-list tbody tr') === null) {
                    return 1;
                } else {
                    return 0;
                }
            };
            return temp();
        };

        return this.api.execute(findItemsNotPresent, function (result) {
            var itemFound = result.value > 0;
            nightwatch.assert.equal(itemFound, true, 'Checking any records present: ');
        });
    },

    /***
     *
     * @returns {*} - ca-context value
     */
    // TODO: CONVERT TO SELENIUM
    getCaContext: function () {

        var getValue = function (selector) {
            return (document.querySelector(selector) || {}).value || '';
        }

        // execute the above function in the dom and test the result
        return this.api.execute(getValue, ['ca-context'], function (result) {
            console.log('ca-context value = ' + result.value);
            return result.value;
        });
    },

    /***
     *
     * retrieve script error record filtering by candidateNumber and syllabus
     */
    // TODO: CONVERT TO SELENIUM
    getScriptErrorRecord: function (candidateNumber, syllabus) {

        function errorRecord(candidateNumber, syllabus) {

            // use slice to convert nodelist's to array (so we can use map/indexOf)
            var listToArray = Array.prototype.slice;

            // get an array of text from header cells
            var headers = listToArray.call(document.querySelectorAll('ca-list thead th')).map(function (item) {
                return item.getAttribute('data-key') || item.textContent || item.innerText;
            });

            var rows = listToArray.call(document.querySelectorAll("ca-list table tr"));

            var record = rows.filter(function (row) {
                // append more filtering
                return row.cells[5].innerText === candidateNumber && row.cells[3].innerText === syllabus;
            })[0];

            // create an empty object to be used to build up a key/value object of cell data form the record
            var rowData = {};

            // as headers and cells sould have equal length, we can loop through the headers and build the object
            headers.forEach(function (name, index) {

                var cell = record.cells[index];

                // add property to rowData using name and its value using the index of the cell
                rowData[name] = cell.textContent || cell.innerText;
            });

            return rowData;
        }

        return this.api.execute(errorRecord, [candidateNumber, syllabus], function (result) {
            console.log('getScriptErrorRecord=', result.value);
            return result.value;
        });
    },

    /**
     * Takes a data row and checks if the items in this row exist in the table together (same row)
     * @param {object} rowToFind - single data table row that contains matching keys
     */
    // TODO: CONVERT TO SELENIUM
    verifyRowExistsInTable: function (rowToFind) {
        // keep a local copy of the api so we can use it in the result function
        var nightwatch = this.api;

        function findRowInTableContainingValues(data) {

            // use slice to convert nodelist's to array (so we can use map/indexOf)
            var listToArray = Array.prototype.slice;

            // get an array of text from header cells id's
            var headers = listToArray.call(document.querySelectorAll('ca-list thead th')).map(function (item) {
                return item.getAttribute('data-key') || item.textContent || item.innerText;
            });

            // get a list of rows elements (tr)'s
            var rows = listToArray.call(document.querySelector('ca-list table').rows);

            var jsonData = [];

            // go through each row and build a json object with keys and matching value off screen
            rows.forEach(function (row) {

                var jsonRow = {}; // temp var to hold json object (json row)

                // as headers and cells sould have equal length, we can loop through the headers and build the object
                headers.forEach(function (name, index) {

                    // grab the cell from this row with the matching index (the cell matching the header name we're interested in)
                    var cell = row.cells[index];

                    // add property to jsonRow using name as key and value from cell content
                    jsonRow[name] = cell.textContent || cell.innerText || '';
                });

                jsonData.push(jsonRow);
            });

            //console.log('data=', JSON.stringify(data));

            // now find matching rows
            var matchingRows = jsonData.filter(function (item) {

                //console.log('jsonRow=', JSON.stringify(item));

                var matchFound = true;

                // now go through the object passed in
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {

                        // does this property match?
                        if (data[key] != item[key]) {
                            matchFound = false;
                            break;
                        }
                    }
                }

                return matchFound;
            });

            //  return jsonData;
            return matchingRows.length > 0;
        }

        // execute the above function in the dom and test the result
        return this.api.execute(findRowInTableContainingValues, [rowToFind], function (result) {

            // check we got a true
            return nightwatch.assert.ok(result.value, "Check object was found in table");
        });
    },

    // TODO: CONVERT TO SELENIUM
    verifyRowDoesNotExistsInTable: function (rowToFind) {
        // keep a local copy of the api so we can use it in the result function
        var nightwatch = this.api;

        // var rowContainingValues = this.page.findRowInTable(data);
        // console.log(rowContainingValues);

        function findRowInTableContainingValues(data) {

            // use slice to convert nodelist's to array (so we can use map/indexOf)
            var listToArray = Array.prototype.slice;

            // get an array of text from header cells id's
            var headers = listToArray.call(document.querySelectorAll('ca-list thead th')).map(function (item) {
                return item.getAttribute('data-key') || item.textContent || item.innerText;
            });

            // get a list of rows elements (tr)'s
            var rows = listToArray.call(document.querySelector('ca-list table').rows);

            var jsonData = [];

            // go through each row and build a json object with keys and matching value off screen
            rows.forEach(function (row) {

                var jsonRow = {}; // temp var to hold json object (json row)

                // as headers and cells sould have equal length, we can loop through the headers and build the object
                headers.forEach(function (name, index) {

                    // grab the cell from this row with the matching index (the cell matching the header name we're interested in)
                    var cell = row.cells[index];

                    // add property to jsonRow using name as key and value from cell content
                    jsonRow[name] = cell.textContent || cell.innerText || '';
                });

                jsonData.push(jsonRow);
            });

            //console.log('data=', JSON.stringify(data));

            // now find matching rows
            var matchingRows = jsonData.filter(function (item) {

                //console.log('jsonRow=', JSON.stringify(item));

                var matchFound = true;

                // now go through the object passed in
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {

                        // does this property match?
                        if (data[key] != item[key]) {
                            matchFound = false;
                            break;
                        }
                    }
                }

                return matchFound;
            });

            //  return jsonData;
            return matchingRows.length > 0;
        }

        // execute the above function in the dom and test the result
        return this.api.execute(findRowInTableContainingValues, [rowToFind], function (result) {

            // check we got a true
            return nightwatch.assert.ok(!result.value, "Check object was not found in table");
        });
    },

    // TODO: CONVERT TO SELENIUM
    determineUserRole: function (role) {
        var username;

        switch(role) {
            case "clericalChecker":
                username = 'svcheck';
                break;
            case "processSupervisor":
                username = 'svprosup';
                break;
            case "superSupervisor":
                username = 'svsupsup';
                break;
            case "epo":
                username = 'svexamoff';
                break;
            default:
                console.log("username unknown");
        }
        return username;
    },

    // TODO: CONVERT TO SELENIUM
    determineUserPassword: function (isPasswordValid) {
        var password;

        if(isPasswordValid) {
            password = 'abc123';
        } else {
            password = 'xyz789';
        }

        return password;
    },

    // TODO: CONVERT TO SELENIUM
    modalWindowIsPresent: function (modalWindowIsPresent) {
        if(!modalWindowIsPresent) {
            return this.api.assert.elementNotPresent(page.elements.modalWindow.selector);
        }
        console.log('modal window is open');
    },

    /***
     *
     * @param columnName - column name of the table
     * @param value - value to search in that column
     * @returns {*} - click the row and returns the relevant page object
     */
    // TODO: CONVERT TO SELENIUM
    clickItemInCaList: function (columnName, value) {
        // keep a local copy of the api so we can use it in the result function
        var nightwatch = this.api;

        columnName = columnName.trim();
        value = (value + "").trim();

        // table search function to be executed within the browser context
        var clickItemInTable = function (colName, valueToFind) {

            // use slice to convert nodelist's to array (so we can use map/indexOf)
            var listToArray = Array.prototype.slice;

            // get an array of text from header cells
            var headers = listToArray.call(document.querySelectorAll('ca-list thead th')).map(function (item) {
                return item.getAttribute('data-key') || item.textContent || item.innerText;
            });

            // get the col index of the header that matched the column name passed in
            var colIndex = headers.indexOf(colName);

            // get an array of cell data for all cells within the column index found above
            var rows = document.querySelector('ca-list table').rows;

            for (var i = 0, l = rows.length; i < l; i++) {

                var row = rows[i],
                    cell = row.cells[colIndex],
                    content = cell.textContent || cell.innerText || '';

                if (content == valueToFind) {

                    // ensure the element is in view
                    row.scrollIntoView();

                    // all ca-list rows have an index, so return that index
                    // allowing click to happen via a selector

                    // return object as result. we do this because nightwatch sees a row index of 0 as false
                    return {
                        tableIndex: parseInt(row.getAttribute('data-index'), 10)
                    }
                }
            }

            return false;
        }

        // execute the above function in the dom and test the result
        return this.api.execute(clickItemInTable, [columnName, value], function (result) {

            nightwatch.assert.notEqual(result.value, false, "value not found");

            var itemToBeClicked = 'ca-list tr[data-index="' + result.value.tableIndex + '"]';
            console.log(itemToBeClicked);
            nightwatch.pause(3000);
            // click the row with the matching attribute
            return nightwatch.click(itemToBeClicked);
        });
    },


    /***
     *
     * Gets the text value from a CSS pseudo :before or :after content attribute
     * @param selector - css selector including :before or :after item
     * @param text - text for that selector
     */
    // TODO: CONVERT TO SELENIUM
    getPseudoCssTextContains: function (selector, text) {

        var nightwatch = this.api;
        const getPseudoContent = function (sel, txt) {

            var el = document.querySelector(sel.replace(/:(before|after)/gi, ''));

            if (sel.indexOf(':before') > -1) {
                return (window.getComputedStyle(el, ':before').getPropertyValue('content').replace(/"/gi, '') === txt);
            }
            else if (sel.indexOf(':after') > -1) {
                return (window.getComputedStyle(el, ':after').getPropertyValue('content').replace(/"/gi, '') === txt);
            }
        };

        // execute the above function in the dom and test the result
        return this.api.execute(getPseudoContent, [selector, text], function (result) {
            console.log("selector: " + selector + " : text: " + text);
            console.log("Sum total, matched: " + result.value + ": sum total = " + text);
            nightwatch.assert.equal(result.value, true, "Checking the total sum values is same as expected");
        });
    }

};