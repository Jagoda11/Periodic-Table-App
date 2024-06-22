"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var fs = require("fs");
var jsdom_1 = require("jsdom");
var path = require("path");
// Construct the path to the index.html file
var indexPath = path.join(__dirname, 'playwright-html-reports', 'index.html');
// Read the contents of the index.html file
fs.readFile(indexPath, 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // Parse the HTML content to extract information about failed tests
    var failedTests = parseHTMLForFailedTests(data);
    // Use the extracted information as needed
    console.log('Failed tests:', failedTests);
});
// Function to parse HTML content and extract failed tests
function parseHTMLForFailedTests(htmlContent) {
    var dom = new jsdom_1.JSDOM(htmlContent);
    var document = dom.window.document;
    // Find all elements representing failed tests
    var failedTestElements = document.querySelectorAll('.test-fail');
    // Extract the names of the failed tests
    var failedTests = Array.from(failedTestElements)
        .map(function (element) {
        var testNameElement = element.querySelector('.test-name');
        return testNameElement ? testNameElement.textContent : 'Unknown test';
    })
        .filter(function (testName) { return testName !== null; });
    // Return extracted failed tests
    return failedTests;
}
