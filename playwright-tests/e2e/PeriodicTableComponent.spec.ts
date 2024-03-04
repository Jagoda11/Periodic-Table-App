import { test, expect } from '@playwright/test'

test.describe('PeriodicTable Component', () => {
  test('should render correctly with default data', async ({ page }) => {
    try {
      console.log('Starting test: should render correctly with default data')
      // Navigate to the page where the component is rendered
      await page.goto('http://localhost:3001')

      // Wait for the page to be fully loaded
      await page.waitForLoadState('load')

      console.log('Current page URL:', page.url())

      // Verify that the component is rendered
      const componentExists = await page.waitForSelector('.container-fluid', { timeout: 10000 })
      console.log('Component exists:', !!componentExists)
      expect(componentExists).not.toBeNull()

      // Verify that the search input is rendered
      const searchInputExists = await page.waitForSelector('.form-control', { timeout: 10000 })
      console.log('Search input exists:', !!searchInputExists)
      expect(searchInputExists).not.toBeNull()

      // Verify that the invert button is rendered
      const invertButtonExists = await page.waitForSelector('.text-end button', { timeout: 10000 })
      console.log('Invert button exists:', !!invertButtonExists)
      expect(invertButtonExists).not.toBeNull()

      // Verify that the periodic table is rendered
      const periodicTableExists = await page.waitForSelector('.table-responsive table', {
        timeout: 10000
      })
      console.log('Periodic table exists:', !!periodicTableExists)
      expect(periodicTableExists).not.toBeNull()
    } catch (error) {
      console.log('Current page URL:', page.url())
      throw error
    }
  })

  test('should allow searching for elements', async ({ page }) => {
    try {
      // Navigate to the page where the component is rendered
      await page.goto('http://localhost:3001')
      console.log('Current page URL:', page.url())

      // Log the page content
      const content = await page.content()
      console.log(content)

      // Enter a search query in the input field
      await page.fill('.form-control', 'hydrogen')
      console.log('Entered search query: hydrogen')
      // Wait for the search results to update
      await page.waitForTimeout(10000) // Adjust timeout as needed

      // Verify that the search results are displayed correctly
      const searchResults = await page.$$('.grid-cell')
      console.log('Number of search results:', searchResults.length)
      expect(searchResults.length).toBeGreaterThan(0) // Ensure search results are displayed
    } catch (error) {
      console.log('Current page URL:', page.url())
      throw error
    }
  })

  test('should allow clicking on elements to view details', async ({ page }) => {
    try {
      // Navigate to the page where the component is rendered
      await page.goto('http://localhost:3001')
      console.log('Current page URL:', page.url())

      // Click on a grid cell to select an element
      await page.click('.grid-cell')
      console.log('Clicked on a grid cell')

      // Wait for the details panel to appear
      const detailsPanelExists = await page.waitForSelector('.element-details', { timeout: 10000 })
      console.log('Details panel exists:', !!detailsPanelExists)
      expect(detailsPanelExists).not.toBeNull()

      // Verify that the details of the selected element are displayed correctly
      const elementName = await page.innerText('.element-details h3')
      console.log('Element name:', elementName)
      expect(elementName).not.toBeNull()
    } catch (error) {
      console.log('Current page URL:', page.url())
      throw error
    }
  })
})
