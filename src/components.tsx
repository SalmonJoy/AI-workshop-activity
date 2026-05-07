import { type ChangeEvent, type ReactNode, useRef, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  Printer,
  RotateCcw,
  Upload,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { sheetMetas, type ReferenceRow } from './data/workshop'
import { useWorkshopStore } from './hooks/useWorkshopStore'

type FieldProps = {
  sheetId: number
  name: string
  label?: string
  placeholder?: string
}

function keyFor(sheetId: number, name: string) {
  return `s${sheetId}.${name}`
}

export function Section({
  eyebrow,
  title,
  children,
  tone = 'plain',
}: {
  eyebrow?: string
  title: string
  children: ReactNode
  tone?: 'plain' | 'accent'
}) {
  return (
    <section className={`section ${tone === 'accent' ? 'section-accent' : ''}`}>
      <div className="section-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function TextInput({ sheetId, name, label, placeholder }: FieldProps) {
  const { getAnswer, setAnswer } = useWorkshopStore()
  const value = String(getAnswer(keyFor(sheetId, name), ''))

  return (
    <label className="field">
      {label && <span>{label}</span>}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => setAnswer(keyFor(sheetId, name), event.target.value)}
      />
    </label>
  )
}

export function TextArea({ sheetId, name, label, placeholder }: FieldProps) {
  const { getAnswer, setAnswer } = useWorkshopStore()
  const value = String(getAnswer(keyFor(sheetId, name), ''))

  return (
    <label className="field">
      {label && <span>{label}</span>}
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => setAnswer(keyFor(sheetId, name), event.target.value)}
      />
    </label>
  )
}

