<template>
  <div class="container mt-4">
    <!-- Search Input -->
    <div class="row">
      <div class="col-lg-8 col-md-7 col-sm-12 mb-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, symbol, or atomic number..."
          class="form-control"
          aria-label="Element search"
        />
      </div>

      <!-- Invert Button -->
      <div class="col-lg-4 col-md-5 col-sm-12 text-end mb-3">
        <button class="btn btn-secondary" @click="invertTable">Invert</button>
      </div>
    </div>

    <!-- Periodic Table -->
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead>
          <!-- Group Numbers at the Top -->
          <tr>
            <th scope="col">Group Period</th>
            <th v-for="group in 18" :key="'group-' + group" scope="col">{{ group }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- Period Numbers Down the Side -->
          <tr v-for="period in periods" :key="'period-' + period">
            <th scope="row">{{ period }}</th>
            <td
              v-for="(element, group) in Array(18)
                .fill(0)
                .map((_, i) => getElement(period, i + 1))"
              :key="`period-${period}-group-${group}`"
              class="grid-cell"
            >
              <div
                v-if="element"
                :class="{
                  element: true,
                  highlighted: isHighlighted(element?.block),
                  dimmed: !isElementVisible(element),
                  's-block': element?.block === 's',
                  'p-block': element?.block === 'p',
                  'd-block': element?.block === 'd',
                  'f-block': element?.block === 'f'
                }"
                @click="handleClick(element)"
              >
                <div class="element-number">{{ element?.atomicNumber }}</div>
                <div class="element-symbol">{{ element?.symbol }}</div>
                <div class="element-name">{{ element?.name }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Element Details Panel -->
    <div v-if="selectedElement" class="element-details">
      <h3>Details for {{ selectedElement.name }}</h3>
      <p><strong>Symbol:</strong> {{ selectedElement.symbol }}</p>
      <p><strong>Atomic Number:</strong> {{ selectedElement.atomicNumber }}</p>
      <p><strong>Atomic Weight:</strong> {{ selectedElement.atomicWeight }}</p>
      <p><strong>Block:</strong> {{ selectedElement.block }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import elementsData from '../assets/periodic-table-data.json' // Import the JSON data
import type { ElementData } from '../types/ElementData'

export default defineComponent({
  name: 'PeriodicTable',
  setup() {
    const elements = ref<ElementData[]>(elementsData) // Your array of elements
    const periods = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]) // Array representing periods 1 to 9
    const highlightedBlock = ref<string | null>(null)
    const selectedElement = ref<ElementData | null>(null) // Added for showing details
    const searchQuery = ref('')

    const filteredElements = computed(() => {
      console.log('Search query updated:', searchQuery.value) // This line is added for monitoring
      const query = searchQuery.value.trim().toLowerCase() // Convert search query to lowercase and trim whitespace
      console.log('Trimmed and lowercased query:', query)

      if (!query) {
        console.log('No query, returning all elements:', elements.value)
        return elements.value // Return all elements if query is empty
      }

      const filtered: ElementData[] = elements.value.filter((element) => {
        return (
          element.name.toLowerCase().includes(query) ||
          element.symbol.toLowerCase().includes(query) ||
          element.atomicNumber.toString().includes(query)
        )
      })

      return filtered
    })

    // Define isElementVisible within the setup function
    const isElementVisible = (element: ElementData) => {
      // This assumes each element has a unique identifier, like an atomic number, for comparison
      return filteredElements.value.some(
        (filteredElement) => filteredElement.atomicNumber === element.atomicNumber
      )
    }

    // Function to handle element click events
    const handleClick = (element: ElementData | null) => {
      console.log('Clicked element:', element)

      // Early return if element is null to satisfy TypeScript's strict null checks
      if (element === null) return
      console.log('Selected element:', selectedElement.value) // Log the selected element
      selectedElement.value = element // Set for details view
      // Check if the clicked element belongs to the highlighted block
      if (highlightedBlock.value === element.block) {
        // If yes, remove the highlight
        highlightedBlock.value = null
      } else {
        // If not, highlight the block to which the element belongs
        highlightedBlock.value = element.block
      }
    }

    // Function to invert the table
    const invertTable = () => {
      periods.value.reverse()
    }
    // Function to get element by period and group
    const getElement = (period: number, group: number): ElementData | null => {
      // Implement the logic to find the element in the elements array
      // Return null if the element is not found
      // This function will depend on your data structure and how elements are stored

      return (
        elements.value.find((element) => element.row === period && element.column === group) || null
      )
    }

    // isHighlighted method definition
    const isHighlighted = (elementBlock: string | undefined) => {
      return elementBlock === highlightedBlock.value
    }

    return {
      elements,
      periods,
      highlightedBlock,
      selectedElement,
      searchQuery,
      filteredElements,
      handleClick,
      invertTable,
      getElement,
      isHighlighted,
      isElementVisible
    }
  }
})
</script>

<style scoped>
@media (max-width: 600px) {
  .grid-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: dense;
  }

  .grid-cell {
    grid-column: span 1;
  }
}

.table-responsive {
  overflow-x: auto;
}
/* Classification colors */
.s-block {
  background-color: #5e9fe3f5;
}
.p-block {
  background-color: #e28790;
}
.d-block {
  background-color: #8ed09d;
}
.f-block {
  background-color: #f2dc9b;
  color: black;
  /* Since yellow has a low contrast ratio with white text */
}

.element-details {
  /* Styling for mobile view */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 1rem;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .element-details {
    /* Adjustments for larger screens */
    position: static;
    margin-top: 20px;
  }
}

.element {
  width: 50px;
  height: 50px;
  transition: transform 0.1s ease-in-out;
}

.element:hover {
  transform: scale(1.4);
}

.element-number {
  text-align: left;
  padding-left: 10%;
  font-size: 0.7rem;
  line-height: 1.1rem;
}

.element-symbol {
  line-height: 1.2rem;
  font-size: 1.2rem;
}

.element-name {
  font-size: 0.5rem;
  padding: 0;
}

.highlighted {
  background-color: #ffc107;
}

.dimmed {
  opacity: 0.15;
}
</style>
