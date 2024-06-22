import { ElementData } from '@/types/ElementData'
import { ComputedRef, Ref } from 'vue'

export interface PeriodicTableProps {
  // Define props here if the component has any
}

export interface PeriodicTableData {
  elements: Ref<ElementData[]>
  periods: Ref<number[]>
  highlightedBlock: Ref<string | null>
  selectedElement: Ref<ElementData | null>
  searchQuery: Ref<string>
  filteredElements: ComputedRef<ElementData[]>
}

export interface PeriodicTableMethods {
  handleClick: (element: ElementData | null) => void
  invertTable: () => void
  getElement: (period: number, group: number) => ElementData | null
  isHighlighted: (elementBlock: string | undefined) => boolean
  isElementVisible: (element: ElementData) => boolean
  closeDetails: () => void
}

export interface PeriodicTableComputed {
  filteredElements: ComputedRef<ElementData[]>
  isElementVisible: (element: ElementData) => boolean
  isHighlighted: (elementBlock: string | undefined) => boolean
  searchQuery: Ref<string>
  selectedElement: Ref<ElementData | null>
}

export interface PeriodicTableComposition {
  props: PeriodicTableProps
  computed: PeriodicTableComputed
  methods: PeriodicTableMethods
  data: PeriodicTableData
}

declare const PeriodicTable: import('vue').DefineComponent<
  {},
  {},
  {},
  {},
  {},
  PeriodicTableComposition
>
export default PeriodicTable
