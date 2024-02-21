<template>
  <div class="container mt-4">
    <!-- Invert Button -->
    <div class="text-end mb-3">
      <button class="btn btn-secondary" @click="invertTable">Invert</button>
    </div>

    <!-- Periodic Table -->
    <table class="table table-bordered text-center">
      <thead>
        <!-- Group Numbers at the Top -->
        <tr>
        <th scope="col">Header</th> <!-- Empty cell for alignment with period numbers -->
          <th scope="col" v-for="group in 18" :key="'group-' + group">{{ group }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Period Numbers Down the Side -->
        <tr v-for="period in periods" :key="'period-' + period">
          <th scope="row">{{ period }}</th>
          <td v-for="group in 18" :key="`period-${period}-group-${group}`">
            <div v-if="getElement(period, group)" @click="handleClick(getElement(period, group))">
            <div>{{ getElement(period, group)?.symbol }}</div>
            <div>{{ getElement(period, group)?.atomicNumber }}</div>
            <div>{{ getElement(period, group)?.name }}</div>
            </div>
      </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { ElementData } from '@/types/ElementData';
import elementsData from '@/assets/periodic-table-data.json'; // Import the JSON data


export default defineComponent({
  setup() {
    // Define data
    const elements = ref<ElementData[]>(elementsData); // Your array of elements
    const periods = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);// Array representing periods 1 to 8
    const highlightedBlock = ref<string | null>(null); // Store the currently highlighted block

    // Function to handle element click events
    const handleClick = (element: ElementData) => {
      // Check if the clicked element belongs to the highlighted block
      if (highlightedBlock.value === element.block) {
        // If yes, remove the highlight
        highlightedBlock.value = null;
      } else {
        // If not, highlight the block to which the element belongs
        highlightedBlock.value = element.block;
      }
    };

    // Function to invert the table
    const invertTable = () => {
        elements.value.reverse();
    
    if (highlightedBlock.value) {
        // Find the index of the first element with the highlighted block
        const startIndex = elements.value.findIndex(element => element.block === highlightedBlock.value);
        
        if (startIndex !== -1) {
          // Move the elements with the highlighted block to the front of the array
          const highlightedElements = elements.value.splice(startIndex);
          elements.value.unshift(...highlightedElements);
        }
      }
    };
    // Function to get element by period and group
    const getElement = (period: number, group: number): ElementData | null => {
      // Implement the logic to find the element in the elements array
      // Return null if the element is not found
      // This function will depend on your data structure and how elements are stored

      return elements.value.find(element => element.row === period && element.column === group) || null;
    };

    return {
      elements,
      periods,
      highlightedBlock,
      handleClick,
      invertTable,
      getElement
    };
  }
});

</script>

  <style scoped>
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
  .cell[aria-pressed="true"] {
    background-color: #007bff; 
    color: #fff; /* Improved contrast and a11y */
  }
  </style>
  