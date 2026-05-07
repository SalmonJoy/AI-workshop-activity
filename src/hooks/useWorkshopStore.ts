import { useContext } from 'react'
import { WorkshopContext } from './workshopStoreContext'

export function useWorkshopStore() {
  const context = useContext(WorkshopContext)
  if (!context) {
    throw new Error('useWorkshopStore must be used inside WorkshopProvider')
  }
  return context
}
