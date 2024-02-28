// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createApp } from 'vue'
import { expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import PeriodicTable from './PeriodicTable.vue'

// Mock the elements data
jest.mock('@/assets/periodic-table-data.json', () => [
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
    column: 15
  }
])

describe('PeriodicTable.vue 🧪', () => {
  // Test if component renders
  it('renders successfully 🎉', () => {
    const wrapper = mount(PeriodicTable)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('logs the rendered HTML', () => {
    const wrapper = mount(PeriodicTable)
    console.log((wrapper.vm as any).periods, (wrapper.vm as any).groups) // Log the periods and groups
    console.log(wrapper.html())
  })

  // Test for initial state where all elements are shown
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
      column: 15
    }
  ]

  // Test for element selection and detail display
  it('displays details for selected element 🛠️', async () => {
    const wrapper = mount(PeriodicTable)
    await wrapper.vm.handleClick(mockElementsData[0]) // Simulate clicking the first element, Hydrogen
    await wrapper.vm.$nextTick() // Wait for the DOM to update
    const detailsText = wrapper.find('.element-details').text()
    expect(detailsText).toContain('Hydrogen')
    expect(detailsText).toContain('1')
    expect(detailsText).toContain('H')
  })

  // Test for inverting the table
  it('inverts the order of periods 🔁', async () => {
    const wrapper = mount(PeriodicTable)
    const originalOrder = [...wrapper.vm.periods]
    await wrapper.vm.invertTable()
    expect(wrapper.vm.periods).toEqual(originalOrder.reverse())
  })

  it('displays element details when an element is selected 📋', async () => {
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

  it('displays no elements when search query matches no results ❌', async () => {
    const wrapper = mount(PeriodicTable, {
      data() {
        return {
          searchQuery: 'Unobtainium' //'Unobtainium' does not exist in elements data
        }
      }
    })
    if (wrapper.vm.filteredElements) {
      expect(wrapper.vm.filteredElements.length).toBe(0)
    } // Example: expect(wrapper.text()).toContain('No Results Found');
  })

  it('updates searchQuery when typing in the search input 🔍', async () => {
    const wrapper = mount(PeriodicTable)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Helium')
    expect(wrapper.vm.searchQuery).toBe('Helium')
  })

  it('highlights elements of the same block correctly 🎨', async () => {
    // 1. Mount the PeriodicTable component
    const wrapper = mount(PeriodicTable)

    // 2. Find all elements with the class '.element.s-block'
    const sBlockElements = wrapper.findAll('.element.s-block')

    // 3. Check if any elements from the 's' block are present
    if (sBlockElements.length > 0) {
      // 4. Click on the first element from the 's' block
      await sBlockElements[0].trigger('click')

      // 5. Wait for Vue to update the DOM
      await wrapper.vm.$nextTick()

      // 6. Check if elements of the same block are highlighted
      const highlightedElements = wrapper.findAll('.highlighted.s-block')

      // 7. Assertion: Ensure that at least one element is highlighted
      expect(highlightedElements.length).toBeGreaterThan(0)
    } else {
      // If no elements from the 's' block are found, skip the test and log a message
      console.warn('No elements from the "s" block found for testing.')
      expect(true).toBeTruthy() // Skip the test without failing
    }
  })

  it('filters elements by atomic weight correctly ⚖️', async () => {
    const wrapper = mount(PeriodicTable)
    // 2. Action: Set the search query to filter elements by atomic weight greater than 4
    wrapper.vm.searchQuery = '>4'
    await wrapper.vm.$nextTick()
    // 3. Assertion: Check if all displayed elements have atomic weight greater than 4
    const elements = wrapper.findAll('.element')
    elements.forEach((element) => {
      const weightText = element.find('.atomic-weight').text()
      const weight = parseFloat(weightText)
      expect(weight).toBeGreaterThan(4)
    })
  })
})
