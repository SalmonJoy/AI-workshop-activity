export type ReadingMeta = {
  id: number
  title: string
  shortTitle: string
  readingType: string
  suggestedTime: string
  moduleLink: string
  summary: string
}

export type ReadingSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  table?: {
    columns: string[]
    rows: string[][]
  }
  prompt?: {
    title: string
    text: string
  }
  takeaway?: string
}

export type ReadingArticle = ReadingMeta & {
  sections: ReadingSection[]
}

export const readingMetas: ReadingMeta[] = [
  {
    id: 1,
    title: 'AI Basics for Corporate IT Teams',
    shortTitle: 'AI Basics',
    readingType: 'Pre-session / Reference Reading',
    suggestedTime: '10-15 minutes',
    moduleLink: 'Introduction to AI for Corporate IT',
    summary:
      'Builds the base vocabulary for automation, analytics, AI, generative AI, agentic AI, human review, data security, and manufacturing IT examples.',
  },
  {
    id: 2,
    title: 'AI Use Cases in Manufacturing and IT Operations',
    shortTitle: 'Use Cases',
    readingType: 'Pre-session / Reference Reading',
    suggestedTime: '10-15 minutes',
    moduleLink: 'AI Use Cases in Manufacturing and IT Operations',
    summary:
      'Maps practical AI opportunities across maintenance, quality, production reporting, inventory, supply chain, SOP search, helpdesk, cybersecurity, development, and reporting.',
  },
  {
    id: 3,
    title: 'Prompt Engineering Cheat Sheet',
    shortTitle: 'Prompts',
    readingType: 'Quick Reference / Handout',
    suggestedTime: '10 minutes',
    moduleLink: 'Prompt Engineering for Workplace Productivity',
    summary:
      'Provides a reusable prompt formula, workplace prompt templates, safe prompting checks, output formats, and common mistakes to avoid.',
  },
  {
    id: 4,
    title: 'Post-Session Reading List and 30-Day AI Action Plan',
    shortTitle: 'Action Plan',
    readingType: 'Post-session Reference + Action Planning Sheet',
    suggestedTime: '20-30 minutes',
    moduleLink: 'Wrap-up and Q&A',
    summary:
      'Turns the workshop into follow-up action with a reading list, 30-day learning plan, personal AI task plan, team pilot idea, and safe usage reflection.',
  },
]

