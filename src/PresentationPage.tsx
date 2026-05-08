import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  FileText,
  LoaderCircle,
} from 'lucide-react'
import {
  GlobalWorkerOptions,
  getDocument,
  type OnProgressParameters,
  type PDFDocumentProxy,
  type RenderTask,
} from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'
import { presentationDownloadName, presentationPdfUrl } from './presentationConfig'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

function clampPage(page: number, pageCount: number) {
  if (pageCount < 1) {
    return 1
  }
  return Math.min(pageCount, Math.max(1, page))
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  )
}

export function PresentationPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const renderTaskRef = useRef<RenderTask | null>(null)
  const renderTokenRef = useRef(0)
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const [pageCount, setPageCount] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [loadProgress, setLoadProgress] = useState<number | null>(null)
  const [isDocumentLoading, setDocumentLoading] = useState(true)
  const [isPageRendering, setPageRendering] = useState(false)
  const [error, setError] = useState('')

  const goToPage = useCallback(
    (page: number) => {
      const nextPage = clampPage(page, pageCount)
      setPageNumber(nextPage)
      setPageInput(String(nextPage))
    },
    [pageCount],
  )

  const goToPrevious = useCallback(() => goToPage(pageNumber - 1), [goToPage, pageNumber])
  const goToNext = useCallback(() => goToPage(pageNumber + 1), [goToPage, pageNumber])

  useEffect(() => {
    let cancelled = false
    const loadingTask = getDocument({ url: presentationPdfUrl })
    loadingTask.onProgress = ({ loaded, total }: OnProgressParameters) => {
      if (cancelled || !total) {
        return
      }
      setLoadProgress(Math.min(100, Math.round((loaded / total) * 100)))
    }

    loadingTask.promise
      .then((loadedPdf) => {
        if (cancelled) {
          void loadedPdf.destroy()
          return
        }
        setPdfDocument(loadedPdf)
        setPageCount(loadedPdf.numPages)
        setPageNumber(1)
        setPageInput('1')
        setError('')
      })
      .catch(() => {
        if (!cancelled) {
          setError('The presentation PDF could not be loaded.')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setDocumentLoading(false)
        }
      })

    return () => {
      cancelled = true
      loadingTask.destroy()
      renderTaskRef.current?.cancel()
    }
  }, [])

  useEffect(() => {
    const target = viewportRef.current
    if (!target) {
      return
    }

    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width)
    })
    observer.observe(target)
    setViewportWidth(target.clientWidth)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pdfDocument || !viewportWidth) {
      return
    }

    let cancelled = false
    const token = renderTokenRef.current + 1
    renderTokenRef.current = token
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      return
    }

    setPageRendering(true)
    renderTaskRef.current?.cancel()

    pdfDocument
      .getPage(pageNumber)
      .then((page) => {
        if (cancelled || renderTokenRef.current !== token) {
          return
        }

        const baseViewport = page.getViewport({ scale: 1 })
        const availableWidth = Math.max(320, viewportWidth - 24)
        const cssScale = availableWidth / baseViewport.width
        const outputScale = Math.max(1, window.devicePixelRatio || 1)
        const renderViewport = page.getViewport({ scale: cssScale * outputScale })

        canvas.width = Math.floor(renderViewport.width)
        canvas.height = Math.floor(renderViewport.height)
        canvas.style.width = `${Math.floor(baseViewport.width * cssScale)}px`
        canvas.style.height = `${Math.floor(baseViewport.height * cssScale)}px`

        context.clearRect(0, 0, canvas.width, canvas.height)
        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport: renderViewport,
        })
        renderTaskRef.current = renderTask
        return renderTask.promise
      })
      .catch((renderError: unknown) => {
        if (
          renderError instanceof Error &&
          renderError.name !== 'RenderingCancelledException' &&
          !cancelled
        ) {
          setError('This slide could not be rendered.')
        }
      })
      .finally(() => {
        if (!cancelled && renderTokenRef.current === token) {
          setPageRendering(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [pdfDocument, pageNumber, viewportWidth])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || !pageCount) {
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goToPage(pageNumber - 1)
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        goToPage(pageNumber + 1)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        goToPage(1)
      }
      if (event.key === 'End') {
        event.preventDefault()
        goToPage(pageCount)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPage, pageCount, pageNumber])

  const commitPageInput = () => {
    const nextPage = Number(pageInput)
    if (Number.isFinite(nextPage)) {
      goToPage(nextPage)
      return
    }
    setPageInput(String(pageNumber))
  }

  const progress = pageCount ? Math.round((pageNumber / pageCount) * 100) : 0
  const canNavigate = Boolean(pageCount && !isDocumentLoading && !error)

  return (
    <div className="page presentation-page">
      <header className="page-intro presentation-intro">
        <div>
          <span className="sheet-number">Presentation</span>
          <h1>Practical AI Workshop Presentation</h1>
          <p>
            Navigate the workshop deck like a slide presentation. Use the controls below or the
            keyboard arrows to move through the slides.
          </p>
        </div>
        <div className="meta-strip">
          <span>{pageCount ? `${pageCount} slides` : 'Loading slides'}</span>
          <span>Keyboard navigation</span>
          <span>PDF download</span>
        </div>
      </header>

      <section className="presentation-toolbar" aria-label="Presentation controls">
        <div className="presentation-toolbar-group">
          <button
            type="button"
            className="nav-button"
            onClick={() => goToPage(1)}
            disabled={!canNavigate || pageNumber === 1}
            title="First slide"
            aria-label="First slide"
          >
            <ChevronsLeft size={17} />
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={goToPrevious}
            disabled={!canNavigate || pageNumber === 1}
          >
            <ChevronLeft size={17} />
            Previous
          </button>
          <label className="presentation-page-input">
            <span>Slide</span>
            <input
              value={pageInput}
              inputMode="numeric"
              aria-label="Slide number"
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={commitPageInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  commitPageInput()
                }
              }}
              disabled={!canNavigate}
            />
            <span>of {pageCount || '-'}</span>
          </label>
          <button
            type="button"
            className="nav-button"
            onClick={goToNext}
            disabled={!canNavigate || pageNumber === pageCount}
          >
            Next
            <ChevronRight size={17} />
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={() => goToPage(pageCount)}
            disabled={!canNavigate || pageNumber === pageCount}
            title="Last slide"
            aria-label="Last slide"
          >
            <ChevronsRight size={17} />
          </button>
        </div>

        <a
          href={presentationPdfUrl}
          className="nav-button primary"
          download={presentationDownloadName}
        >
          <Download size={17} />
          Download PDF
        </a>
      </section>

      <div className="presentation-progress" aria-label={`Slide progress ${progress}%`}>
        <div style={{ width: `${progress}%` }} />
      </div>

      <section className="presentation-stage" ref={viewportRef} aria-label="Presentation slide viewer">
        {isDocumentLoading && (
          <div className="presentation-state">
            <LoaderCircle size={30} />
            <strong>Loading presentation</strong>
            <p>{loadProgress === null ? 'Preparing the PDF viewer.' : `${loadProgress}% loaded`}</p>
          </div>
        )}
        {error && (
          <div className="presentation-state error">
            <FileText size={30} />
            <strong>Presentation unavailable</strong>
            <p>{error}</p>
            <a href={presentationPdfUrl} className="nav-button" download={presentationDownloadName}>
              <Download size={17} />
              Download PDF
            </a>
          </div>
        )}
        {!error && (
          <div className={`presentation-canvas-shell ${isPageRendering ? 'rendering' : ''}`}>
            <canvas ref={canvasRef} />
          </div>
        )}
      </section>
    </div>
  )
}
