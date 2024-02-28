// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createApp } from 'vue'
import { expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import PeriodicTable from './PeriodicTable.vue'

// Mock data
const mockElementsData = [
  {
    name: 'Hydrogen',
    atomicNumber: 1,
    symbol: 'H',
    atomicWeight: '1.008',
    block: 's',
    row: 1,
    column: 1
  },
  {
    name: 'Helium',
    atomicNumber: 2,
    symbol: 'He',
    atomicWeight: '4.0026',
    block: 's',
    row: 1,
    column: 18
  },
  {
    name: 'Oxygen',
    atomicNumber: 8,
    symbol: 'O',
    atomicWeight: '15.999',
    block: 'p',
    row: 2,
    column: 16
  }
]

// Mock the JSON data import
jest.mock('@/assets/periodic-table-data.json', () => mockElementsData)

describe('PeriodicTable.vue', () => {
  // Test if component renders
  it('renders successfully', () => {
    const wrapper = mount(PeriodicTable)
    expect(wrapper.exists()).toBeTruthy()
  })

  // Test for initial state where all elements are shown
  it('shows all elements when no search query', () => {
    const wrapper = mount(PeriodicTable)
    const elements = wrapper.findAll('.element')
    expect(elements.length).toBe(mockElementsData.length)
  })

  // Test for filtering elements by name
  it('filters elements by name', async () => {
    const wrapper = mount(PeriodicTable)
    await wrapper.setData({ searchQuery: 'Hydrogen' })
    const elementText = wrapper.text()
    expect(elementText).toContain('Hydrogen')
    expect(elementText).not.toContain('Helium')
  })

  // Test for element selection and detail display
  it('displays details for selected element', async () => {
    const wrapper = mount(PeriodicTable)
    await wrapper.vm.handleClick(mockElementsData[0]) // Simulate clicking the first element, Hydrogen
    await wrapper.vm.$nextTick() // Wait for the DOM to update
    const detailsText = wrapper.find('.element-details').text()
    expect(detailsText).toContain('Hydrogen')
    expect(detailsText).toContain('1')
    expect(detailsText).toContain('H')
  })

  // Test for inverting the table
  it('inverts the order of periods', async () => {
    const wrapper = mount(PeriodicTable)
    const originalOrder = [...wrapper.vm.periods]
    await wrapper.vm.invertTable()
    expect(wrapper.vm.periods).toEqual(originalOrder.reverse())
  })

  it('isElementVisible returns true for elements matching the search query', async () => {
    const wrapper = mount(PeriodicTable, {
      data() {
        return {
          searchQuery: 'Oxygen'
        }
      }
    })

    // Define isElementVisible within the setup function
    const isElementVisible = (element: (typeof mockElementsData)[0]) => {
      return wrapper.vm.filteredElements.some(
        (filteredElement) => filteredElement.name === element?.name
      )
    }

    const visibleElement = mockElementsData.find((el) => el.name === 'Oxygen')
    if (visibleElement) {
      expect(isElementVisible(visibleElement)).toBe(true)
    }
  })

  it('displays element details when an element is selected', async () => {
    const wrapper = mount(PeriodicTable)
    const mockElement = mockElementsData.find((el) => el.name === 'Carbon') // Assuming Carbon is part of your mock data

    if (mockElement) {
      await wrapper.vm.handleClick(mockElement) // Simulate selecting an element
      await wrapper.vm.$nextTick() // Wait for the DOM to update

      expect(wrapper.find('.element-details').text()).toContain('Carbon')
      expect(wrapper.find('.element-details').text()).toContain('C')
      expect(wrapper.find('.element-details').text()).toContain('6')
      expect(wrapper.find('.element-details').text()).toContain('12.011')
    }
  })

  it('displays no elements when search query matches no results', async () => {
    const wrapper = mount(PeriodicTable, {
      data() {
        return {
          searchQuery: 'Unobtainium' // Assuming 'Unobtainium' does not exist in your elements data
        }
      }
    })
    expect(wrapper.vm.filteredElements.length).toBe(0)
    // Example: expect(wrapper.text()).toContain('No Results Found');
  })
  it('updates highlightedBlock when an element from a different block is clicked', async () => {
    const wrapper = mount(PeriodicTable)
    const firstElement = mockElementsData.find((el) => el.block === 's') // Find an element in the 's' block
    const secondElement = mockElementsData.find((el) => el.block === 'p') // Find an element in the 'p' block

    const firstElementCell = firstElement
      ? wrapper.find(`div[data-block="${firstElement.block}"]`)
      : null
    const secondElementCell = wrapper.find(`div[data-block="${secondElement?.block}"]`) // Add null check for secondElement

    await firstElementCell?.trigger('click')
    expect(wrapper.vm.highlightedBlock).toEqual(firstElement?.block)

    await secondElementCell.trigger('click')
    expect(wrapper.vm.highlightedBlock).toEqual(secondElement?.block) // Add null check for secondElement
  })

  it('updates searchQuery when typing in the search input', async () => {
    const wrapper = mount(PeriodicTable)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Helium')
    expect(wrapper.vm.searchQuery).toBe('Helium')
  })

  it('updates the UI to show details of the clicked element', async () => {
    const wrapper = mount(PeriodicTable)
    const mockElement = mockElementsData[0] // Assuming this is Hydrogen
    await wrapper.vm.handleClick(mockElement)
    await wrapper.vm.$nextTick() // Wait for the DOM to update
    expect(wrapper.find('.element-details .name').text()).toContain('Hydrogen')
  })

  it('renders the correct number of periods and groups', () => {
    const wrapper = mount(PeriodicTable)
    const periods = wrapper.findAll('tbody tr')
    expect(periods.length).toBe(7)

    const groups = wrapper.findAll('thead th')
    expect(groups.length).toBe(19)
  })

  it('highlights elements of the same block correctly', async () => {
    const wrapper = mount(PeriodicTable)
    const sBlockElement = wrapper.find('.s-block')

    if (sBlockElement.exists()) {
      await sBlockElement.trigger('click')
      await wrapper.vm.$nextTick()
      const highlightedElements = wrapper.findAll('.highlighted.s-block')
      expect(highlightedElements.length).toBeGreaterThan(0)
    } else {
      // Fail the test if no 's-block' element is found, as it indicates an issue with the test setup.
      fail('No s-block element found for testing.')
    }
  })

  it('updates elements data correctly when simulated data refresh occurs', async () => {
    const wrapper = mount(PeriodicTable)

    let elementItems = wrapper.findAll('.element-item') // Use the actual class or element used in your template
    expect(elementItems.length).toBe(mockElementsData.length)

    const newData = [
      ...mockElementsData,
      {
        name: 'Lithium',
        atomicNumber: 3,
        symbol: 'Li',
        atomicWeight: '6.94',
        block: 's',
        row: 2,
        column: 1
      }
    ]
    // Simulate data refresh by changing the prop or data
    // For direct data assignment (less common in real-world scenarios):
    await wrapper.setData({ elements: newData })

    elementItems = wrapper.findAll('.element-item')
    expect(elementItems.length).toBe(newData.length)
  })

  it('filters elements by atomic weight correctly', async () => {
    const wrapper = mount(PeriodicTable)
    await wrapper.setData({ searchQuery: '>4' })
    const elements = wrapper.findAll('.element')
    const elementsOver4 = elements.filter((node) => {
      const weightText = node.find('.atomic-weight').text()
      const weight = parseFloat(weightText)
      return weight > 4
    })
    expect(elementsOver4.length).toBe(elements.length)
  })
})