export const readingArticles: ReadingArticle[] = [
  {
    ...readingMetas[0],
    sections: [
      {
        title: 'Why Corporate IT Teams Should Understand AI',
        paragraphs: [
          'AI is becoming part of daily corporate work. It is used in helpdesk support, reporting, software development, documentation, production monitoring, cybersecurity, knowledge search, workflow automation, and decision support.',
          'For manufacturing organizations, IT teams play an important role because most AI use cases depend on systems, data, applications, infrastructure, security, and governance.',
          'AI is not only a business tool. It is also an IT responsibility.',
        ],
        bullets: [
          'Selecting AI tools',
          'Integrating AI with existing systems',
          'Managing data access',
          'Securing sensitive information',
          'Monitoring AI-enabled workflows',
          'Supporting business users',
          'Building internal AI assistants',
          'Creating governance and approval processes',
        ],
      },
      {
        title: 'Simple Meaning of AI',
        paragraphs: [
          'Artificial Intelligence means computer systems that can perform tasks that usually require human-like intelligence.',
          'In a corporate environment, AI is useful when there is too much information for humans to manually review, or when a process can be improved using prediction, classification, summarization, or automation.',
        ],
        bullets: [
          'Understanding text',
          'Recognizing images',
          'Predicting outcomes',
          'Classifying information',
          'Finding patterns',
          'Recommending actions',
          'Generating content',
          'Answering questions',
          'Making decisions with human supervision',
        ],
      },
      {
        title: 'AI vs Automation vs Analytics vs Generative AI',
        paragraphs: ['Many people use the word AI for every technology, but not every system is AI.'],
        table: {
          columns: ['Term', 'Simple Meaning', 'Workplace Example'],
          rows: [
            ['Automation', 'A fixed rule or workflow performs a task automatically.', 'Send an email alert when server CPU goes above 90%.'],
            ['Analytics', 'Data is analyzed to understand performance, trends, or patterns.', 'Dashboard showing downtime by plant and production line.'],
            ['AI', 'A system predicts, classifies, detects, or recommends based on data.', 'Predicting which machine may fail in the next 7 days.'],
            ['Generative AI', 'AI creates new content such as text, reports, emails, code, images, or summaries.', 'AI drafting a root cause analysis report from incident logs.'],
            ['Agentic AI', 'AI plans and performs multi-step tasks using tools, data, or workflows with limited human supervision.', 'AI reads a ticket, checks logs, suggests resolution, drafts a reply, and updates ticket status after approval.'],
          ],
        },
      },
      {
        title: 'Examples in Manufacturing and IT',
        table: {
          columns: ['Area', 'Traditional Approach', 'AI-Assisted Approach'],
          rows: [
            ['IT Helpdesk', 'Agent manually reads every ticket and assigns category.', 'AI summarizes, classifies, prioritizes, and suggests next action.'],
            ['Maintenance', 'Team reacts after machine breakdown.', 'AI predicts possible failure using sensor and maintenance data.'],
            ['Quality', 'Manual inspection of product defects.', 'Computer vision detects defects from images or video.'],
            ['Reporting', 'Analyst manually prepares daily or weekly report.', 'AI converts raw data into structured management report.'],
            ['SOP Search', 'Employees manually search long PDF documents.', 'AI answers questions from approved SOPs and manuals.'],
            ['Cybersecurity', 'Manual review of logs and alerts.', 'AI detects unusual activity and summarizes risk indicators.'],
            ['Software Development', 'Developer writes all test cases manually.', 'AI suggests test cases, explains code, and helps debug errors.'],
            ['Production Monitoring', 'Dashboard shows what happened.', 'AI highlights what changed, what is risky, and what needs attention.'],
          ],
        },
      },
      {
        title: 'Generative AI and Agentic AI',
        paragraphs: [
          'Generative AI creates new content based on patterns learned from data. It can generate text, emails, reports, code, summaries, checklists, images, audio, presentations, and documentation.',
          'Agentic AI is more advanced because it can plan and perform a sequence of steps. For example, an agentic workflow can read a ticket, identify the affected system, check similar past tickets, search SOPs, suggest troubleshooting steps, draft a response, ask for approval, and update the ticket.',
        ],
      },
      {
        title: 'What AI Can Do Well',
        paragraphs: ['AI is useful for tasks where information needs to be processed, summarized, classified, generated, or analyzed.'],
        table: {
          columns: ['Task', 'Example'],
          rows: [
            ['Summarization', 'Summarize a 10-page SOP into key steps.'],
            ['Classification', 'Classify helpdesk tickets into network, access, hardware, or application issues.'],
            ['Drafting', 'Draft an email to employees about system maintenance.'],
            ['Report generation', 'Convert downtime data into a management report.'],
            ['Data extraction', 'Extract key details from logs, tickets, or documents.'],
            ['Pattern detection', 'Identify repeated issues from incident history.'],
            ['Prediction', 'Predict machine failure or inventory requirement.'],
            ['Recommendation', 'Suggest next troubleshooting step.'],
            ['Knowledge search', 'Answer questions from internal documents.'],
            ['Code assistance', 'Explain code, generate test cases, or debug errors.'],
          ],
        },
      },
      {
        title: 'What AI Cannot Be Trusted to Do Blindly',
        paragraphs: [
          'AI should not be treated as always correct. It can make mistakes when input data is incomplete, context is missing, the question is vague, the model lacks current internal data, the task requires domain judgment, or the output affects safety, compliance, production, finance, or security.',
          'AI may also produce confident but incorrect answers. This is often called hallucination. Therefore, AI output should be reviewed before use.',
        ],
      },
      {
        title: 'Human-in-the-Loop Approach',
        paragraphs: [
          'For corporate IT and manufacturing use cases, humans should remain in control, especially for production decisions, maintenance actions, safety recommendations, customer communication, employee matters, financial or legal content, cybersecurity incidents, system changes, code deployment, and compliance reporting.',
        ],
        table: {
          columns: ['AI Role', 'Human Role'],
          rows: [
            ['Summarize information', 'Verify correctness'],
            ['Suggest next steps', 'Approve action'],
            ['Draft report', 'Review before sharing'],
            ['Classify ticket', 'Confirm priority'],
            ['Analyze logs', 'Validate root cause'],
            ['Generate code', 'Test before deployment'],
            ['Search documents', 'Check source reference'],
          ],
        },
      },
      {
        title: 'Why Data Security Matters',
        paragraphs: ['Corporate IT teams must be careful about what data is entered into AI tools. Use masked or dummy data wherever possible.'],
        bullets: [
          'Passwords',
          'API keys',
          'Access tokens',
          'Customer details',
          'Employee personal data',
          'Confidential contracts',
          'Source code',
          'Internal network details',
          'Production system credentials',
          'Sensitive logs',
          'Vendor pricing',
          'Business strategy documents',
        ],
      },
      {
        title: 'AI in Manufacturing: Practical Areas',
        table: {
          columns: ['Area', 'AI Opportunity'],
          rows: [
            ['Maintenance', 'Predict machine failure and reduce downtime.'],
            ['Quality', 'Detect defects and identify repeated quality issues.'],
            ['Production', 'Generate daily production reports and highlight bottlenecks.'],
            ['Supply Chain', 'Forecast inventory and identify delay patterns.'],
            ['IT Operations', 'Classify tickets, summarize incidents, and suggest actions.'],
            ['Knowledge Management', 'Build SOP and manual search assistants.'],
            ['Cybersecurity', 'Detect unusual login or network activity.'],
            ['Software Development', 'Generate test cases, explain code, and support debugging.'],
            ['Reporting', 'Convert raw ERP, MES, or helpdesk data into reports.'],
          ],
        },
      },
      {
        title: 'Example: AI for IT Helpdesk',
        paragraphs: [
          'Without AI, an IT support person manually reads the ticket, identifies the issue, decides priority, writes a response, and escalates if needed.',
          'With AI assistance, the support person can get a structured summary, category, priority, possible cause, next step, and draft response. The final decision should still be reviewed by the IT team.',
        ],
        table: {
          columns: ['Output', 'Example'],
          rows: [
            ['Summary', 'User is unable to access MES dashboard from Plant 2.'],
            ['Category', 'Application / Network'],
            ['Priority', 'High'],
            ['Possible cause', 'Network maintenance may have affected access.'],
            ['Next step', 'Check Plant 2 connectivity and dashboard logs.'],
            ['Draft response', 'A professional update to the employee.'],
          ],
        },
      },
      {
        title: 'Example: AI for Production Reporting',
        paragraphs: [
          'AI can review line-level production data and produce a concise report. For example, it may highlight that Line C has the highest downtime and defect count, Line B performed best, Line A needs sensor calibration review, and more data is required on defect type and shift-wise downtime.',
          'This saves time, but the report must be validated by the operations team.',
        ],
      },
      {
        title: 'Key Terms to Remember',
        table: {
          columns: ['Term', 'Meaning'],
          rows: [
            ['Prompt', 'The instruction or question given to an AI tool.'],
            ['LLM', 'Large Language Model; an AI model that works with text and language.'],
            ['Generative AI', 'AI that creates new content like reports, emails, code, or summaries.'],
            ['AI Agent', 'AI system that can perform tasks using tools or workflows.'],
            ['Hallucination', 'When AI gives an incorrect or unsupported answer confidently.'],
            ['Human-in-the-loop', 'Human review before AI output is used for important decisions.'],
            ['Data masking', 'Removing or hiding sensitive information before using data.'],
            ['Governance', 'Rules and controls for safe and responsible AI use.'],
            ['RAG', 'Retrieval-Augmented Generation; AI answers using selected internal documents or data.'],
            ['Copilot', 'AI assistant that supports a user inside a work tool or workflow.'],
          ],
        },
      },
      {
        title: 'Quick Self-Check',
        bullets: [
          'Is every automated system an AI system?',
          'Give one example of Generative AI in your work.',
          'Give one example where AI output must be reviewed by a human.',
          'What type of data should not be entered into public AI tools?',
          'Which AI use case can help your team immediately?',
        ],
        takeaway:
          'Use AI for assistance. Use humans for judgment, approval, and accountability.',
      },
    ],
  },
  {
    ...readingMetas[1],
    sections: [
      {
        title: 'Why AI is Useful in Manufacturing',
        paragraphs: [
          'Manufacturing organizations generate a large amount of data every day from production lines, machines, sensors, ERP systems, MES systems, quality systems, maintenance logs, inventory records, supply chain systems, IT helpdesk tickets, cybersecurity tools, SOPs, and machine manuals.',
          'AI can help convert this data into useful insights, predictions, alerts, summaries, and recommendations.',
        ],
        bullets: [
          'Reduce downtime',
          'Improve product quality',
          'Increase production efficiency',
          'Improve reporting',
          'Support maintenance teams',
          'Improve inventory planning',
          'Reduce manual work',
          'Improve IT support',
          'Detect risks earlier',
          'Improve knowledge access',
        ],
      },
      {
        title: 'Manufacturing AI Use Case Overview',
        table: {
          columns: ['Use Case', 'What AI Can Do', 'Business Benefit'],
          rows: [
            ['Predictive maintenance', 'Predict possible machine failure before breakdown.', 'Reduced downtime and maintenance cost.'],
            ['Quality inspection', 'Detect defects using images, video, or inspection data.', 'Better product quality and fewer rejections.'],
            ['Production reporting', 'Convert raw production data into reports.', 'Faster reporting and better decision-making.'],
            ['Inventory optimization', 'Forecast material or spare part requirements.', 'Better planning and reduced stock issues.'],
            ['Supply chain analysis', 'Identify delay patterns and vendor issues.', 'Faster response to supply chain risks.'],
            ['SOP/manual assistant', 'Answer questions from approved documents.', 'Faster knowledge access.'],
            ['IT ticket analysis', 'Summarize, classify, and prioritize tickets.', 'Faster IT support.'],
            ['Cybersecurity monitoring', 'Detect unusual activity in logs and systems.', 'Earlier risk detection.'],
            ['Software development support', 'Generate test cases, explain code, and help debugging.', 'Faster development and better documentation.'],
            ['Automated report generation', 'Convert ERP, MES, or IT data into business reports.', 'Saves manual effort and improves consistency.'],
          ],
        },
      },
      {
        title: 'Use Case 1: Predictive Maintenance',
        paragraphs: [
          'Predictive maintenance uses machine data to identify whether equipment is likely to fail in the future. Instead of waiting for breakdowns, the maintenance team can act before failure happens.',
          'Example: A motor on Line C has shown repeated overheating. AI can analyze past motor temperature, load, vibration, and downtime history to predict whether the motor may fail soon.',
        ],
        table: {
          columns: ['Data Type', 'Example'],
          rows: [
            ['Sensor data', 'Temperature, vibration, pressure, current, speed'],
            ['Machine history', 'Previous breakdowns, repairs, replacements'],
            ['Maintenance logs', 'Service dates, parts changed, technician notes'],
            ['Production data', 'Output, runtime, idle time'],
            ['Alarm data', 'Machine alerts, error codes'],
          ],
        },
        bullets: [
          'Expected benefit: lower unplanned downtime, better maintenance planning, reduced disruption, better spare part readiness, and better machine health visibility.',
          'Risk: AI may incorrectly predict failure or miss an actual failure.',
          'Control: Maintenance team should validate AI alerts before taking action.',
        ],
      },
      {
        title: 'Use Case 2: Quality Inspection and Defect Detection',
        paragraphs: [
          'AI can help detect defects in products using camera images, video feeds, sensor data, or inspection records. This is useful when manual inspection is slow, inconsistent, or difficult at scale.',
          'Example: A camera captures images of parts moving on a production line. AI checks whether the part has visible defects and flags it for review.',
        ],
        table: {
          columns: ['Data Type', 'Example'],
          rows: [
            ['Product images', 'Photos of good and defective products'],
            ['Defect labels', 'Scratch, crack, wrong size, discoloration'],
            ['Inspection records', 'Pass/fail results'],
            ['Production batch details', 'Batch number, line number, shift'],
            ['Rejection history', 'Defect count and reason'],
          ],
        },
        bullets: [
          'Expected benefit: faster inspection, more consistent checks, reduced manual load, early detection, and lower rework cost.',
          'Risk: AI may wrongly classify a good product as defective or miss a defective product.',
          'Control: Quality team should validate AI results, especially during initial deployment.',
        ],
      },
      {
        title: 'Use Case 3: Production Report Generation',
        paragraphs: [
          'AI can convert raw production data into clear reports for supervisors, managers, and leadership. It can summarize what happened, identify issues, explain business impact, and suggest actions.',
          'Example: AI may identify Line C as urgent because it has the highest downtime, highest defects, and lowest output, while Line B is performing well.',
        ],
        table: {
          columns: ['Data Type', 'Example'],
          rows: [
            ['Production output', 'Target vs actual output'],
            ['Downtime data', 'Downtime minutes and reason'],
            ['Quality data', 'Defects, rejections, rework'],
            ['Shift data', 'Shift-wise performance'],
            ['Machine data', 'Utilization, availability'],
            ['Notes', 'Operator comments or supervisor remarks'],
          ],
        },
        bullets: [
          'Expected benefit: faster reporting, better visibility, less manual preparation, clearer issue prioritization, and consistent format.',
          'Risk: AI may misinterpret data or give recommendations without full operational context.',
          'Control: Operations team should review the report before sharing it with management.',
        ],
      },
      {
        title: 'Use Cases 4-6: Planning, Supply Chain, and Knowledge Search',
        table: {
          columns: ['Use Case', 'Core Data', 'Example', 'Risk', 'Required Control'],
          rows: [
            ['Inventory and spare parts optimization', 'Inventory records, consumption history, maintenance history, production plan, vendor lead time', 'AI recommends stocking a bearing before the next expected maintenance cycle.', 'Incorrect forecasts can cause overstocking or stockouts.', 'Purchase and maintenance teams review recommendations before procurement.'],
            ['Supply chain delay analysis', 'Purchase orders, vendor data, delivery records, logistics data, production dependency', 'AI finds that a vendor frequently delays a critical component during month-end dispatch cycles.', 'AI may identify correlation but not actual cause.', 'Procurement and supply chain teams validate delay reasons before vendor action.'],
            ['SOP and machine manual search assistant', 'SOP documents, machine manuals, internal policies, FAQs, approved procedures', 'Users ask questions such as restart procedure, MES timeout checks, or production-critical escalation process.', 'AI may give incorrect answers if documents are outdated or unclear.', 'Use only approved documents and show source references wherever possible.'],
          ],
        },
      },
      {
        title: 'Use Cases 7-10: IT, Security, Development, and Reporting',
        table: {
          columns: ['Use Case', 'Core Data', 'Example Output', 'Risk', 'Required Control'],
          rows: [
            ['IT helpdesk ticket classification', 'Ticket text, category history, resolution notes, SLA rules, system mapping', 'Summary, category, priority, possible cause, next step, and escalation team.', 'AI may assign wrong priority or wrong team.', 'IT support team verifies priority and escalation before action.'],
            ['Cybersecurity monitoring and anomaly detection', 'Login logs, network logs, endpoint logs, application logs, user behavior', 'Detect unusual login locations, repeated failed authentication, or unusual access.', 'AI may generate false positives or miss real threats.', 'Security team investigates before taking action.'],
            ['AI for software development, testing, and debugging', 'Requirements, code snippets, error logs, test data, coding standards', 'Generate unit tests for success, failure, edge cases, and invalid inputs.', 'AI-generated code may be insecure or misaligned with internal standards.', 'Developers review, test, and validate AI-generated code before use.'],
            ['Automated report generation from ERP, MES, or IT systems', 'ERP, MES, ITSM, quality, and maintenance data', 'Executive summary, key issues, business impact, recommended actions, priority, and data gaps.', 'Reports may miss context or overstate conclusions.', 'Process owners review reports before circulation.'],
          ],
        },
      },
      {
        title: 'How to Select the Right AI Use Case',
        paragraphs: ['Not every AI idea should be implemented immediately. Before selecting a use case, ask practical fit and risk questions.'],
        table: {
          columns: ['Question', 'Why it matters'],
          rows: [
            ['Is the problem important?', 'AI should solve a real business problem.'],
            ['Is data available?', 'AI needs relevant and reliable data.'],
            ['Can the output be verified?', 'Teams must be able to check AI results.'],
            ['Is the risk manageable?', 'High-risk use cases need stronger controls.'],
            ['Can we start small?', 'A pilot is safer than direct full rollout.'],
            ['Is there a clear success metric?', 'Benefits should be measurable.'],
          ],
        },
      },
      {
        title: 'Simple AI Use Case Prioritization Matrix',
        paragraphs: ['Score each use case from 1 to 5. A good pilot has high business value, available data, low to medium risk, a clear human review process, measurable success, and a small starting scope.'],
        table: {
          columns: ['Criteria', 'Score'],
          rows: [
            ['Business value', '1-5'],
            ['Ease of implementation', '1-5'],
            ['Data availability', '1-5'],
            ['Risk manageability', '1-5'],
            ['Time-saving potential', '1-5'],
            ['Cost-saving potential', '1-5'],
            ['User adoption potential', '1-5'],
          ],
        },
      },
      {
        title: 'Example: Good Pilot Use Case',
        table: {
          columns: ['Field', 'Example'],
          rows: [
            ['Use Case Name', 'AI Assistant for SOP and Machine Manual Search'],
            ['Problem', 'Maintenance and IT teams spend time searching long documents for troubleshooting steps.'],
            ['Current Process', 'Users manually search PDFs or ask senior team members.'],
            ['AI Opportunity', 'AI can answer questions from approved SOPs and manuals.'],
            ['Data Required', 'Approved SOPs, machine manuals, troubleshooting guides, and IT process documents.'],
            ['Expected Benefit', 'Faster document search, better knowledge access, reduced dependency on senior staff, and faster issue resolution.'],
            ['Risk', 'AI may provide incorrect guidance.'],
            ['Control', 'Use only approved documents, show source references, require human validation, and keep documents updated.'],
            ['Pilot', 'Start with 10 approved SOPs and test 30 common user questions.'],
            ['Success Metric', 'Reduce average document search time by 30%.'],
          ],
        },
      },
      {
        title: 'Example: Risky Use Case',
        paragraphs: [
          'Use case name: AI automatically approves production changes.',
          'This use case can directly affect production, safety, quality, and compliance. AI may approve a change without understanding ground-level constraints.',
          'AI can summarize change requests and highlight risks, but final approval should remain with authorized humans.',
        ],
      },
      {
        title: 'Practical Guidance for Corporate IT Teams',
        table: {
          columns: ['Layer', 'Meaning', 'Example'],
          rows: [
            ['Productivity AI', 'Helps individuals work faster.', 'Draft emails, summarize tickets, create reports.'],
            ['Knowledge AI', 'Helps users find and use information.', 'SOP/manual search assistant.'],
            ['Workflow AI', 'Helps automate multi-step processes.', 'Ticket triage, log checking, response drafting, approval routing.'],
          ],
        },
        takeaway:
          'Start with productivity and knowledge use cases first. Move to workflow automation only after governance, access control, and human approval are in place.',
      },
      {
        title: 'Key Risks to Watch',
        table: {
          columns: ['Risk', 'Example', 'Control'],
          rows: [
            ['Wrong output', 'AI suggests wrong root cause.', 'Human validation.'],
            ['Sensitive data exposure', 'User pastes password or customer data.', 'Data masking and approved tools.'],
            ['Outdated document usage', 'AI answers from old SOP.', 'Version control.'],
            ['No source reference', 'AI gives answer without document evidence.', 'Require source citation.'],
            ['Over-automation', 'AI directly acts on production systems.', 'Approval workflow.'],
            ['Poor data quality', 'AI learns from incomplete records.', 'Data cleaning and validation.'],
            ['User overtrust', 'Employee blindly follows AI output.', 'Training and policy.'],
          ],
        },
      },
      {
        title: 'Quick Self-Check',
        bullets: [
          'Which manufacturing AI use case can reduce downtime?',
          'Which AI use case can improve product quality?',
          'Which AI use case can help IT support teams?',
          'What data is required for an SOP/manual search assistant?',
          'Why should AI-generated reports be reviewed by humans?',
        ],
        takeaway:
          'Begin with small pilots, validate results, involve process owners, and add governance before scaling.',
      },
    ],
  },
  {
    ...readingMetas[2],
    sections: [
      {
        title: 'What is Prompt Engineering?',
        paragraphs: [
          'Prompt engineering means writing clear instructions for an AI tool so that it gives useful, structured, and reliable output.',
          'A weak prompt produces a generic answer. A strong prompt tells AI what role to take, what task to perform, what context to consider, what input to use, what output format to follow, and what constraints to respect.',
        ],
      },
      {
        title: 'The Best Prompt Formula',
        takeaway: 'Role + Task + Context + Input + Output Format + Constraints',
      },
      {
        title: 'Prompt Structure',
        table: {
          columns: ['Prompt Part', 'What to Write', 'Example'],
          rows: [
            ['Role', 'Tell AI who it should act as.', 'Act as an IT operations analyst.'],
            ['Task', 'Tell AI exactly what to do.', 'Analyze this incident log.'],
            ['Context', 'Give background information.', 'This issue is from a manufacturing plant MES system.'],
            ['Input', 'Paste the data, ticket, log, email, report, or document.', 'Ticket details, system logs, production data.'],
            ['Output Format', 'Tell AI how to present the answer.', 'Give output in a table with issue, cause, impact, and action.'],
            ['Constraints', 'Tell AI what rules to follow.', 'Do not assume missing facts. Mention uncertainty.'],
          ],
        },
      },
      {
        title: 'Basic Prompt Template',
        prompt: {
          title: 'Reusable Workplace Prompt',
          text: `Act as a [role].
Your task is to [task].

Context:
[Provide background information]

Input:
[Paste data, ticket, report, log, email, SOP, or document here]

Provide the output in this format:
1. [Output section 1]
2. [Output section 2]
3. [Output section 3]
4. [Output section 4]

Constraints:
- Do not assume facts not present in the input.
- Mention missing information clearly.
- Keep the response practical and easy to understand.`,
        },
      },
      {
        title: 'Before and After Prompt Example',
        paragraphs: ['Weak prompt: Summarize this issue.'],
        prompt: {
          title: 'Strong Helpdesk Prompt',
          text: `Act as an IT helpdesk analyst.
Your task is to summarize the following IT support ticket and suggest the next action.

Context:
The ticket is from a manufacturing plant user. The issue may affect production reporting.

Ticket:
[Paste ticket here]

Provide the output in this format:
1. Short summary
2. Issue category
3. Affected system
4. Business impact
5. Priority level
6. Immediate next step
7. Draft response to the user

Constraints:
- Do not assume facts not mentioned in the ticket.
- Mention if more information is required.
- Keep the response professional.`,
        },
      },
      {
        title: 'Prompting Rules to Remember',
        table: {
          columns: ['Rule', 'Why It Helps'],
          rows: [
            ['Be specific', 'Reduces vague and generic answers.'],
            ['Give context', 'Helps AI understand the situation.'],
            ['Mention the role', 'Improves the style and focus of the answer.'],
            ['Provide output format', 'Makes the response easier to use.'],
            ['Add constraints', 'Reduces wrong assumptions.'],
            ['Ask for missing information', 'Prevents AI from guessing.'],
            ['Use examples', 'Helps AI understand the expected output.'],
            ['Review the output', 'AI can still make mistakes.'],
          ],
        },
      },
      {
        title: 'Common Prompting Mistakes',
        table: {
          columns: ['Mistake', 'Weak Example', 'Better Example'],
          rows: [
            ['Too vague', 'Analyze this.', 'Analyze this server log and identify probable root cause.'],
            ['No role', 'Make a report.', 'Act as a production reporting analyst and create a management report.'],
            ['No context', 'What happened?', 'This issue occurred after network maintenance at Plant 2.'],
            ['No output format', 'Give suggestions.', 'Give suggestions in a table with action, owner, and priority.'],
            ['No constraints', 'Find the issue.', 'Do not assume missing facts. Mention what needs to be verified.'],
            ['Too much sensitive data', 'Here is the full log with tokens.', 'Here is a masked log with credentials removed.'],
            ['Blind trust', 'Use AI output directly.', 'Review and validate AI output before using it.'],
          ],
        },
      },
      {
        title: 'Prompt Template for IT Ticket Analysis',
        prompt: {
          title: 'IT Ticket Analysis',
          text: `Act as an IT helpdesk analyst.
Analyze the following support ticket.

Ticket:
[Paste ticket here]

Provide the output in this format:
1. Ticket summary
2. Issue category
3. Affected system
4. Impacted users/location
5. Priority: Critical / High / Medium / Low
6. Probable root cause
7. Immediate troubleshooting steps
8. Escalation team
9. Draft response to employee
10. Information still required

Constraints:
- Do not assume facts not present in the ticket.
- Mention uncertainty clearly.
- Keep the response suitable for an IT support team.`,
        },
      },
      {
        title: 'Prompt Template for Incident Log Analysis',
        prompt: {
          title: 'Incident Log Analysis',
          text: `Act as an IT operations analyst.
Analyze the following incident log.

Context:
This log is from a manufacturing IT environment. The system may be connected to production, reporting, MES, ERP, or internal applications.

Incident log:
[Paste log here]

Provide the output in this format:
1. Issue summary
2. Probable root cause
3. Impacted system
4. Business impact
5. Immediate action
6. Preventive action
7. Information still required

Constraints:
- Do not guess beyond the provided log.
- Mention if the log is incomplete.
- Prioritize actions that can be taken by the IT operations team.`,
        },
      },
      {
        title: 'Prompt Templates for Daily Work',
        table: {
          columns: ['Template', 'Use For', 'Output Format'],
          rows: [
            ['Report generation', 'Convert operational data into a management report.', 'Executive summary, observations, performance analysis, impact, actions, priority, data gaps.'],
            ['SOP creation', 'Create a simple SOP from a process description.', 'Purpose, scope, prerequisites, steps, escalation, checklist, common mistakes.'],
            ['Email drafting', 'Draft professional internal communication.', 'Subject and email body.'],
            ['Code explanation', 'Explain code in simple language.', 'What it does, logic, inputs/outputs, issues, improvements, tests.'],
            ['Test case generation', 'Generate tests from a requirement.', 'Test case ID, scenario, input, steps, expected result, priority.'],
            ['Manufacturing use case ideation', 'Suggest practical AI use cases for a problem area.', 'Use case, problem, AI help, data, benefit, risk, review, pilot, success metric.'],
          ],
        },
      },
      {
        title: 'Prompt Template for Report Generation',
        prompt: {
          title: 'Manufacturing Management Report',
          text: `Act as a manufacturing operations analyst.
Convert the following operational data into a management report.

Context:
The report is for manufacturing leadership. It should highlight production performance, downtime, defects, business impact, and recommended actions.

Data:
[Paste data here]

Provide the output in this format:
1. Executive summary
2. Key observations
3. Production performance analysis
4. Downtime analysis
5. Quality/defect analysis
6. Business impact
7. Recommended actions
8. Priority level
9. Data gaps

Constraints:
- Do not assume facts not present in the data.
- Keep the report concise and business-friendly.
- Use a table wherever useful.`,
        },
      },
      {
        title: 'Prompt Template for SOP Creation',
        prompt: {
          title: 'Simple SOP Builder',
          text: `Act as an IT process documentation specialist.
Create a simple SOP for the process described below.

Process details:
[Paste process details here]

Provide the SOP in this format:
1. Purpose
2. Scope
3. Prerequisites
4. Step-by-step procedure
5. Escalation points
6. Checklist
7. Common mistakes to avoid

Constraints:
- Use simple language.
- Keep the SOP practical.
- Mention where human approval is required.`,
        },
      },
      {
        title: 'Prompt Template for Email Drafting',
        prompt: {
          title: 'Professional Internal Email',
          text: `Act as a professional corporate communication assistant.
Draft an email based on the situation below.

Situation:
[Describe situation here]

Provide the output in this format:
Subject:
Email Body:

Constraints:
- Keep the email polite and professional.
- Keep it concise.
- Do not add commitments that are not mentioned.
- Avoid overly casual language.`,
        },
      },
      {
        title: 'Prompt Template for Code Explanation',
        prompt: {
          title: 'Code Explanation',
          text: `Act as a software development mentor.
Explain the following code in simple language.

Code:
[Paste code here]

Provide the output in this format:
1. What the code does
2. Important functions or logic
3. Input and output
4. Possible issues
5. Suggested improvements
6. Test cases to consider

Constraints:
- Keep the explanation beginner-friendly.
- Do not change the code unless asked.
- Mention assumptions clearly.`,
        },
      },
      {
        title: 'Prompt Template for Test Case Generation',
        prompt: {
          title: 'Test Case Generation',
          text: `Act as a software tester.
Generate test cases for the following requirement.

Requirement:
[Paste requirement here]

Provide the output as a table with:
1. Test case ID
2. Test scenario
3. Input data
4. Steps
5. Expected result
6. Priority

Constraints:
- Include positive, negative, and edge cases.
- Do not assume missing business rules.
- Mention questions if the requirement is unclear.`,
        },
      },
      {
        title: 'Prompt Template for Manufacturing Use Case Ideation',
        prompt: {
          title: 'Manufacturing AI Use Case Ideation',
          text: `Act as a manufacturing AI consultant.
Suggest practical AI use cases for the following problem area.

Problem area:
[Enter problem area]

Provide the output in this format:
1. Use case name
2. Current problem
3. How AI can help
4. Data required
5. Expected benefit
6. Risk
7. Human review required
8. Small pilot idea
9. Success metric

Constraints:
- Keep the use case practical.
- Focus on manufacturing and IT operations.
- Avoid unrealistic AI ideas.`,
        },
      },
      {
        title: 'Useful Output Formats',
        table: {
          columns: ['Requirement', 'Best Output Format'],
          rows: [
            ['Quick understanding', 'Bullet points'],
            ['Comparison', 'Table'],
            ['Management communication', 'Executive summary'],
            ['IT process', 'Checklist'],
            ['SOP', 'Step-by-step format'],
            ['Ticket handling', 'Structured fields'],
            ['Technical review', 'Issue, cause, impact, action'],
            ['Development task', 'Test cases table'],
            ['Automation task', 'JSON'],
            ['Presentation preparation', 'Slide-wise outline'],
          ],
        },
      },
      {
        title: 'Helpful Prompt Phrases',
        table: {
          columns: ['Need', 'Phrase to Use'],
          rows: [
            ['Avoid guessing', 'Do not assume facts not present in the input.'],
            ['Handle missing data', 'Mention what information is missing.'],
            ['Get structured output', 'Provide the output in a table.'],
            ['Get business-friendly language', 'Keep the response suitable for management.'],
            ['Get technical depth', 'Explain the technical reason behind each point.'],
            ['Get safer output', 'Mention risks and human review required.'],
            ['Get action-oriented output', 'Provide immediate action and preventive action.'],
            ['Get shorter response', 'Limit the response to 5 bullet points.'],
            ['Get better emails', 'Use a polite and professional tone.'],
            ['Get better reports', 'Include summary, impact, recommendation, and priority.'],
          ],
        },
      },
      {
        title: 'Prompt Quality Checklist',
        table: {
          columns: ['Checklist Item', 'Tick'],
          rows: [
            ['Have I clearly defined the role?', ''],
            ['Have I clearly described the task?', ''],
            ['Have I given enough context?', ''],
            ['Have I pasted the correct input?', ''],
            ['Have I asked for a specific output format?', ''],
            ['Have I added constraints?', ''],
            ['Have I removed sensitive data?', ''],
            ['Have I asked AI not to assume missing facts?', ''],
            ['Have I mentioned the target audience?', ''],
            ['Will I review the output before using it?', ''],
          ],
        },
      },
      {
        title: 'Safe Prompting Checklist',
        paragraphs: ['Before using AI at work, do not include sensitive information. If the answer is yes for any sensitive item, mask or remove it before using AI.'],
        table: {
          columns: ['Sensitive Information', 'Included?'],
          rows: [
            ['Passwords', 'Yes / No'],
            ['API keys or access tokens', 'Yes / No'],
            ['Customer personal data', 'Yes / No'],
            ['Employee personal data', 'Yes / No'],
            ['Confidential contracts', 'Yes / No'],
            ['Internal source code without approval', 'Yes / No'],
            ['Production credentials', 'Yes / No'],
            ['Security vulnerabilities without approval', 'Yes / No'],
            ['Unmasked system logs', 'Yes / No'],
            ['Financial or legal confidential data', 'Yes / No'],
          ],
        },
      },
      {
        title: 'Example: Safe vs Unsafe Prompt',
        paragraphs: ['Unsafe prompt: Here is my database username, password, server IP, and full production log. Find the issue.'],
        prompt: {
          title: 'Safer Masked Prompt',
          text: `Act as an IT operations analyst.
Analyze the following masked error log and suggest possible causes.

Context:
The issue is related to database connection failure in an internal application.

Masked log:
[Paste log with username, password, token, IP, and personal data removed]

Provide:
1. Possible cause
2. What to verify
3. Immediate action
4. Preventive action

Constraints:
- Do not assume missing facts.
- Mention what additional logs are required.`,
        },
      },
      {
        title: 'Quick Practice',
        bullets: [
          'Improve this weak prompt: Make this better.',
          'Improve this weak prompt: Check this ticket.',
          'Improve this weak prompt: Write report.',
        ],
        takeaway:
          'A good workplace prompt should be clear, specific, structured, and safe. Always include business context, system or process context, expected output format, human review requirement, and data security constraints.',
      },
    ],
  },
]

