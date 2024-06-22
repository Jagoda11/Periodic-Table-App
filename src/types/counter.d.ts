import { ComputedRef, Ref } from 'vue'

export interface CounterStore {
  count: Ref<number>
  doubleCount: ComputedRef<number>
  increment: () => void
}