export function SelectField({
  sheetId,
  name,
  label,
  options,
  placeholder = 'Select',
}: FieldProps & { options: string[] }) {
  const { getAnswer, setAnswer } = useWorkshopStore()
  const value = String(getAnswer(keyFor(sheetId, name), ''))

  return (
    <label className="field">
      {label && <span>{label}</span>}
      <select value={value} onChange={(event) => setAnswer(keyFor(sheetId, name), event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export function InlineChoice({
  sheetId,
  name,
  options,
}: {
  sheetId: number
  name: string
  options: string[]
}) {
  const { getAnswer, setAnswer } = useWorkshopStore()
  const value = String(getAnswer(keyFor(sheetId, name), ''))

  return (
    <div className="choice-row">
      {options.map((option) => (
        <label className="choice" key={option}>
          <input
            type="radio"
            name={keyFor(sheetId, name)}
            checked={value === option}
            onChange={() => setAnswer(keyFor(sheetId, name), option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

export function CheckboxLine({
  sheetId,
  name,
  label,
}: {
  sheetId: number
  name: string
  label: string
}) {
  const { getAnswer, setAnswer } = useWorkshopStore()
  const checked = Boolean(getAnswer(keyFor(sheetId, name), false))

  return (
    <label className="check-line">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => setAnswer(keyFor(sheetId, name), event.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

export function ReferenceTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: ReferenceRow[] | string[][]
}) {
  return (
    <div className="table-scroll">
      <table className="reference-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={column}>
                  {Array.isArray(row)
                    ? row[columnIndex]
                    : row[column.toLowerCase().replaceAll(' ', '')] ??
                      row[column.toLowerCase()] ??
                      row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PromptBlock({ title, prompt }: { title: string; prompt: string }) {
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      window.prompt('Copy this prompt', prompt)
    }
  }

  return (
    <div className="prompt-block">
      <div className="prompt-head">
        <h3>{title}</h3>
        <button className="icon-button" type="button" onClick={copyPrompt} title="Copy prompt">
          <Copy size={17} />
          <span>Copy</span>
        </button>
      </div>
      <pre>{prompt}</pre>
    </div>
  )
}

export function Details({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="details" open={defaultOpen}>
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  )
}

export function MetaStrip({ sheetId }: { sheetId: number }) {
  const meta = sheetMetas.find((sheet) => sheet.id === sheetId)
  if (!meta) {
    return null
  }
  return (
    <div className="meta-strip">
      <span>{meta.activityType}</span>
      <span>{meta.suggestedTime}</span>
      <span>{meta.moduleLink}</span>
    </div>
  )
}

export function PageIntro({
  sheetId,
  objective,
  children,
}: {
  sheetId: number
  objective: string
  children?: ReactNode
}) {
  const meta = sheetMetas.find((sheet) => sheet.id === sheetId)
  return (
    <header className="page-intro">
      <div>
        <span className="sheet-number">Sheet {sheetId}</span>
        <h1>{meta?.title}</h1>
        <p>{objective}</p>
      </div>
      <MetaStrip sheetId={sheetId} />
      {children}
    </header>
  )
}

export function PageNav({ sheetId }: { sheetId: number }) {
  const previous = sheetId > 1 ? sheetId - 1 : null
  const next = sheetId < sheetMetas.length ? sheetId + 1 : null

  return (
    <nav className="page-nav" aria-label="Sheet navigation">
      {previous ? (
        <Link to={`/sheet/${previous}`} className="nav-button">
          <ChevronLeft size={17} />
          Sheet {previous}
        </Link>
      ) : (
        <Link to="/" className="nav-button">
          <ChevronLeft size={17} />
          Overview
        </Link>
      )}
      <button type="button" className="nav-button" onClick={() => window.print()}>
        <Printer size={17} />
        Print
      </button>
      {next ? (
        <Link to={`/sheet/${next}`} className="nav-button primary">
          Sheet {next}
          <ChevronRight size={17} />
        </Link>
      ) : (
        <Link to="/" className="nav-button primary">
          Overview
          <ChevronRight size={17} />
        </Link>
      )}
    </nav>
  )
}

export function ResetSheetButton({ sheetId }: { sheetId: number }) {
  const { resetSheet } = useWorkshopStore()
  return (
    <button
      type="button"
      className="ghost-button"
      onClick={() => {
        if (window.confirm('Clear answers for this sheet?')) {
          resetSheet(sheetId)
        }
      }}
    >
      <RotateCcw size={16} />
      Reset sheet
    </button>
  )
}

export function ResponsePortabilityControls({
  iconOnly = false,
  variant = 'compact',
}: {
  iconOnly?: boolean
  variant?: 'compact' | 'panel'
}) {
  const { exportResponses, importResponses } = useWorkshopStore()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const showMessage = (nextMessage: string, nextType: 'success' | 'error' = 'success') => {
    setMessage(nextMessage)
    setMessageType(nextType)
  }

  const handleExport = () => {
    const payload = exportResponses()
    const json = JSON.stringify(payload, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const date = new Date().toISOString().slice(0, 10)
    const link = document.createElement('a')
    link.href = url
    link.download = `ai-workshop-responses-${date}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    showMessage('Responses exported as JSON.')
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) {
      return
    }

    if (!window.confirm('Importing this file will replace all current workshop answers. Continue?')) {
      return
    }

    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const result = importResponses(payload)
      showMessage(`Imported ${result.importedCount} saved answers.`)
    } catch (error) {
      const details = error instanceof Error ? error.message : 'Could not import this file.'
      showMessage(details, 'error')
    }
  }

  return (
    <div
      className={`response-tools ${variant === 'panel' ? 'response-tools-panel' : ''} ${
        iconOnly ? 'response-tools-icon-only' : ''
      }`}
    >
      {variant === 'panel' && (
        <div className="response-tools-copy">
          <h3>Import / Export Responses</h3>
          <p>
            Responses are saved only in this browser. Export a JSON backup to continue on another
            device or restore answers later.
          </p>
        </div>
      )}
      <div className="response-tool-actions">
        <button
          type="button"
          className={`ghost-button ${iconOnly ? 'icon-only-button' : ''}`}
          onClick={handleExport}
          title="Export JSON"
          aria-label="Export JSON"
        >
          <Download size={16} />
          <span className="button-label">Export JSON</span>
        </button>
        <button
          type="button"
          className={`ghost-button ${iconOnly ? 'icon-only-button' : ''}`}
          onClick={() => inputRef.current?.click()}
          title="Import JSON"
          aria-label="Import JSON"
        >
          <Upload size={16} />
          <span className="button-label">Import JSON</span>
        </button>
      </div>
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="application/json,.json"
        onChange={handleImport}
      />
      {message && <p className={`tool-message ${messageType}`}>{message}</p>}
    </div>
  )
}

export function ScoreCell({
  sheetId,
  name,
}: {
  sheetId: number
  name: string
}) {
  return <SelectField sheetId={sheetId} name={name} options={['1', '2', '3', '4', '5']} />
}

export function ScoreTotal({
  sheetId,
  prefix,
  criteria,
  useCase,
}: {
  sheetId: number
  prefix: string
  criteria: string[]
  useCase: number
}) {
  const { getAnswer } = useWorkshopStore()
  const total = criteria.reduce((sum, criterion) => {
    const value = Number(getAnswer(keyFor(sheetId, `${prefix}.${criterion}.${useCase}`), 0))
    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)
  return <strong>{total}</strong>
}

export function StatusPill({ sheetId }: { sheetId: number }) {
  const { progressForSheet } = useWorkshopStore()
  const progress = progressForSheet(sheetId)
  const label = progress === 0 ? 'Not started' : progress >= 75 ? 'Well progressed' : 'In progress'

  return (
    <span className={`status-pill ${progress >= 75 ? 'done' : progress > 0 ? 'active' : ''}`}>
      {progress >= 75 ? <Check size={14} /> : <ClipboardCheck size={14} />}
      {label}
    </span>
  )
}
