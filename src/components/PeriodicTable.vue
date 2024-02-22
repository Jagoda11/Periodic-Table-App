<template>
  <div class="container mt-4">
    <!-- Search Input -->
    <div class="search-container text-center my-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name, symbol, or atomic number..."
        class="form-control"
        aria-label="Element search"
      />
    </div>
    <!-- Invert Button -->
    <div class="text-end mb-3">
      <button class="btn btn-secondary" @click="invertTable">Invert</button>
    </div>

    <!-- Periodic Table -->
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
          <td v-for="group in 18" :key="`period-${period}-group-${group}`">
            <div
              v-if="getElement(period, group)"
              :class="{ highlighted: isHighlighted(getElement(period, group)?.block) }"
              @click="handleClick(getElement(period, group))"
            >
              <div>{{ getElement(period, group)?.symbol }}</div>
              <div>{{ getElement(period, group)?.atomicNumber }}</div>
              <div>{{ getElement(period, group)?.name }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

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
      import { defineComponent, ref, computed } from 'vue'
      import type { ElementData } from '@/types/ElementData'
      import elementsData from '@/assets/periodic-table-data.json' // Import the JSON data

      export default defineComponent({
        setup() {
          const elements = ref<ElementData[]>(elementsData) // Your array of elements
          const periods = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8]) // Array representing periods 1 to 8
          const highlightedBlock = ref<string | null>(null)
          const selectedElement = ref<ElementData | null>(null) // Added for showing details
          const searchQuery = ref('')

          const filteredElements = computed(() => {
            if (!searchQuery.value) {
              return elements.value
            }
            return elements.value.filter((el) => {
              return (
                el.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                el.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                el.atomicNumber.toString().includes(searchQuery.value)
              )
            })
          })

          // Function to handle element click events
          const handleClick = (element: ElementData | null) => {
            // Early return if element is null to satisfy TypeScript's strict null checks
            if (element === null) return
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

            if (highlightedBlock.value) {
              // Find the index of the first element with the highlighted block
              const startIndex = elements.value.findIndex(
                (element) => element.block === highlightedBlock.value
              )

              if (startIndex !== -1) {
                // Move the elements with the highlighted block to the front of the array
                const highlightedElements = elements.value.splice(startIndex)
                elements.value.unshift(...highlightedElements)
              }
            }
          }
          // Function to get element by period and group
          const getElement = (period: number, group: number): ElementData | null => {
            // Implement the logic to find the element in the elements array
            // Return null if the element is not found
            // This function will depend on your data structure and how elements are stored

            return (
              elements.value.find(
                (element) => element.row === period && element.column === group
              ) || null
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
            isHighlighted
          }
        }
      })
    </script>

    <style scoped>
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

      .cell {
        /* Applied Bootstrap responsive column classes, adjust cell styles for your needs */
        border: 1px solid #dee2e6;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
      }
      .cell[aria-pressed='true'] {
        background-color: #007bff;
        color: #fff; /* Improved contrast and a11y */
      }
      .highlighted {
        background-color: #ffc107;
      }
    </style>