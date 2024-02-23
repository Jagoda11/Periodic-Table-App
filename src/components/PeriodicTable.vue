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
<div class="table-responsive">
    <!-- Periodic Table -->
    <table class="table table-bordered text-center periodic-table">
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
              :class="{
        highlighted: isHighlighted(getElement(period, group)?.block),
        's-block': getElement(period, group)?.block === 's',
        'p-block': getElement(period, group)?.block === 'p',
        'd-block': getElement(period, group)?.block === 'd',
        'f-block': getElement(period, group)?.block === 'f'
          }"
              @click="handleClick(getElement(period, group))"
            >
            {{ console.log("Block:", getElement(period, group)?.block) }} <!-- Add console.log here -->

              <div>{{ getElement(period, group)?.symbol }}</div>
              <div>{{ getElement(period, group)?.atomicNumber }}</div>
              <div>{{ getElement(period, group)?.name }}</div>
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
  console.log("Search query:", searchQuery.value);
  const query = searchQuery.value.trim().toLowerCase(); // Convert search query to lowercase and trim whitespace
  console.log("Trimmed and lowercased query:", query);
  
  if (!query) {
    console.log("No query, returning all elements:", elements.value);
    return elements.value; // Return all elements if query is empty
  }

  const filtered: ElementData[] = elements.value.filter((element) => {
    return (
      element.name.toLowerCase().includes(query) ||
      element.symbol.toLowerCase().includes(query) ||
      element.atomicNumber.toString().includes(query)
    );
  });

  console.log("Filtered elements:", filteredElements.value);
  return filtered;
});

          // Function to handle element click events
          const handleClick = (element: ElementData | null) => {
            console.log("Clicked element:", element);

            // Early return if element is null to satisfy TypeScript's strict null checks
            if (element === null) return
            console.log("Selected element:", selectedElement.value); // Log the selected element
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


/* Basic styling for the periodic table */
.periodic-table {
    width: 100%;
    max-width: 100%; 
    overflow-x: auto;
    border-collapse: collapse;
    display: block;
    margin: 0 auto;
  }

  .periodic-table th,
  .periodic-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: center;
    font-size: 1rem;
  }

  .table-responsive {
    overflow-x: auto;
  } 
 

  /* Classification colors */
  .s-block {
    background-color: #f77f00; /* Orange */
  }
  .p-block {
    background-color: #fca652; /* Light orange */
  }
  .d-block {
    background-color: #d5d5d5; /* Light gray */
  }
  .f-block {
    background-color: #aab7b8; /* Gray */
  }

 /* Responsive adjustments */
 @media (max-width: 575px) {
    .periodic-table th,
    .periodic-table td {
      padding: 0.5rem; /* Decrease padding on smaller screens */
      font-size: 0.9; /* Decrease font size on smaller screens */
    }
  }

  @media (min-width: 576px) {
    .periodic-table th,
    .periodic-table td {
      font-size: 1rem; /* Adjust font size for small screens */
    }
  }

  @media (min-width: 768px) {
    .periodic-table th,
    .periodic-table td {
      font-size: 1.1rem; /* Adjust font size for medium screens */
    }
  }

  @media (min-width: 992px) {
    .periodic-table th,
    .periodic-table td {
      font-size: 1.2rem; /* Adjust font size for large screens */
    }
  }

  @media (min-width: 1200px) {
    .periodic-table th,
    .periodic-table td {
      font-size: 1.3rem; /* Adjust font size for extra-large screens */
    }
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