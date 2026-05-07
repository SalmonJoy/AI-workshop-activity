import {
  useEffect,
  useState,
} from 'react'
import {
  BarChart3,
  BookOpen,
  Bot,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileText,
  Gauge,
  Home,
  Menu,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  CheckboxLine,
  Details,
  InlineChoice,
  PageIntro,
  PageNav,
  PromptBlock,
  ReferenceTable,
  ResponsePortabilityControls,
  ResetSheetButton,
  ScoreCell,
  ScoreTotal,
  Section,
  SelectField,
  StatusPill,
  StoredCheckboxLine,
  StoredSelectField,
  StoredTextArea,
  StoredTextInput,
  TextArea,
  TextInput,
} from './components'
import { postSession, readingArticles, readingMetas, type ReadingArticle, type ReadingSection } from './data/reading'
import {
  benefits,
  controls,
  extendedBenefits,
  extendedControls,
  manufacturingUseCases,
  pilotQuestions,
  scoreCriteria,
  sheet1,
  sheet2,
  sheet3,
  sheet4,
  sheet5,
  sheet6,
  sheet7,
  sheet8,
  sheetMetas,
  workshopPrinciples,
} from './data/workshop'
import { WorkshopProvider } from './hooks/WorkshopProvider'
import { useWorkshopStore } from './hooks/useWorkshopStore'

const sheetIcons = [Sparkles, BarChart3, Factory, Bot, ClipboardCheck, FileText, ShieldCheck, Gauge]
const priorityOptions = ['High', 'Medium', 'Low']
const yesNoOptions = ['Yes', 'No']
const yesNoPartialOptions = ['Yes', 'No', 'Partially']
const priorityFullOptions = ['Critical', 'High', 'Medium', 'Low']
const safetyOptions = ['Safe', 'Use with Caution', 'Not Allowed Without Approval']
const riskOptions = ['Low', 'Medium', 'High']
const sidebarPreferenceKey = 'ai-workshop-sidebar-collapsed'

