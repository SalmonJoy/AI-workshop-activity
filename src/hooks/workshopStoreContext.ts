import { createContext } from 'react'

export type AnswerValue = string | number | boolean
export type Answers = Record<string, AnswerValue>

export type WorkshopStore = {
  answers: Answers
  getAnswer: (key: string, fallback?: AnswerValue) => AnswerValue
  setAnswer: (key: string, value: AnswerValue) => void
  resetSheet: (sheetId: number) => void
  resetAll: () => void
  progressForSheet: (sheetId: number) => number
  answeredCountForSheet: (sheetId: number) => number
}

export const WorkshopContext = createContext<WorkshopStore | null>(null)