export const postSession = {
  purpose: [
    'This sheet is for participants to use after the workshop.',
    'The purpose is to help you continue learning and convert workshop ideas into practical workplace action.',
  ],
  outcomes: [
    'A clear reading list',
    'A 30-day AI learning plan',
    'A personal AI use case idea',
    'A team-level AI pilot idea',
    'A responsible AI checklist for future use',
  ],
  coveredAreas: [
    ['AI basics', 'Difference between automation, analytics, AI, Generative AI, and Agentic AI'],
    ['Corporate AI trends', 'AI copilots, enterprise search, AI agents, ITSM AI, software development AI, and governance'],
    ['Manufacturing use cases', 'Predictive maintenance, quality inspection, production reporting, inventory, SOP assistants, and cybersecurity'],
    ['Prompt engineering', 'How to write clear prompts using role, task, context, input, output format, and constraints'],
    ['Hands-on exercises', 'IT ticket analysis, use case ideation, and AI-assisted report generation'],
    ['Responsible AI', 'Data security, hallucination risk, human review, and governance'],
    ['Group activity', 'Identifying AI use cases for your department or function'],
  ],
  recommendedReading: [
    ['Prompt Engineering', 'OpenAI prompt engineering and prompt best practices', 'Helps you write clearer prompts, give better context, and improve AI output quality.'],
    ['AI Risk Management', 'NIST AI Risk Management Framework', 'Helps understand AI governance, risk mapping, measurement, and management.'],
    ['LLM Security', 'OWASP Top 10 for LLM Applications', 'Helps understand prompt injection, sensitive information disclosure, insecure plugins, and unsafe AI integrations.'],
    ['Prompt Injection', 'OWASP Prompt Injection Risk', 'Helps understand how malicious or unexpected inputs can manipulate AI behavior and bypass intended instructions.'],
    ['AI in Manufacturing', 'World Economic Forum manufacturing AI material', 'Helps connect AI with machine health monitoring, forecasting, quality inspection, and process optimization.'],
    ['Agentic AI', 'Google Cloud and IBM explanations on Agentic AI', 'Helps understand how AI agents can plan, act, and perform multi-step tasks with supervision.'],
  ],
  weeks: [
    {
      title: 'Week 1: Understand AI Basics and Prompting',
      tasks: [
        'Revise the difference between automation, analytics, AI, Generative AI, and Agentic AI.',
        'Practice writing 5 prompts using role, task, context, input, output format, and constraints.',
        'Try using AI to summarize one non-confidential document.',
        'Try using AI to draft one internal email.',
        'Try using AI to create a checklist for one routine task.',
      ],
    },
    {
      title: 'Week 2: Apply AI to IT and Manufacturing Scenarios',
      tasks: [
        'Identify 3 repetitive tasks in your current work.',
        'Identify 2 reports that can be drafted faster using AI.',
        'Identify 1 IT ticket or incident scenario where AI can help.',
        'Identify 1 manufacturing or operations use case where AI can support decision-making.',
        'Discuss one AI idea with your team.',
      ],
    },
    {
      title: 'Week 3: Focus on Data Security and Governance',
      tasks: [
        'List what type of data your team should never enter into public AI tools.',
        'Practice masking a sample log, ticket, or report before using AI.',
        'Identify which AI use cases require human approval.',
        'Review risks such as hallucination, sensitive information disclosure, and overreliance.',
        'Create a small safe AI usage checklist for your team.',
      ],
    },
    {
      title: 'Week 4: Build a Small AI Pilot Idea',
      tasks: [
        'Select one AI use case that can be piloted in 30-60 days.',
        'Define the problem statement.',
        'Identify required data.',
        'Define success metrics.',
        'Identify risk and controls.',
        'Present the idea to your manager or team lead.',
      ],
    },
  ],
  personalTaskFields: ['Task', 'How AI Can Help'],
  teamFields: [
    'Department / Function',
    'Use Case Name',
    'Problem Area',
    'Current Process',
    'How AI Can Help',
    'Data Required',
    'Expected Benefit',
    'Main Risk',
    'Control Required',
    'Human Review Needed?',
    'Pilot Timeline',
    'Success Metric',
  ],
  checklist: [
    'Is the problem clearly defined?',
    'Does the use case solve a real business or operational problem?',
    'Is the required data available?',
    'Is the data reliable and updated?',
    'Can the AI output be verified by a human?',
    'Is the risk manageable?',
    'Is there a clear owner for the process?',
    'Can we start with a small pilot?',
    'Can success be measured?',
    'Is there a governance or approval process?',
  ],
  safeRules: [
    ['Do not share secrets', 'Never paste passwords, API keys, tokens, or credentials.'],
    ['Mask sensitive data', 'Remove customer, employee, and confidential details before using AI.'],
    ['Verify output', 'AI output may be wrong, incomplete, or misleading.'],
    ['Use approved tools', 'Prefer organization-approved AI systems for internal data.'],
    ['Keep humans in control', 'Human review is needed for production, safety, finance, HR, legal, compliance, and security decisions.'],
    ['Avoid blind automation', 'Do not allow AI to directly change production systems without approval.'],
    ['Maintain accountability', 'The user/team remains responsible for the final decision.'],
  ],
  reflections: [
    'What was the most useful concept from the workshop?',
    'Which AI use case is most relevant to your current work?',
    'Which task can you start improving with AI immediately?',
    'What type of data should your team avoid entering into public AI tools?',
    'What approval or governance is needed before using AI in your department?',
  ],
  finalTakeaway:
    'Start small. Use safe data. Validate output. Keep humans in control. Scale only after value and risk controls are proven.',
}
