import { test, expect } from '@playwright/test'

test.describe('PeriodicTable Component', () => {
  test('should render correctly with default data', async ({ page }) => {
    console.log('Starting test: should render correctly with default data')
    // Navigate to the page where the component is rendered
    await page.goto('http://localhost:3001')
    console.log('Current page URL:', page.url())

    // Verify that the component is rendered
    const componentExists = await page.waitForSelector('.container-fluid')
    console.log('Component exists:', !!componentExists)
    expect(componentExists).not.toBeNull()

    // Verify that the search input is rendered
    const searchInputExists = await page.waitForSelector('.form-control')
    expect(searchInputExists).not.toBeNull()

    // Verify that the invert button is rendered
    const invertButtonExists = await page.waitForSelector('.text-end button')
    expect(invertButtonExists).not.toBeNull()

    // Verify that the periodic table is rendered
    const periodicTableExists = await page.waitForSelector('.table-responsive table')
    expect(periodicTableExists).not.toBeNull()
  })

  test('should allow searching for elements', async ({ page }) => {
    // Navigate to the page where the component is rendered
    await page.goto('http://localhost:3001')

    // Enter a search query in the input field
    await page.fill('.form-control', 'hydrogen')
    // Wait for the search results to update
    await page.waitForTimeout(1000) // Adjust timeout as needed

    // Verify that the search results are displayed correctly
    const searchResults = await page.$$('.grid-cell')
    expect(searchResults.length).toBeGreaterThan(0) // Ensure search results are displayed
  })

  test('should allow clicking on elements to view details', async ({ page }) => {
    // Navigate to the page where the component is rendered
    await page.goto('http://localhost:3001')

    // Click on a grid cell to select an element
    await page.click('.grid-cell')

    // Wait for the details panel to appear
    const detailsPanelExists = await page.waitForSelector('.element-details')
    expect(detailsPanelExists).not.toBeNull()

    // Verify that the details of the selected element are displayed correctly
    const elementName = await page.innerText('.element-details h3')
    expect(elementName).not.toBeNull()
  })
})
