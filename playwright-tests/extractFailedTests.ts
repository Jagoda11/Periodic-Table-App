// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fs from 'fs'
import { JSDOM } from 'jsdom'
import * as path from 'path'

// Construct the path to the index.html file
const indexPath = path.join(__dirname, 'playwright-html-reports', 'index.html')

// Read the contents of the index.html file
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // Parse the HTML content to extract information about failed tests
  const failedTests = parseHTMLForFailedTests(data)

  // Use the extracted information as needed
  console.log('Failed tests:', failedTests)
})

// Function to parse HTML content and extract failed tests
function parseHTMLForFailedTests(htmlContent: string): string[] {
  const dom = new JSDOM(htmlContent)
  const document = dom.window.document

  // Find all elements representing failed tests
  const failedTestElements = document.querySelectorAll('.test-fail')

  // Extract the names of the failed tests
  const failedTests = Array.from(failedTestElements)
    .map((element) => {
      const testNameElement = element.querySelector('.test-name')
      return testNameElement ? testNameElement.textContent : 'Unknown test'
    })
    .filter((testName): testName is string => testName !== null)

  // Return extracted failed tests
  return failedTests
}