function App() {
  return (
    <WorkshopProvider>
      <BrowserRouter basename="/workshop/activity">
        <ScrollToTop />
        <AppShell />
      </BrowserRouter>
    </WorkshopProvider>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function AppShell() {
  const { resetAll, progressForSheet } = useWorkshopStore()
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem(sidebarPreferenceKey) !== 'false'
    } catch {
      return true
    }
  })
  const averageProgress = Math.round(
    sheetMetas.reduce((sum, sheet) => sum + progressForSheet(sheet.id), 0) / sheetMetas.length,
  )
  const toggleSidebar = () => {
    setSidebarCollapsed((current) => {
      const next = !current
      try {
        window.localStorage.setItem(sidebarPreferenceKey, String(next))
      } catch {
        // The sidebar still works if localStorage is unavailable.
      }
      return next
    })
  }

  return (
    <div className={`app-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="brand" title="Workshop overview" aria-label="Workshop overview">
            <span className="brand-mark">
              <Factory size={22} />
            </span>
            <span className="brand-copy">
              <strong>Practical AI Workshop</strong>
              <small>Corporate IT in Manufacturing</small>
            </span>
          </Link>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="sheet-list" aria-label="Workshop sheets">
          <NavLink to="/" end className="sheet-link" title="Overview" aria-label="Overview">
            <Home size={18} />
            <span className="sheet-link-label">Overview</span>
          </NavLink>
          <NavLink
            to="/reading"
            className="sheet-link"
            title="Reading Material"
            aria-label="Reading Material"
          >
            <BookOpen size={18} />
            <span className="sheet-link-label">
              Reading
              <small>Reference material</small>
            </span>
          </NavLink>
          {sheetMetas.map((sheet, index) => {
            const Icon = sheetIcons[index]
            const label = `Sheet ${sheet.id}: ${sheet.title}`
            return (
              <NavLink
                to={`/sheet/${sheet.id}`}
                className="sheet-link"
                title={label}
                aria-label={label}
                key={sheet.id}
              >
                <Icon size={18} />
                <span className="sheet-link-label">
                  Sheet {sheet.id}
                  <small>{sheet.shortTitle}</small>
                </span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="overall-progress">
            <span>Workshop progress</span>
            <strong>{averageProgress}%</strong>
            <div className="progress-track">
              <div style={{ width: `${averageProgress}%` }} />
            </div>
          </div>
          <ResponsePortabilityControls iconOnly={isSidebarCollapsed} />
          <button
            type="button"
            className={`ghost-button danger ${isSidebarCollapsed ? 'icon-only-button' : ''}`}
            title="Reset all answers"
            aria-label="Reset all answers"
            onClick={() => {
              if (window.confirm('Clear all saved workshop answers?')) {
                resetAll()
              }
            }}
          >
            <RotateCcw size={16} />
            <span className="button-label">Reset all</span>
          </button>
        </div>
      </aside>

      <div className="mobile-top">
        <Link to="/" className="brand compact">
          <span className="brand-mark">
            <Factory size={21} />
          </span>
          <strong>AI Workshop</strong>
        </Link>
        <Menu size={22} />
      </div>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/reading" element={<ReadingOverview />} />
          <Route path="/reading/:readingId" element={<ReadingRoute />} />
          <Route path="/sheet/:sheetId" element={<SheetRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  const { progressForSheet } = useWorkshopStore()
  const totalMinutes = sheetMetas.reduce((sum, sheet) => {
    const match = sheet.suggestedTime.match(/\d+$/)
    return sum + (match ? Number(match[0]) : 20)
  }, 0)

  return (
    <div className="page">
      <header className="overview-hero">
        <div className="overview-copy">
          <span className="sheet-number">Workshop</span>
          <h1>Practical AI for Corporate IT Teams in Manufacturing</h1>
          <p>
            An interactive workbook for classifying AI concepts, building prompts, analyzing tickets,
            creating reports, and shaping safe manufacturing AI pilots.
          </p>
          <div className="hero-stats">
            <span>
              <strong>8</strong>
              Sheets
            </span>
            <span>
              <strong>4</strong>
              Readings
            </span>
            <span>
              <strong>{totalMinutes}</strong>
              Minutes
            </span>
            <span>
              <strong>Local</strong>
              Saved
            </span>
          </div>
        </div>
        <OperationsVisual />
      </header>

      <Section title="Response Backup">
        <ResponsePortabilityControls variant="panel" />
      </Section>

      <Section title="Reading Material">
        <div className="sheet-grid reading-grid">
          {readingMetas.map((reading) => (
            <Link to={`/reading/${reading.id}`} className="sheet-card reading-card" key={reading.id}>
              <div className="sheet-card-top">
                <span className="sheet-card-icon reading-card-icon">
                  <BookOpen size={21} />
                </span>
                <small>{reading.suggestedTime}</small>
              </div>
              <h3>
                Reading {reading.id}: {reading.title}
              </h3>
              <p>{reading.summary}</p>
              <small>
                {reading.readingType} - {reading.moduleLink}
              </small>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Workshop Sheets">
        <div className="sheet-grid">
          {sheetMetas.map((sheet, index) => {
            const Icon = sheetIcons[index]
            const progress = progressForSheet(sheet.id)
            return (
              <Link to={`/sheet/${sheet.id}`} className="sheet-card" key={sheet.id}>
                <div className="sheet-card-top">
                  <span className="sheet-card-icon">
                    <Icon size={21} />
                  </span>
                  <StatusPill sheetId={sheet.id} />
                </div>
                <h3>
                  Sheet {sheet.id}: {sheet.title}
                </h3>
                <p>{sheet.summary}</p>
                <div className="progress-track">
                  <div style={{ width: `${progress}%` }} />
                </div>
                <small>
                  {sheet.activityType} - {sheet.suggestedTime}
                </small>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section title="Workshop Principles" tone="accent">
        <div className="principles">
          {workshopPrinciples.map((principle) => (
            <div key={principle}>
              <ShieldCheck size={20} />
              <p>{principle}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function OperationsVisual() {
  return (
    <div className="ops-visual" aria-hidden="true">
      <div className="ops-panel header-line">
        <span>MES</span>
        <span>ERP</span>
        <span>ITSM</span>
      </div>
      <div className="ops-flow">
        <div className="machine-row">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="signal-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="ops-panel metrics">
        <span>
          <strong>Line C</strong>
          Priority high
        </span>
        <span>
          <strong>Ticket</strong>
          Plant 2
        </span>
      </div>
    </div>
  )
}

function ReadingOverview() {
  return (
    <div className="page">
      <header className="page-intro reading-overview-intro">
        <div>
          <span className="sheet-number">Reading Material</span>
          <h1>Reference Library and Post-Session Action Plan</h1>
          <p>
            Use these readings before, during, and after the workshop to reinforce the core concepts,
            prompt patterns, practical manufacturing use cases, and responsible AI controls.
          </p>
        </div>
        <div className="meta-strip">
          <span>4 reading pages</span>
          <span>Includes one saved action plan</span>
          <span>Print-ready</span>
        </div>
      </header>

      <Section title="Reading Pages">
        <div className="sheet-grid reading-grid">
          {readingMetas.map((reading) => (
            <Link to={`/reading/${reading.id}`} className="sheet-card reading-card" key={reading.id}>
              <div className="sheet-card-top">
                <span className="sheet-card-icon reading-card-icon">
                  <BookOpen size={21} />
                </span>
                <small>{reading.suggestedTime}</small>
              </div>
              <h3>
                Reading {reading.id}: {reading.title}
              </h3>
              <p>{reading.summary}</p>
              <small>
                {reading.readingType} - {reading.moduleLink}
              </small>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Response Portability" tone="accent">
        <p>
          The post-session action plan on Reading 4 saves responses in the same browser storage as
          the activity sheets. JSON export and import include those reading responses automatically.
        </p>
      </Section>
    </div>
  )
}

function ReadingRoute() {
  const { readingId } = useParams()
  const id = Number(readingId)
  if (!readingMetas.some((reading) => reading.id === id)) {
    return <Navigate to="/reading" replace />
  }

  const article = readingArticles.find((reading) => reading.id === id)

  return (
    <div className="page reading-page">
      {article ? <ReadingArticlePage article={article} /> : <PostSessionReadingPage />}
      <ReadingNav readingId={id} />
    </div>
  )
}

function ReadingMetaStrip({ reading }: { reading: ReadingArticle | (typeof readingMetas)[number] }) {
  return (
    <div className="meta-strip">
      <span>{reading.readingType}</span>
      <span>{reading.suggestedTime}</span>
      <span>{reading.moduleLink}</span>
    </div>
  )
}

function ReadingArticlePage({ article }: { article: ReadingArticle }) {
  return (
    <>
      <header className="page-intro reading-intro">
        <div>
          <span className="sheet-number">Reading {article.id}</span>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
        <ReadingMetaStrip reading={article} />
      </header>

      {article.sections.map((section) => (
        <ReadingSectionView section={section} key={section.title} />
      ))}
    </>
  )
}

function ReadingSectionView({ section }: { section: ReadingSection }) {
  return (
    <Section title={section.title}>
      <div className="reading-section-body">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets && (
          <ul className="plain-list reading-list">
            {section.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.table && <ReferenceTable columns={section.table.columns} rows={section.table.rows} />}
        {section.prompt && <PromptBlock title={section.prompt.title} prompt={section.prompt.text} />}
        {section.takeaway && (
          <div className="reading-takeaway">
            <strong>Key point</strong>
            <p>{section.takeaway}</p>
          </div>
        )}
      </div>
    </Section>
  )
}

function ReadingNav({ readingId }: { readingId: number }) {
  const previous = readingId > 1 ? readingId - 1 : null
  const next = readingId < readingMetas.length ? readingId + 1 : null

  return (
    <nav className="page-nav" aria-label="Reading navigation">
      {previous ? (
        <Link to={`/reading/${previous}`} className="nav-button">
          <ChevronLeft size={17} />
          Reading {previous}
        </Link>
      ) : (
        <Link to="/reading" className="nav-button">
          <ChevronLeft size={17} />
          Reading Overview
        </Link>
      )}
      <button type="button" className="nav-button" onClick={() => window.print()}>
        <Printer size={17} />
        Print
      </button>
      {next ? (
        <Link to={`/reading/${next}`} className="nav-button primary">
          Reading {next}
          <ChevronRight size={17} />
        </Link>
      ) : (
        <Link to="/reading" className="nav-button primary">
          Reading Overview
          <ChevronRight size={17} />
        </Link>
      )}
    </nav>
  )
}

function PostSessionReadingPage() {
  const meta = readingMetas[3]
  const teamLongFields = new Set([
    'Problem Area',
    'Current Process',
    'How AI Can Help',
    'Data Required',
    'Expected Benefit',
    'Main Risk',
    'Control Required',
  ])

  return (
    <>
      <header className="page-intro reading-intro">
        <div>
          <span className="sheet-number">Reading 4</span>
          <h1>{meta.title}</h1>
          <p>{meta.summary}</p>
        </div>
        <ReadingMetaStrip reading={meta} />
      </header>

      <Section title="Purpose of This Sheet">
        <div className="reading-section-body">
          {postSession.purpose.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="plain-list reading-list">
            {postSession.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="What We Covered in the Workshop">
        <ReferenceTable columns={['Area', 'What You Learned']} rows={postSession.coveredAreas} />
      </Section>

      <Section title="Recommended Reading List">
        <ReferenceTable columns={['Topic', 'What to Read', 'Why It Is Useful']} rows={postSession.recommendedReading} />
      </Section>

      <Section title="Suggested 30-Day Learning Plan">
        <div className="reading-week-stack">
          {postSession.weeks.map((week, weekIndex) => (
            <div className="reading-week" key={week.title}>
              <h3>{week.title}</h3>
              <div className="table-scroll">
                <table className="worksheet-table compact-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {week.tasks.map((task, taskIndex) => (
                      <tr key={task}>
                        <td>{task}</td>
                        <td>
                          <StoredCheckboxLine
                            answerKey={`r4.week${weekIndex + 1}.task${taskIndex}`}
                            label="Done"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Personal AI Action Plan">
        <StoredTextInput answerKey="r4.personal.role" label="My Current Role / Function" />
        <h4>Three Tasks Where AI Can Help Me</h4>
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Task</th>
                <th>How AI Can Help</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((number) => (
                <tr key={number}>
                  <td>{number}</td>
                  <td>
                    <StoredTextInput answerKey={`r4.personal.task${number}.name`} />
                  </td>
                  <td>
                    <StoredTextArea answerKey={`r4.personal.task${number}.help`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <StoredTextArea
          answerKey="r4.personal.prompt"
          label="One Prompt I Will Use Regularly"
          placeholder="Act as a... Your task is to... Context... Input... Output format... Constraints..."
        />
      </Section>

      <Section title="Team-Level AI Use Case Idea">
        <div className="form-grid">
          {postSession.teamFields.map((field, index) => {
            const key = `r4.team.field${index}`
            if (field === 'Human Review Needed?') {
              return (
                <StoredSelectField
                  answerKey={key}
                  label={field}
                  options={yesNoOptions}
                  key={field}
                />
              )
            }
            if (field === 'Pilot Timeline') {
              return (
                <StoredSelectField
                  answerKey={key}
                  label={field}
                  options={['30 days', '60 days', '90 days']}
                  key={field}
                />
              )
            }
            return teamLongFields.has(field) ? (
              <StoredTextArea answerKey={key} label={field} key={field} />
            ) : (
              <StoredTextInput answerKey={key} label={field} key={field} />
            )
          })}
        </div>
      </Section>

      <Section title="AI Use Case Selection Checklist">
        <div className="table-scroll">
          <table className="worksheet-table review-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Yes / No / Partially</th>
              </tr>
            </thead>
            <tbody>
              {postSession.checklist.map((question, index) => (
                <tr key={question}>
                  <td>{question}</td>
                  <td>
                    <StoredSelectField
                      answerKey={`r4.selection.${index}`}
                      options={yesNoPartialOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Safe AI Usage Reminder">
        <ReferenceTable columns={['Rule', 'Reminder']} rows={postSession.safeRules} />
      </Section>

      <Section title="Post-Workshop Reflection">
        <div className="question-stack">
          {postSession.reflections.map((question, index) => (
            <StoredTextArea
              answerKey={`r4.reflection.${index}`}
              label={`${index + 1}. ${question}`}
              key={question}
            />
          ))}
        </div>
      </Section>

      <Section title="Final Takeaway" tone="accent">
        <p>{postSession.finalTakeaway}</p>
      </Section>
    </>
  )
}

function SheetRoute() {
  const { sheetId } = useParams()
  const id = Number(sheetId)
  if (!sheetMetas.some((sheet) => sheet.id === id)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="page sheet-page">
      <div className="sheet-actions">
        <StatusPill sheetId={id} />
        <ResetSheetButton sheetId={id} />
      </div>
      {id === 1 && <SheetOne />}
      {id === 2 && <SheetTwo />}
      {id === 3 && <SheetThree />}
      {id === 4 && <SheetFour />}
      {id === 5 && <SheetFive />}
      {id === 6 && <SheetSix />}
      {id === 7 && <SheetSeven />}
      {id === 8 && <SheetEight />}
      <PageNav sheetId={id} />
    </div>
  )
}

function ReflectionList({
  sheetId,
  prefix,
  questions,
}: {
  sheetId: number
  prefix: string
  questions: string[]
}) {
  return (
    <div className="question-stack">
      {questions.map((question, index) => (
        <TextArea
          sheetId={sheetId}
          name={`${prefix}.${index}`}
          label={`${index + 1}. ${question}`}
          key={question}
        />
      ))}
    </div>
  )
}

function ReviewChecklist({
  sheetId,
  prefix,
  questions,
}: {
  sheetId: number
  prefix: string
  questions: string[]
}) {
  return (
    <div className="table-scroll">
      <table className="worksheet-table review-table">
        <thead>
          <tr>
            <th>Review Question</th>
            <th>Yes / No</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question}>
              <td>{question}</td>
              <td>
                <InlineChoice sheetId={sheetId} name={`${prefix}.${index}.yn`} options={yesNoOptions} />
              </td>
              <td>
                <TextInput sheetId={sheetId} name={`${prefix}.${index}.comment`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SheetOne() {
  const sheetId = 1
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet1.objective}>
        <p>{sheet1.intro}</p>
      </PageIntro>

      <Section title="Quick Reference">
        <ReferenceTable
          columns={['Term', 'Simple Meaning', 'Workplace Example']}
          rows={sheet1.quickReference.map((row) => [row.term, row.meaning, row.example])}
        />
      </Section>

      <Section title="Activity Table">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Scenario</th>
                <th>Category</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {sheet1.scenarios.map((scenario, index) => (
                <tr key={scenario}>
                  <td>{index + 1}</td>
                  <td>{scenario}</td>
                  <td>
                    <InlineChoice
                      sheetId={sheetId}
                      name={`scenario.${index}.category`}
                      options={sheet1.categories}
                    />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`scenario.${index}.reason`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Reflection Questions">
        <ReflectionList sheetId={sheetId} prefix="reflection" questions={sheet1.reflections} />
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet1.takeaway}</p>
      </Section>
    </>
  )
}

function SheetTwo() {
  const sheetId = 2
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet2.objective}>
        <p>{sheet2.intro}</p>
      </PageIntro>

      <Section title="Corporate AI Trends">
        <ReferenceTable
          columns={['AI Trend', 'Simple Meaning', 'Workplace Example']}
          rows={sheet2.trends.map((row) => [row.trend, row.meaning, row.example])}
        />
      </Section>

      <Section title="Trend Mapping">
        <div className="table-scroll">
          <table className="worksheet-table wide-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>AI Trend</th>
                {sheet2.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet2.trends.map((trend, index) => (
                <tr key={trend.trend}>
                  <td>{index + 1}</td>
                  <td>{trend.trend}</td>
                  <td>
                    <TextArea sheetId={sheetId} name={`trend.${index}.help`} />
                  </td>
                  <td>
                    <TextArea sheetId={sheetId} name={`trend.${index}.task`} />
                  </td>
                  <td>
                    <TextArea sheetId={sheetId} name={`trend.${index}.data`} />
                  </td>
                  <td>
                    <TextArea sheetId={sheetId} name={`trend.${index}.risk`} />
                  </td>
                  <td>
                    <SelectField
                      sheetId={sheetId}
                      name={`trend.${index}.priority`}
                      options={priorityOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Details title="Example">
        <ReferenceTable
          columns={['AI Trend', 'Where can it help?', 'Example task', 'Data / system required', 'Risk or control needed', 'Priority']}
          rows={[
            [
              sheet2.example.trend,
              sheet2.example.help,
              sheet2.example.task,
              sheet2.example.data,
              sheet2.example.control,
              sheet2.example.priority,
            ],
          ]}
        />
      </Details>

      <Section title="Discussion Questions">
        <ReflectionList sheetId={sheetId} prefix="discussion" questions={sheet2.questions} />
      </Section>

      <Section title="Group Output">
        <div className="two-col">
          {[1, 2].map((number) => (
            <div className="mini-panel" key={number}>
              <h3>Use Case {number}</h3>
              <TextInput sheetId={sheetId} name={`selected.${number}.name`} label="Selected Use Case" />
              <TextArea sheetId={sheetId} name={`selected.${number}.why`} label="Why selected?" />
              <TextArea sheetId={sheetId} name={`selected.${number}.benefit`} label="Expected benefit" />
              <TextArea sheetId={sheetId} name={`selected.${number}.control`} label="Risk/control required" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet2.takeaway}</p>
      </Section>
    </>
  )
}

function UseCaseCard({ sheetId, number, finalCanvas = false }: { sheetId: number; number: number; finalCanvas?: boolean }) {
  const fields = finalCanvas ? sheet8.useCaseFields : ['Use Case Name', ...sheet3.cardFields]
  const benefitList = finalCanvas ? extendedBenefits : benefits
  const controlList = finalCanvas ? extendedControls : controls
  const priorityList = finalCanvas ? sheet8.priorityQuestions : pilotQuestions

  return (
    <div className="use-case-card">
      <h3>Use Case {number}</h3>
      <div className="form-grid">
        {fields.map((field) => (
          <TextArea
            sheetId={sheetId}
            name={`case.${number}.${field}`}
            label={field}
            key={`${number}-${field}`}
          />
        ))}
      </div>

      <div className="split-section">
        <div>
          <h4>Expected Benefit</h4>
          <div className="check-grid">
            {benefitList.map((benefit) => (
              <CheckboxLine
                sheetId={sheetId}
                name={`case.${number}.benefit.${benefit}`}
                label={benefit}
                key={benefit}
              />
            ))}
          </div>
          <TextInput sheetId={sheetId} name={`case.${number}.otherBenefit`} label="Other benefit" />
        </div>
        <div>
          <h4>Controls Required</h4>
          <div className="check-grid">
            {controlList.map((control) => (
              <CheckboxLine
                sheetId={sheetId}
                name={`case.${number}.control.${control}`}
                label={control}
                key={control}
              />
            ))}
          </div>
          <TextInput sheetId={sheetId} name={`case.${number}.otherControl`} label="Other control" />
        </div>
      </div>

      {finalCanvas && (
        <>
          <h4>Data Required</h4>
          <div className="table-scroll">
            <table className="worksheet-table">
              <thead>
                <tr>
                  <th>Data Required</th>
                  <th>Available Today?</th>
                  <th>Owner / Source</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3].map((row) => (
                  <tr key={row}>
                    <td>
                      <TextInput sheetId={sheetId} name={`case.${number}.data.${row}.name`} />
                    </td>
                    <td>
                      <SelectField
                        sheetId={sheetId}
                        name={`case.${number}.data.${row}.available`}
                        options={yesNoPartialOptions}
                      />
                    </td>
                    <td>
                      <TextInput sheetId={sheetId} name={`case.${number}.data.${row}.owner`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4>Success Metric</h4>
          <div className="table-scroll">
            <table className="worksheet-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {sheet8.metrics.map((metric) => (
                  <tr key={metric}>
                    <td>{metric}</td>
                    <td>
                      <TextInput sheetId={sheetId} name={`case.${number}.metric.${metric}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h4>{finalCanvas ? 'Overall Priority' : 'Pilot Feasibility'}</h4>
      <div className="table-scroll">
        <table className="worksheet-table compact-table">
          <tbody>
            {priorityList.map((question) => (
              <tr key={question}>
                <td>{question}</td>
                <td>
                  <SelectField
                    sheetId={sheetId}
                    name={`case.${number}.pilot.${question}`}
                    options={question.toLowerCase().includes('priority') ? priorityOptions : yesNoPartialOptions}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ScoreMatrix({
  sheetId,
  criteria,
  prefix,
}: {
  sheetId: number
  criteria: string[]
  prefix: string
}) {
  return (
    <div className="table-scroll">
      <table className="worksheet-table score-table">
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Use Case 1</th>
            <th>Use Case 2</th>
            <th>Use Case 3</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion}>
              <td>{criterion}</td>
              {[1, 2, 3].map((useCase) => (
                <td key={useCase}>
                  <ScoreCell sheetId={sheetId} name={`${prefix}.${criterion}.${useCase}`} />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Total Score</td>
            {[1, 2, 3].map((useCase) => (
              <td key={useCase}>
                <ScoreTotal sheetId={sheetId} prefix={prefix} criteria={criteria} useCase={useCase} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function SheetThree() {
  const sheetId = 3
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet3.objective} />

      <Section title="Manufacturing AI Use Case List">
        <ReferenceTable columns={['Use Case', 'Simple Description']} rows={manufacturingUseCases} />
      </Section>

      <Section title="Use Case Cards">
        {[1, 2, 3].map((number) => (
          <UseCaseCard sheetId={sheetId} number={number} key={number} />
        ))}
      </Section>

      <Section title="Prioritization Matrix">
        <ScoreMatrix sheetId={sheetId} criteria={scoreCriteria} prefix="score" />
      </Section>

      <Section title="Final Selection">
        <ReflectionList sheetId={sheetId} prefix="final" questions={sheet3.finalQuestions} />
      </Section>

      <Details title="Example Completed Use Case">
        <ReferenceTable columns={['Field', 'Example']} rows={sheet3.exampleRows} />
      </Details>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet3.takeaway}</p>
      </Section>
    </>
  )
}

function SheetFour() {
  const sheetId = 4
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet4.objective} />

      <Section title="Prompt Structure">
        <ReferenceTable columns={['Prompt Element', 'Meaning', 'Example']} rows={sheet4.promptStructure} />
      </Section>

      <Section title="Basic Prompt Template">
        <PromptBlock title="Copy and adapt" prompt={sheet4.basicTemplate} />
      </Section>

      <Section title="Weak Prompt vs Strong Prompt">
        {sheet4.examples.map((example) => (
          <Details title={example.title} key={example.title}>
            {example.weak && (
              <div className="weak-prompt">
                <strong>Weak Prompt</strong>
                <p>{example.weak}</p>
              </div>
            )}
            <PromptBlock title="Strong Prompt" prompt={example.strong} />
          </Details>
        ))}
      </Section>

      <Section title="Improve the Prompt">
        <div className="question-stack">
          {sheet4.weakPrompts.map((prompt, index) => (
            <TextArea
              sheetId={sheetId}
              name={`improve.${index}`}
              label={`Weak Prompt ${index + 1}: ${prompt}`}
              key={prompt}
            />
          ))}
        </div>
      </Section>

      <Section title="Build Your Own Workplace Prompt">
        <div className="split-section">
          <div>
            <h4>Task Type</h4>
            <div className="check-grid">
              {sheet4.taskTypes.map((task) => (
                <CheckboxLine sheetId={sheetId} name={`task.${task}`} label={task} key={task} />
              ))}
            </div>
            <TextInput sheetId={sheetId} name="task.other" label="If other, mention the task" />
          </div>
          <div>
            <h4>Output Format</h4>
            <div className="check-grid">
              {sheet4.outputFormats.map((format) => (
                <CheckboxLine sheetId={sheetId} name={`format.${format}`} label={format} key={format} />
              ))}
            </div>
          </div>
        </div>

        <div className="form-grid">
          <TextArea sheetId={sheetId} name="builder.role" label="1. Role" />
          <TextArea sheetId={sheetId} name="builder.task" label="2. Task" />
          <TextArea sheetId={sheetId} name="builder.context" label="3. Context" />
          <TextArea sheetId={sheetId} name="builder.input" label="4. Input" />
          <TextArea sheetId={sheetId} name="builder.output" label="5. Exact output format" />
          <TextArea sheetId={sheetId} name="builder.constraints" label="6. Other constraints" />
        </div>

        <h4>Constraints</h4>
        <div className="check-grid">
          {sheet4.constraints.map((constraint) => (
            <CheckboxLine
              sheetId={sheetId}
              name={`constraint.${constraint}`}
              label={constraint}
              key={constraint}
            />
          ))}
        </div>

        <TextArea sheetId={sheetId} name="finalPrompt" label="Final Prompt" />
      </Section>

      <Section title="Pair Review">
        <ReviewChecklist sheetId={sheetId} prefix="pairReview" questions={sheet4.reviewQuestions} />
      </Section>

      <Details title="Common Prompting Mistakes">
        <ReferenceTable columns={['Mistake', 'Example', 'Better Approach']} rows={sheet4.mistakes} />
      </Details>

      <Section title="Prompt Quality Checklist">
        <div className="check-grid">
          {sheet4.checklist.map((item) => (
            <CheckboxLine sheetId={sheetId} name={`quality.${item}`} label={item} key={item} />
          ))}
        </div>
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet4.takeaway}</p>
      </Section>
    </>
  )
}

function SheetFive() {
  const sheetId = 5
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet5.objective}>
        <p>{sheet5.scenario}</p>
      </PageIntro>

      <Section title="Sample Ticket">
        <pre className="sample-block">{sheet5.sampleTicket}</pre>
      </Section>

      <Section title="Manual Analysis">
        <div className="form-grid">
          {sheet5.manualFields.map((field) => (
            <TextArea sheetId={sheetId} name={`manual.${field}`} label={field} key={field} />
          ))}
        </div>
      </Section>

      <Section title="Priority Assessment">
        <ReferenceTable columns={['Priority', 'When to use']} rows={sheet5.priorityRows} />
        <div className="table-scroll">
          <table className="worksheet-table compact-table">
            <tbody>
              {sheet5.priorityQuestions.map((question, index) => (
                <tr key={question}>
                  <td>{question}</td>
                  <td>
                    <SelectField
                      sheetId={sheetId}
                      name={`priority.${index}`}
                      options={
                        question === 'Final priority'
                          ? priorityFullOptions
                          : question.includes('workaround')
                            ? ['Yes', 'No', 'Not known']
                            : yesNoOptions
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="AI Prompt">
        <PromptBlock title="Ticket Analysis Prompt" prompt={sheet5.aiPrompt} />
      </Section>

      <Section title="AI Output Review">
        <ReviewChecklist sheetId={sheetId} prefix="aiReview" questions={sheet5.reviewQuestions} />
      </Section>

      <Section title="Troubleshooting Plan">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Action</th>
                <th>Owner</th>
                <th>Expected Outcome</th>
              </tr>
            </thead>
            <tbody>
              {sheet5.troubleshootingSteps.map((step, index) => (
                <tr key={step}>
                  <td>{index + 1}</td>
                  <td>{step}</td>
                  <td>
                    <TextInput sheetId={sheetId} name={`trouble.${index}.owner`} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`trouble.${index}.outcome`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Employee Response Draft">
        <PromptBlock title="Suggested Draft" prompt={sheet5.responseDraft} />
        <TextArea sheetId={sheetId} name="employeeResponse" label="Your draft response" />
      </Section>

      <Section title="Final Ticket Analysis">
        <div className="form-grid">
          {sheet5.finalFields.map((field) => (
            <TextArea sheetId={sheetId} name={`final.${field}`} label={field} key={field} />
          ))}
        </div>
      </Section>

      <Section title="Preventive Action">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Preventive Action</th>
                <th>Owner</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {sheet5.preventiveActions.map((action, index) => (
                <tr key={action}>
                  <td>{action}</td>
                  <td>
                    <TextInput sheetId={sheetId} name={`preventive.${index}.owner`} />
                  </td>
                  <td>
                    <SelectField
                      sheetId={sheetId}
                      name={`preventive.${index}.priority`}
                      options={priorityOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Reflection Questions">
        <ReflectionList sheetId={sheetId} prefix="reflection" questions={sheet5.reflections} />
      </Section>

      <Details title="Trainer Note: Suggested Answer">
        <ReferenceTable columns={['Field', 'Suggested Answer']} rows={sheet5.suggestedAnswer} />
      </Details>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet5.takeaway}</p>
      </Section>
    </>
  )
}

function SheetSix() {
  const sheetId = 6
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet6.objective}>
        <p>{sheet6.scenario}</p>
      </PageIntro>

      <Section title="Sample Operational Data">
        <ReferenceTable
          columns={['Production Line', 'Downtime', 'Defects', 'Output', 'Target Output', 'Notes']}
          rows={sheet6.operationalData}
        />
      </Section>

      <Section title="Manual Review">
        <ReflectionList sheetId={sheetId} prefix="manual" questions={sheet6.manualQuestions} />
      </Section>

      <Section title="Basic Calculations">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Production Line</th>
                <th>Target Output</th>
                <th>Actual Output</th>
                <th>Difference</th>
                <th>Above / Below Target</th>
              </tr>
            </thead>
            <tbody>
              {sheet6.operationalData.map((line, index) => (
                <tr key={line[0]}>
                  <td>{line[0]}</td>
                  <td>{line[4].replace(' units', '')}</td>
                  <td>{line[3].replace(' units', '')}</td>
                  <td>
                    <TextInput sheetId={sheetId} name={`calc.${index}.difference`} />
                  </td>
                  <td>
                    <SelectField
                      sheetId={sheetId}
                      name={`calc.${index}.status`}
                      options={['Above Target', 'Below Target']}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="AI Prompt for Report Generation">
        <PromptBlock title="Management Report Prompt" prompt={sheet6.aiPrompt} />
      </Section>

      <Section title="AI-Generated Report Review">
        <ReviewChecklist sheetId={sheetId} prefix="reportReview" questions={sheet6.reviewQuestions} />
      </Section>

      <Section title="Final Management Report">
        <TextArea sheetId={sheetId} name="report.executiveSummary" label="1. Executive Summary" />
        <h4>2. Key Observations</h4>
        <div className="form-grid">
          {sheet6.observationFields.map((field) => (
            <TextInput sheetId={sheetId} name={`observation.${field}`} label={field} key={field} />
          ))}
        </div>
        <h4>3. Production Performance</h4>
        <div className="form-grid">
          {sheet6.operationalData.map((line) => (
            <TextArea
              sheetId={sheetId}
              name={`performance.${line[0]}`}
              label={`${line[0]} Performance Summary`}
              key={line[0]}
            />
          ))}
        </div>
        <TextArea sheetId={sheetId} name="report.downtime" label="4. Downtime Analysis" />
        <TextArea sheetId={sheetId} name="report.quality" label="5. Quality / Defect Analysis" />
        <h4>6. Business Impact</h4>
        <div className="check-grid">
          {sheet6.impactOptions.map((impact) => (
            <CheckboxLine sheetId={sheetId} name={`impact.${impact}`} label={impact} key={impact} />
          ))}
        </div>
        <TextInput sheetId={sheetId} name="impact.other" label="Additional impact" />
      </Section>

      <Section title="Recommended Actions">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Recommended Action</th>
                <th>Owner</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              {priorityOptions.map((priority) => (
                <tr key={priority}>
                  <td>{priority}</td>
                  <td>
                    <TextArea sheetId={sheetId} name={`action.${priority}.text`} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`action.${priority}.owner`} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`action.${priority}.timeline`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Priority Level by Production Line">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Production Line</th>
                <th>Priority</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {sheet6.operationalData.map((line) => (
                <tr key={line[0]}>
                  <td>{line[0]}</td>
                  <td>
                    <SelectField
                      sheetId={sheetId}
                      name={`linePriority.${line[0]}`}
                      options={priorityOptions}
                    />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`lineReason.${line[0]}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Data Gaps">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Missing Information</th>
                <th>Why it is needed</th>
              </tr>
            </thead>
            <tbody>
              {sheet6.dataGaps.map(([gap], index) => (
                <tr key={gap}>
                  <td>{gap}</td>
                  <td>
                    <TextInput sheetId={sheetId} name={`gap.${index}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TextInput sheetId={sheetId} name="gap.other" label="Other missing information" />
      </Section>

      <Section title="Improved Prompt Challenge">
        <TextArea sheetId={sheetId} name="improvedPrompt" label="Your improved prompt" />
      </Section>

      <Details title="Sample Final Report Format">
        <p>{sheet6.sampleReport.summary}</p>
        <ReferenceTable columns={['Issue', 'Affected Line', 'Impact', 'Priority']} rows={sheet6.sampleReport.issues} />
        <ReferenceTable columns={['Action', 'Owner', 'Priority']} rows={sheet6.sampleReport.actions} />
        <ReferenceTable columns={['Data Needed', 'Purpose']} rows={sheet6.sampleReport.data} />
      </Details>

      <Section title="Reflection Questions">
        <ReflectionList sheetId={sheetId} prefix="reflection" questions={sheet6.reflections} />
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet6.takeaway}</p>
      </Section>
    </>
  )
}

function SheetSeven() {
  const sheetId = 7
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet7.objective}>
        <ul className="plain-list">
          {sheet7.whyItMatters.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PageIntro>

      <Section title="What Not to Share in Public AI Tools">
        <ReferenceTable columns={['Data Type', 'Example', 'Can it be entered into public AI tools?']} rows={sheet7.noShare} />
      </Section>

      <Section title="AI Usage Safety Checklist">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Yes / No</th>
                <th>Action Required</th>
              </tr>
            </thead>
            <tbody>
              {sheet7.safetyQuestions.map(([question, action], index) => (
                <tr key={question}>
                  <td>{index + 1}</td>
                  <td>{question}</td>
                  <td>
                    <InlineChoice sheetId={sheetId} name={`safety.${index}`} options={yesNoOptions} />
                  </td>
                  <td>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Classify the AI Use Case">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Scenario</th>
                <th>Classification</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {sheet7.classifyScenarios.map((scenario, index) => (
                <tr key={scenario}>
                  <td>{index + 1}</td>
                  <td>{scenario}</td>
                  <td>
                    <InlineChoice sheetId={sheetId} name={`classify.${index}`} options={safetyOptions} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`classify.${index}.reason`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Data Masking Practice">
        <div className="split-section">
          <div>
            <h4>Unsafe Input</h4>
            <pre className="sample-block">{sheet7.unsafeInput}</pre>
          </div>
          <div>
            <h4>Reference Masked Version</h4>
            <pre className="sample-block">{sheet7.maskedInput}</pre>
          </div>
        </div>
        <TextArea sheetId={sheetId} name="maskedVersion" label="Your safe / masked version" />
      </Section>

      <Section title="Human Review Requirement">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>AI Output Type</th>
                <th>Human Review Required?</th>
                <th>Reviewer</th>
              </tr>
            </thead>
            <tbody>
              {sheet7.humanReviewRows.map((row, index) => (
                <tr key={row}>
                  <td>{row}</td>
                  <td>
                    <InlineChoice sheetId={sheetId} name={`human.${index}.required`} options={yesNoOptions} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`human.${index}.reviewer`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="AI Risk Assessment">
        <div className="table-scroll">
          <table className="worksheet-table">
            <thead>
              <tr>
                <th>Risk Area</th>
                <th>Question</th>
                <th>Risk Level</th>
                <th>Control Required</th>
              </tr>
            </thead>
            <tbody>
              {sheet7.riskAreas.map(([area, question], index) => (
                <tr key={area}>
                  <td>{area}</td>
                  <td>{question}</td>
                  <td>
                    <SelectField sheetId={sheetId} name={`risk.${index}.level`} options={riskOptions} />
                  </td>
                  <td>
                    <TextInput sheetId={sheetId} name={`risk.${index}.control`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Safe AI Usage Rules">
        <ReferenceTable columns={['Rule', 'Description']} rows={sheet7.rules} />
      </Section>

      <Section title="Group Discussion">
        <ReflectionList sheetId={sheetId} prefix="discussion" questions={sheet7.discussionQuestions} />
      </Section>

      <Section title="Responsible AI Declaration">
        <div className="check-grid">
          {sheet7.declaration.map((item) => (
            <CheckboxLine sheetId={sheetId} name={`declaration.${item}`} label={item} key={item} />
          ))}
        </div>
        <div className="form-grid short-fields">
          <TextInput sheetId={sheetId} name="participant.name" label="Participant Name" />
          <TextInput sheetId={sheetId} name="participant.signature" label="Signature" />
          <TextInput sheetId={sheetId} name="participant.date" label="Date" />
        </div>
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet7.takeaway}</p>
      </Section>
    </>
  )
}

function SheetEight() {
  const sheetId = 8
  return (
    <>
      <PageIntro sheetId={sheetId} objective={sheet8.objective}>
        <p>Example departments and functions: {sheet8.departments}.</p>
      </PageIntro>

      <Section title="Use Case Canvases">
        {[1, 2, 3].map((number) => (
          <UseCaseCard sheetId={sheetId} number={number} finalCanvas key={number} />
        ))}
      </Section>

      <Section title="Final Group Prioritization">
        <ScoreMatrix sheetId={sheetId} criteria={sheet8.scoringCriteria} prefix="finalScore" />
      </Section>

      <Section title="Selected Use Case for Presentation">
        <ReflectionList sheetId={sheetId} prefix="presentation" questions={sheet8.presentationFields} />
      </Section>

      <Details title="Example Use Case for Reference">
        <ReferenceTable columns={['Field', 'Example Answer']} rows={sheet8.exampleRows} />
      </Details>

      <Section title="Presentation Format">
        <PromptBlock title="2-3 minute group presentation" prompt={sheet8.presentationTemplate} />
      </Section>

      <Section title="Key Takeaway" tone="accent">
        <p>{sheet8.takeaway}</p>
      </Section>
    </>
  )
}

export default App
