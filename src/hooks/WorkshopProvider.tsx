import { type ReactNode, useCallback, useMemo, useState } from 'react'
import { sheetMetas, storageKey } from '../data/workshop'
import {
  type Answers,
  type AnswerValue,
  type WorkshopExportPayload,
  WorkshopContext,
} from './workshopStoreContext'

function loadAnswers(): Answers {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) {
      return {}
    }
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function isFilled(value: AnswerValue | undefined) {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'number') {
    return value > 0
  }
  return typeof value === 'string' && value.trim().length > 0
}

function saveAnswers(next: Answers) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next))
  } catch {
    // Local persistence is a convenience; the worksheet should remain usable if storage is blocked.
  }
}

function validateImportPayload(payload: unknown): Answers {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('The import file must contain a JSON object.')
  }

  const answers = (payload as { answers?: unknown }).answers
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    throw new Error('The import file must include an answers object.')
  }

  const next = Object.create(null) as Answers
  for (const [key, value] of Object.entries(answers)) {
    const validType =
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      (typeof value === 'number' && Number.isFinite(value))

    if (!validType) {
      throw new Error(`Invalid answer value for "${key}". Values must be text, numbers, or booleans.`)
    }

    next[key] = value
  }

  return next
}

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers())

  const setAnswer = useCallback((key: string, value: AnswerValue) => {
    setAnswers((current) => {
      const next = { ...current }
      if (!isFilled(value)) {
        delete next[key]
      } else {
        next[key] = value
      }
      saveAnswers(next)
      return next
    })
  }, [])

  const getAnswer = useCallback(
    (key: string, fallback: AnswerValue = '') => {
      return answers[key] ?? fallback
    },
    [answers],
  )

  const resetSheet = useCallback((sheetId: number) => {
    const prefix = `s${sheetId}.`
    setAnswers((current) => {
      const next = Object.fromEntries(
        Object.entries(current).filter(([key]) => !key.startsWith(prefix)),
      )
      saveAnswers(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setAnswers({})
    saveAnswers({})
  }, [])

  const exportResponses = useCallback((): WorkshopExportPayload => {
    return {
      app: 'practical-ai-workshop',
      version: storageKey,
      exportedAt: new Date().toISOString(),
      answers,
    }
  }, [answers])

  const importResponses = useCallback((payload: unknown) => {
    const next = validateImportPayload(payload)
    setAnswers(next)
    saveAnswers(next)
    return { importedCount: Object.keys(next).length }
  }, [])

  const answeredCountForSheet = useCallback(
    (sheetId: number) => {
      const prefix = `s${sheetId}.`
      return Object.entries(answers).filter(
        ([key, value]) => key.startsWith(prefix) && isFilled(value),
      ).length
    },
    [answers],
  )

  const progressForSheet = useCallback(
    (sheetId: number) => {
      const meta = sheetMetas.find((sheet) => sheet.id === sheetId)
      const target = meta?.targetFields ?? 1
      return Math.min(100, Math.round((answeredCountForSheet(sheetId) / target) * 100))
    },
    [answeredCountForSheet],
  )

  const value = useMemo(
    () => ({
      answers,
      getAnswer,
      setAnswer,
      exportResponses,
      importResponses,
      resetSheet,
      resetAll,
      progressForSheet,
      answeredCountForSheet,
    }),
    [
      answers,
      getAnswer,
      setAnswer,
      exportResponses,
      importResponses,
      resetSheet,
      resetAll,
      progressForSheet,
      answeredCountForSheet,
    ],
  )

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>
}
