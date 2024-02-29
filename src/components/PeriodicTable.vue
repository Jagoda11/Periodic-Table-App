<template>
  <!--   <div class="container mt-4"> -->
  <!--  better look when scrolling content not to stretched on the screen -->
  <div class="container-fluid mt-4">
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
                .map((_, i) => {
                  return getElement(period, i + 1)
                })"
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
      <div class="details-header">
        <h3>Details for {{ selectedElement.name }}</h3>
        <button @click="closeDetails">Close</button>
      </div>
      <p><strong>Symbol:</strong> {{ selectedElement.symbol }}</p>
      <p><strong>Atomic Number:</strong> {{ selectedElement.atomicNumber }}</p>
      <p><strong>Atomic Weight:</strong> {{ selectedElement.atomicWeight }}</p>
      <p><strong>Block:</strong> {{ selectedElement.block }}</p>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createApp } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import elementsData from '../assets/periodic-table-data.json' // Import the JSON data
import type { ElementData } from '../types/ElementData'

export default defineComponent({
  name: 'PeriodicTable',
  setup() {
    const elements = ref<ElementData[]>(elementsData)
    const periods = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const highlightedBlock = ref<string | null>(null)
    const selectedElement = ref<ElementData | null>(null) // Added for showing details
    const searchQuery = ref('')

    const filteredElements = computed(() => {
      const query = searchQuery.value.trim().toLowerCase()

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

    const isElementVisible = (element: ElementData) => {
      return filteredElements.value.some(
        (filteredElement) => filteredElement.atomicNumber === element.atomicNumber
      )
    }

    const handleClick = (element: ElementData | null) => {
      console.log('Clicked element:', element)

      // Early return if element is null to satisfy TypeScript's strict null checks
      if (element === null) return
      selectedElement.value = element // Set for details view
      if (highlightedBlock.value === element.block) {
        highlightedBlock.value = null
      } else {
        highlightedBlock.value = element.block
      }
    }

    const invertTable = () => {
      periods.value.reverse()
    }

    const getElement = (period: number, group: number): ElementData | null => {
      if (elements.value && Array.isArray(elements.value)) {
        const element = elements.value.find((el) => {
          const match = el.row === period && el.column === group

          return match
        })

        return element || null
      }
      return null
    }

    const isHighlighted = (elementBlock: string | undefined) => {
      return elementBlock === highlightedBlock.value
    }

    // Function to close the details panel
    const closeDetails = () => {
      selectedElement.value = null
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
      isElementVisible,
      closeDetails
    }
  }
})
</script>

<style scoped>
@media (max-width: 600px) {
  .table-responsive {
    overflow-x: auto;
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
  background-color: #a2c8f0;
}
.p-block {
  background-color: #f0b5bb;
}
.d-block {
  background-color: #8ed09d;
}
.f-block {
  background-color: #f2dc9b;
  color: black;
  /* Since yellow has a low contrast ratio*/
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
  border-top: 3px solid #a2c8f0; /* Added border for visual separation */
}

@media (min-width: 768px) {
  .element-details {
    /* Adjustments for larger screens */
    position: static;
    margin-top: 20px;
  }
}

.element {
  width: 60px;
  height: 60px;
  transition: transform 0.1s ease-in-out;
}

.element:hover,
.element:focus {
  transform: scale(1.1);
  outline: none;
  box-shadow: 0 0 0 3px #f0b5bb;
}
.element:focus {
  border: 2px solid #a2c8f0;
  position: relative;
  z-index: 1;
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
  box-shadow: 0 0 0 2px black inset; /* shadow for depth */
}

.dimmed {
  opacity: 0.15;
}
.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive Design Adjustments */
@media (max-width: 600px) {
  .element {
    width: 48px; /* Smaller touch targets for smaller screens, but still accessible */
    height: 48px;
  }
  .element-number {
    font-size: 0.8rem;
  }
  .element-symbol {
    font-size: 1.4rem;
  }
  .element-name {
    font-size: 0.6rem;
  }
}

@media (max-width: 590px) {
  .element-name {
    font-size: 0.4rem;
  }
}
</style>
