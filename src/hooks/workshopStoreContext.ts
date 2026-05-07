import { createContext } from 'react'

export type AnswerValue = string | number | boolean
export type Answers = Record<string, AnswerValue>

export type WorkshopExportPayload = {
  app: 'practical-ai-workshop'
  version: string
  exportedAt: string
  answers: Answers
}

export type WorkshopStore = {
  answers: Answers
  getAnswer: (key: string, fallback?: AnswerValue) => AnswerValue
  setAnswer: (key: string, value: AnswerValue) => void
  exportResponses: () => WorkshopExportPayload
  importResponses: (payload: unknown) => { importedCount: number }
  resetSheet: (sheetId: number) => void
  resetAll: () => void
  progressForSheet: (sheetId: number) => number
  answeredCountForSheet: (sheetId: number) => number
}

export const WorkshopContext = createContext<WorkshopStore | null>(null)
