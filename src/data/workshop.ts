export type SheetMeta = {
  id: number
  title: string
  shortTitle: string
  activityType: string
  suggestedTime: string
  moduleLink: string
  summary: string
  targetFields: number
}

export type ReferenceRow = Record<string, string>

export const storageKey = 'ai-workshop-v1'

export const sheetMetas: SheetMeta[] = [
  {
    id: 1,
    title: 'AI vs Automation vs Analytics Classifier',
    shortTitle: 'Classifier',
    activityType: 'Individual / Pair Activity',
    suggestedTime: '10-12 minutes',
    moduleLink: 'Introduction to AI for Corporate IT',
    summary:
      'Classify workplace scenarios as automation, analytics, AI, or generative AI, then explain the reasoning.',
    targetFields: 28,
  },
  {
    id: 2,
    title: 'Corporate AI Trends Mapping',
    shortTitle: 'AI Trends',
    activityType: 'Group Discussion / Pair Activity',
    suggestedTime: '15-20 minutes',
    moduleLink: 'Latest AI Trends Adopted by Corporates',
    summary:
      'Map major corporate AI trends to practical IT and manufacturing use cases, required data, risks, and priorities.',
    targetFields: 54,
  },
  {
    id: 3,
    title: 'Manufacturing AI Use Case Cards',
    shortTitle: 'Use Cases',
    activityType: 'Group Activity',
    suggestedTime: '20-25 minutes',
    moduleLink: 'AI Use Cases in Manufacturing and IT Operations',
    summary:
      'Turn AI ideas into clear use case cards with benefits, controls, pilot feasibility, and scoring.',
    targetFields: 90,
  },
  {
    id: 4,
    title: 'Prompt Engineering Builder',
    shortTitle: 'Prompts',
    activityType: 'Individual Practice + Pair Review',
    suggestedTime: '25-30 minutes',
    moduleLink: 'Prompt Engineering for Workplace Productivity',
    summary:
      'Build stronger workplace prompts using role, task, context, input, output format, and constraints.',
    targetFields: 38,
  },
  {
    id: 5,
    title: 'IT Helpdesk Ticket Analysis',
    shortTitle: 'Helpdesk',
    activityType: 'Hands-on Practice',
    suggestedTime: '20-25 minutes',
    moduleLink: 'Hands-on Workshop: Practical AI Exercises',
    summary:
      'Analyze a production-impacting IT ticket, assess priority, review AI output, and prepare support actions.',
    targetFields: 52,
  },
  {
    id: 6,
    title: 'AI-Assisted Report Generation',
    shortTitle: 'Reports',
    activityType: 'Hands-on Practice',
    suggestedTime: '20-25 minutes',
    moduleLink: 'Hands-on Workshop: Practical AI Exercises',
    summary:
      'Convert production and downtime data into a management report with observations, actions, and data gaps.',
    targetFields: 65,
  },
  {
    id: 7,
    title: 'Responsible AI and Data Security Checklist',
    shortTitle: 'Responsible AI',
    activityType: 'Discussion + Checklist Activity',
    suggestedTime: '15-20 minutes',
    moduleLink: 'Responsible AI, Data Security, and Governance',
    summary:
      'Classify AI usage risk, practice data masking, define review requirements, and commit to safe AI usage.',
    targetFields: 68,
  },
  {
    id: 8,
    title: 'Final Group Use Case Canvas',
    shortTitle: 'Final Canvas',
    activityType: 'Group Activity',
    suggestedTime: '20 minutes',
    moduleLink: 'Group Activity: Identify AI Use Cases',
    summary:
      'Prepare final AI use case canvases, compare priorities, and shape the presentation-ready pilot proposal.',
    targetFields: 120,
  },
]

export const workshopPrinciples = [
  'AI should be selected based on business value, available data, risk level, and ease of implementation.',
  'AI-generated output should be reviewed by a human before business, production, safety, security, HR, legal, or financial decisions.',
  'The strongest workshop outputs are clear, measurable, safe use cases that can start with a small pilot.',
]

export const sheet1 = {
  objective:
    'Understand the difference between Automation, Analytics, AI, and Generative AI in practical workplace scenarios.',
  intro:
    'Corporate IT teams often work with dashboards, scripts, workflows, alerts, reports, chatbots, and AI tools. This activity helps identify which type of technology is being used in each situation.',
  quickReference: [
    {
      term: 'Automation',
      meaning: 'A predefined rule or workflow performs a task automatically.',
      example: 'Sending an email alert when server CPU crosses 90%.',
    },
    {
      term: 'Analytics',
      meaning: 'Data is analyzed to understand trends, performance, or patterns.',
      example: 'Dashboard showing monthly machine downtime.',
    },
    {
      term: 'AI',
      meaning:
        'A system makes predictions, classifications, recommendations, or detects patterns from data.',
      example: 'Predicting machine failure based on sensor data.',
    },
    {
      term: 'Generative AI',
      meaning: 'AI creates new text, images, reports, summaries, code, or responses.',
      example: 'AI drafting an incident report from logs.',
    },
  ],
  scenarios: [
    'An email alert is sent automatically when server CPU usage goes above 90%.',
    'A dashboard shows monthly machine downtime by plant, department, and production line.',
    'A model predicts which machine is likely to fail in the next 7 days based on sensor data.',
    'A chatbot summarizes a long SOP document and answers employee questions from it.',
    'A scheduled script takes database backup every night at 11:00 PM.',
    'An AI tool drafts a root cause analysis report from incident logs.',
    'A computer vision system detects product defects from camera images on the production line.',
    'An Excel formula calculates monthly production variance between target and actual output.',
    'A helpdesk system automatically assigns all password reset tickets to the IT support team.',
    'An AI assistant reads multiple IT tickets and groups them into network, application, access, and hardware issues.',
    'A tool generates a weekly production summary in simple business language from raw operational data.',
    'A system recommends spare parts to keep in stock based on past failure patterns and maintenance history.',
  ],
  categories: ['Automation', 'Analytics', 'AI', 'Generative AI'],
  reflections: [
    'Which scenarios were easiest to classify?',
    'Which scenarios were confusing? Why?',
    'In your current work, where do you mostly see automation?',
    'In your current work, where do you think AI or Generative AI can help?',
  ],
  takeaway:
    'Not every digital solution is AI. Automation helps repetitive rule-based tasks, analytics helps monitoring and reporting, AI helps prediction/classification/pattern detection, and generative AI helps summaries, reports, emails, documentation, and knowledge assistance.',
}

export const sheet2 = {
  objective:
    'Connect current corporate AI trends with practical workplace use cases in IT and manufacturing.',
  intro:
    'AI is now used for documentation, reporting, enterprise search, helpdesk operations, workflow automation, software development, testing, cybersecurity, and decision support.',
  trends: [
    {
      trend: 'Generative AI for Productivity',
      meaning: 'AI helps create, summarize, rewrite, explain, or structure content.',
      example: 'Summarizing meeting notes, drafting emails, creating reports.',
    },
    {
      trend: 'AI Copilots',
      meaning:
        'AI assists employees inside tools used for coding, documents, analysis, or communication.',
      example: 'AI helping developers write code or analysts prepare reports.',
    },
    {
      trend: 'Enterprise Search / Knowledge Assistant',
      meaning: 'AI helps employees search internal documents, SOPs, manuals, policies, and FAQs.',
      example: 'Asking questions from machine manuals or IT policy documents.',
    },
    {
      trend: 'Agentic AI / AI Agents',
      meaning: 'AI performs multi-step tasks using tools, workflows, or systems with human supervision.',
      example: 'Creating a ticket, checking logs, suggesting resolution, and updating status.',
    },
    {
      trend: 'AI in IT Service Management',
      meaning: 'AI supports helpdesk ticket classification, response drafting, and issue routing.',
      example: 'Automatically classifying tickets into network, access, hardware, or software issues.',
    },
    {
      trend: 'AI for Software Development and Testing',
      meaning: 'AI supports coding, debugging, test case generation, documentation, and code explanation.',
      example: 'Generating unit tests or explaining a code block.',
    },
    {
      trend: 'AI for Cybersecurity and Monitoring',
      meaning: 'AI detects unusual patterns, risks, anomalies, or suspicious activity.',
      example: 'Detecting abnormal login attempts or unusual network behavior.',
    },
    {
      trend: 'AI Governance and Human Review',
      meaning: 'Rules, controls, and review processes for safe AI usage.',
      example: 'Human approval before AI-generated output is used in production.',
    },
  ],
  columns: [
    'Where can it help in our organization?',
    'Example task',
    'Data / system required',
    'Risk or control needed',
    'Priority',
  ],
  example: {
    trend: 'Enterprise Search / Knowledge Assistant',
    help: 'Maintenance and IT support teams',
    task: 'Search machine manuals and SOPs using natural language',
    data: 'SOPs, machine manuals, IT policy documents',
    control: 'Access control, document version control, human validation',
    priority: 'High',
  },
  questions: [
    'Which AI trend is most immediately useful for your team?',
    'Which AI trend can save the most time in daily work?',
    'Which AI trend has the highest risk if implemented without governance?',
    'Which AI idea can be piloted within 30 days?',
  ],
  takeaway:
    'Corporate AI adoption is not only about chatbots. The real value comes when AI supports real business and IT workflows such as documentation, reporting, helpdesk support, SOP search, testing, cybersecurity monitoring, workflow automation, and human-reviewed decision support.',
}

export const manufacturingUseCases = [
  ['Predictive Maintenance', 'Predict machine failures before breakdown happens.'],
  ['Machine Downtime Analysis', 'Analyze downtime reasons and identify repeated issues.'],
  ['Quality Inspection', 'Detect defects using images, sensor data, or inspection records.'],
  ['Production Report Generation', 'Convert production data into daily or weekly reports.'],
  ['Inventory Optimization', 'Predict spare parts or raw material requirements.'],
  ['Supply Chain Delay Analysis', 'Identify delay patterns in vendors, logistics, or procurement.'],
  ['SOP / Manual Search Assistant', 'Help employees ask questions from SOPs, manuals, and policies.'],
  ['IT Helpdesk Ticket Classification', 'Classify and prioritize IT support tickets automatically.'],
  ['Cybersecurity Anomaly Detection', 'Detect unusual login, network, or system activity.'],
  ['Safety Incident Analysis', 'Analyze safety reports and identify repeated risk areas.'],
]

export const benefits = [
  'Time saving',
  'Faster response',
  'Lower downtime',
  'Better accuracy',
  'Better reporting',
  'Cost reduction',
  'Improved safety',
  'Better decision-making',
]

export const extendedBenefits = [
  ...benefits.slice(0, 5),
  'Better knowledge access',
  ...benefits.slice(5),
  'Improved compliance',
]

export const controls = [
  'Human review before action',
  'Data masking / anonymization',
  'Access control',
  'Approval workflow',
  'Audit log',
  'Testing before production use',
  'Output validation',
]

export const extendedControls = [
  ...controls,
  'Use only approved documents/data',
  'Show source/reference in AI output',
  'Limit AI access to sensitive systems',
]

export const pilotQuestions = [
  'Can this be piloted in 30-60 days?',
  'Is the required data available?',
  'Is the business benefit clear?',
  'Is the risk manageable?',
  'Overall pilot priority',
]

export const scoreCriteria = [
  'Business value',
  'Ease of implementation',
  'Data availability',
  'Risk manageability',
  'Time-saving potential',
  'Cost-saving potential',
]

export const sheet3 = {
  objective:
    'Identify practical AI use cases for a manufacturing organization and convert them into clear business use cases.',
  cardFields: [
    'Problem Area',
    'Current Process',
    'AI Opportunity',
    'Data Required',
    'Risk',
    'Control Required',
  ],
  exampleRows: [
    ['Use Case Name', 'SOP and Machine Manual Search Assistant'],
    ['Problem Area', 'Maintenance teams spend time searching long manuals and SOP documents.'],
    ['Current Process', 'Employees manually search PDFs, ask seniors, or call support teams.'],
    ['AI Opportunity', 'AI assistant can answer questions from approved manuals and SOPs.'],
    ['Data Required', 'Machine manuals, SOPs, maintenance history, safety instructions.'],
    [
      'Expected Benefit',
      'Faster response, better knowledge access, reduced dependency on senior staff.',
    ],
    ['Risk', 'AI may give incorrect maintenance guidance.'],
    [
      'Control Required',
      'Use only approved documents, show source reference, require human validation before action.',
    ],
    ['Pilot Feasibility', 'High'],
  ],
  finalQuestions: [
    'Selected Use Case',
    'Why did your group select this use case?',
    'What should be the first small pilot?',
    'What result will prove that the pilot is successful?',
  ],
  takeaway:
    'A good AI use case has a clear business problem, available data, measurable benefit, manageable risk, human review where needed, and a small pilot that can be tested before full rollout.',
}

export const sheet4 = {
  objective:
    'Write better prompts for workplace tasks such as summarizing documents, drafting emails, creating reports, explaining code, analyzing logs, preparing SOPs, generating test cases, and reviewing incident tickets.',
  promptStructure: [
    ['Role', 'Who should the AI act as?', 'Act as an IT operations analyst.'],
    ['Task', 'What should the AI do?', 'Analyze the incident log and identify the issue.'],
    [
      'Context',
      'What background information should it know?',
      'This issue is from a manufacturing plant MES system.',
    ],
    ['Input', 'What data should it work on?', 'Paste ticket, log, report, SOP, or email content.'],
    [
      'Output Format',
      'How should the answer be structured?',
      'Give output in a table with summary, cause, impact, and action.',
    ],
    [
      'Constraints',
      'What should the AI avoid or follow?',
      'Do not assume missing facts. Mention if information is incomplete.',
    ],
  ],
  basicTemplate: `Act as a [role].
Your task is to [task].

Context:
[Provide background information]

Input:
[Paste the data, ticket, log, report, email, or document here]

Provide the output in this format:
1. [Output point 1]
2. [Output point 2]
3. [Output point 3]
4. [Output point 4]

Constraints:
- Do not assume facts not present in the input.
- Mention if any important information is missing.
- Keep the response clear and practical.`,
  examples: [
    {
      title: 'IT Helpdesk Ticket Prompt',
      weak: 'Summarize this ticket.',
      strong: `Act as an IT helpdesk analyst.
Your task is to summarize the following support ticket and suggest the next action.
Context:
The ticket is from a manufacturing plant user. The issue may affect production reporting.
Input:
[Paste ticket here]
Provide the output in this format:
1. Short summary
2. Issue category
3. Priority level
4. Probable cause
5. Next action
6. Draft reply to user
Constraints:
- Do not assume technical details not mentioned in the ticket.
- If information is missing, mention what needs to be checked.
- Keep the response suitable for an IT support team.`,
    },
    {
      title: 'Incident Log Analysis Prompt',
      strong: `Act as an IT operations analyst.
Your task is to analyze the following incident log and identify the issue.
Context:
The log is from a manufacturing IT environment. The system may be connected to production reporting, MES, ERP, or internal applications.
Input:
[Paste incident log here]
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
- Mention uncertainty clearly.
- Prioritize actions that can be taken by the IT operations team.`,
    },
    {
      title: 'Email Drafting Prompt',
      strong: `Act as a professional corporate communication assistant.
Your task is to draft an email response based on the situation below.
Context:
The email is for internal business communication. The tone should be polite, clear, and professional.
Situation:
[Describe the situation]
Provide the email in this format:
Subject:
Email Body:
Constraints:
- Keep the email concise.
- Avoid overly casual language.
- Do not add commitments that are not mentioned in the situation.`,
    },
    {
      title: 'SOP Creation Prompt',
      strong: `Act as an IT process documentation specialist.
Your task is to create a simple SOP for the process described below.
Context:
The SOP will be used by IT support team members in a manufacturing organization.
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
- Keep the SOP easy to follow.
- Use simple language.
- Mention where human approval is required.`,
    },
    {
      title: 'Report Generation Prompt',
      strong: `Act as a production reporting analyst.
Your task is to convert the following operational data into a management report.
Context:
The report is for manufacturing leadership and should highlight issues, impact, and recommendations.
Input data:
[Paste production, downtime, quality, or maintenance data here]
Provide the report in this format:
1. Executive summary
2. Key observations
3. Major issues
4. Business impact
5. Recommended actions
6. Priority level
7. Data gaps
Constraints:
- Keep the report business-friendly.
- Do not exaggerate the impact.
- Clearly mention if the data is insufficient.`,
    },
  ],
  weakPrompts: [
    'Check this log and tell what happened.',
    'Make a report from this data.',
    'Reply to this employee.',
  ],
  taskTypes: [
    'Summarize technical document',
    'Analyze IT ticket',
    'Draft email',
    'Generate report',
    'Create SOP',
    'Explain code',
    'Generate test cases',
    'Analyze system logs',
    'Prepare checklist',
    'Other',
  ],
  outputFormats: [
    'Bullet points',
    'Table',
    'Email format',
    'Step-by-step procedure',
    'Summary report',
    'Checklist',
    'JSON format',
    'Priority-wise action list',
  ],
  constraints: [
    'Do not assume missing facts',
    'Mention uncertainty clearly',
    'Keep it concise',
    'Use simple language',
    'Provide business impact',
    'Provide technical root cause',
    'Suggest immediate and preventive actions',
    'Do not include confidential data',
    'Ask for missing information if required',
    'Human review required before use',
  ],
  reviewQuestions: [
    'Is the role clearly defined?',
    'Is the task specific?',
    'Is enough context provided?',
    'Is the input clearly mentioned?',
    'Is the output format clear?',
    'Are constraints mentioned?',
    'Is the prompt safe for corporate use?',
    'Can the output be used directly at work?',
  ],
  mistakes: [
    ['Being too vague', 'Summarize this.', 'Summarize this incident report for an IT manager in 5 bullet points.'],
    ['No role given', 'Analyze this data.', 'Act as a production reporting analyst and analyze this data.'],
    ['No output format', 'Give insights.', 'Provide output as a table with issue, impact, and recommendation.'],
    ['No context', 'Fix this problem.', 'This issue is from a plant MES dashboard used for production reporting.'],
    ['No constraints', 'Find root cause.', 'Do not assume missing facts; mention what needs to be verified.'],
    [
      'Sharing sensitive data',
      'Paste actual credentials or personal data.',
      'Remove passwords, tokens, customer details, and confidential values before using AI.',
    ],
  ],
  checklist: [
    'I have clearly mentioned the role.',
    'I have clearly described the task.',
    'I have provided enough context.',
    'I have included the required input.',
    'I have specified the output format.',
    'I have added constraints.',
    'I have avoided confidential or sensitive data.',
    'I will review the AI output before using it.',
  ],
  takeaway:
    'A good workplace prompt follows Role + Task + Context + Input + Output Format + Constraints. Better instructions reduce confusion and improve AI output.',
}

export const sheet5 = {
  objective:
    'Use AI to analyze an IT helpdesk ticket in a structured way while keeping human judgment in the loop.',
  scenario:
    'You are part of the Corporate IT support team for a manufacturing organization. A user from the production department has raised an IT ticket that may affect production reporting and daily operations.',
  sampleTicket: `Ticket ID: IT-4582
User Department: Production
User Role: Production Supervisor
Location: Plant 2

Issue Reported:
The user is unable to access the MES reporting dashboard since morning.

Details:
The dashboard keeps loading for a long time and sometimes shows a timeout error.
The user says the same dashboard was working yesterday.
Production shift reporting is delayed because of this issue.

Time Reported:
10:15 AM

System:
MES Reporting Dashboard

Recent Change:
Network maintenance was performed last night.

Additional Information:
Two other users from the same plant have also reported slow access to the dashboard.
No issue has been reported from Plant 1.`,
  manualFields: [
    'Short ticket summary',
    'Issue category',
    'Affected system',
    'Affected location',
    'Business impact',
    'Possible root cause',
    'Priority',
    'Immediate action required',
    'Team to escalate to',
  ],
  priorityRows: [
    ['Critical', 'Major business process stopped, multiple teams/plants affected, no workaround available.'],
    ['High', 'Important business process affected, limited users or one location affected, urgent resolution needed.'],
    ['Medium', 'Work is affected but workaround is available or impact is limited.'],
    ['Low', 'Minor issue, single user affected, no major business impact.'],
  ],
  priorityQuestions: [
    'Is production work affected?',
    'Are multiple users affected?',
    'Is one plant or multiple plants affected?',
    'Is there a workaround available?',
    'Is the issue urgent?',
    'Final priority',
  ],
  aiPrompt: `Act as an IT helpdesk analyst for a manufacturing organization.
Your task is to analyze the following IT support ticket and provide a structured response.

Ticket:
[Paste the ticket here]

Provide the output in this format:
1. Ticket summary
2. Issue category
3. Affected system
4. Affected users/location
5. Business impact
6. Probable root cause
7. Priority level: Critical / High / Medium / Low
8. Immediate troubleshooting steps
9. Escalation team
10. Draft response to the employee
11. Information still required

Constraints:
- Do not assume facts not present in the ticket.
- Mention uncertainty wherever required.
- Keep the response practical for an IT support team.
- Do not close the ticket without verification.`,
  reviewQuestions: [
    'Did AI correctly summarize the issue?',
    'Did AI identify the correct system?',
    'Did AI mention the affected location?',
    'Did AI correctly identify business impact?',
    'Did AI avoid unsupported assumptions?',
    'Did AI assign a reasonable priority?',
    'Did AI suggest practical troubleshooting steps?',
    'Did AI suggest the correct escalation team?',
    'Is the employee response professional?',
    'Is human verification still included?',
  ],
  troubleshootingSteps: [
    'Check whether MES dashboard is reachable from Plant 2 network.',
    'Check if users from Plant 1 can access the dashboard normally.',
    'Verify whether last night’s network maintenance affected Plant 2 routing/firewall/VPN.',
    'Check application server logs for timeout or connection errors.',
    'Check database/API response time for the MES dashboard.',
    'Inform production users about investigation status.',
    'Escalate to network/application team if issue is not resolved.',
  ],
  responseDraft: `Subject: Update on MES Dashboard Access Issue

Dear [Employee Name],

Thank you for reporting the issue.

We understand that you are facing difficulty accessing the MES reporting dashboard from Plant 2, and that this is affecting production shift reporting.

Our IT team is currently checking the issue, including possible impact from last night’s network maintenance. We are also verifying whether the issue is limited to Plant 2 or affecting other locations.

We will keep you updated on the progress and share the next update shortly.

Regards,
IT Support Team`,
  finalFields: [
    'Ticket ID',
    'Final summary',
    'Category',
    'Sub-category',
    'Impact',
    'Urgency',
    'Final priority',
    'Probable root cause',
    'Immediate action',
    'Escalation team',
    'Communication required',
    'Ticket status',
  ],
  preventiveActions: [
    'Add post-maintenance validation checklist for MES dashboard access.',
    'Monitor dashboard response time plant-wise.',
    'Notify production users before planned network maintenance.',
    'Create escalation matrix for production-critical systems.',
    'Maintain known-error documentation for repeated dashboard timeout issues.',
  ],
  reflections: [
    'What part of the ticket analysis was AI most useful for?',
    'What part still required human judgment?',
    'Did AI assign the correct priority? Why or why not?',
    'What information was missing from the original ticket?',
  ],
  suggestedAnswer: [
    ['Summary', 'MES reporting dashboard is timing out for Plant 2 users, affecting production shift reporting.'],
    ['Category', 'Application / Network'],
    ['Affected system', 'MES Reporting Dashboard'],
    ['Affected location', 'Plant 2'],
    ['Business impact', 'Production shift reporting delayed.'],
    [
      'Probable root cause',
      'Possible Plant 2 network issue after network maintenance, or MES connectivity issue.',
    ],
    ['Priority', 'High'],
    [
      'Immediate action',
      'Check Plant 2 network connectivity, MES server logs, and impact from last night’s maintenance.',
    ],
    ['Escalation team', 'Network team and MES application support team.'],
    [
      'Preventive action',
      'Post-maintenance validation checklist and monitoring for critical production systems.',
    ],
  ],
  takeaway:
    'AI can summarize tickets, classify issues, draft responses, suggest troubleshooting steps, and identify missing information. Human review is still required for priority confirmation, root cause validation, production impact assessment, escalation decisions, and final closure.',
}

export const sheet6 = {
  objective:
    'Use AI to convert raw operational data into a clear business report for manufacturing leadership.',
  scenario:
    'You are part of the IT or operations team in a manufacturing organization. Your manager wants a short report explaining production performance, areas needing attention, and recommended actions.',
  operationalData: [
    ['Line A', '45 minutes', '12', '920 units', '1000 units', 'Sensor calibration issue reported'],
    ['Line B', '10 minutes', '3', '1100 units', '1050 units', 'Normal operation'],
    ['Line C', '75 minutes', '21', '780 units', '1000 units', 'Repeated motor overheating'],
    ['Line D', '20 minutes', '7', '1010 units', '1000 units', 'Minor material delay'],
  ],
  manualQuestions: [
    'Which line had the highest downtime?',
    'Which line had the highest number of defects?',
    'Which line performed better than target output?',
    'Which line needs urgent attention?',
    'What is the most likely major operational issue?',
    'Which issue may affect production the most?',
  ],
  aiPrompt: `Act as a manufacturing operations analyst.
Your task is to convert the following operational data into a clear management report.

Context:
The report is for manufacturing leadership. It should explain production performance, downtime, defect issues, business impact, and recommended actions.

Operational Data:
[Paste the operational data table here]

Provide the output in this format:
1. Executive summary
2. Key observations
3. Production performance analysis
4. Downtime analysis
5. Quality/defect analysis
6. Business impact
7. Recommended actions
8. Priority level for each production line
9. Data gaps or additional information required

Constraints:
- Do not assume facts that are not present in the data.
- Mention uncertainty clearly.
- Keep the report professional and easy for management to understand.
- Focus on practical actions.
- Use a table wherever useful.`,
  reviewQuestions: [
    'Did AI correctly identify Line C as the highest concern?',
    'Did AI compare actual output against target output?',
    'Did AI mention downtime impact?',
    'Did AI mention quality/defect concerns?',
    'Did AI avoid unsupported assumptions?',
    'Did AI provide clear recommendations?',
    'Did AI mention missing data or data gaps?',
    'Is the report useful for management?',
    'Does the report need human review before sharing?',
  ],
  observationFields: [
    'Highest downtime',
    'Highest defects',
    'Best performing line',
    'Lowest performing line',
    'Main operational concern',
  ],
  impactOptions: [
    'Production delay',
    'Reduced output',
    'Increased defect rate',
    'Maintenance pressure',
    'Customer delivery risk',
    'Higher operating cost',
    'Reporting delay',
    'Safety concern',
  ],
  dataGaps: [
    ['Root cause details', ''],
    ['Maintenance history', ''],
    ['Operator comments', ''],
    ['Defect type details', ''],
    ['Machine sensor readings', ''],
    ['Shift-wise data', ''],
    ['Previous day/week comparison', ''],
    ['Cost impact', ''],
  ],
  sampleReport: {
    summary:
      'Line C requires the highest attention because it has the highest downtime, highest defects, and lowest output compared to target. Line B performed above target and had the lowest defect count. Line A needs review due to sensor calibration issues, while Line D appears mostly stable with a minor material delay.',
    issues: [
      ['Repeated motor overheating', 'Line C', 'High downtime and low output', 'High'],
      ['Sensor calibration issue', 'Line A', 'Downtime and output below target', 'Medium'],
      ['Material delay', 'Line D', 'Minor delay', 'Low'],
      ['No major issue', 'Line B', 'Normal operation', 'Low'],
    ],
    actions: [
      ['Inspect Line C motor overheating issue immediately.', 'Maintenance Team', 'High'],
      ['Check maintenance history for repeated motor issues.', 'Maintenance Team', 'High'],
      ['Recalibrate sensors on Line A.', 'Production / Maintenance Team', 'Medium'],
      ['Track material delay reason for Line D.', 'Stores / Production Team', 'Low'],
      ['Continue monitoring Line B as a benchmark line.', 'Production Team', 'Low'],
    ],
    data: [
      ['Shift-wise downtime data', 'To identify whether issue is shift-specific'],
      ['Defect type details', 'To identify recurring quality issues'],
      ['Machine maintenance history', 'To validate repeated failure patterns'],
      ['Sensor readings', 'To confirm overheating and calibration issues'],
      ['Cost of downtime', 'To estimate business impact'],
    ],
  },
  reflections: [
    'What did AI do well in report generation?',
    'What did AI miss or oversimplify?',
    'What information should be validated before sharing the report with management?',
    'Where can this type of AI-assisted reporting help in your organization?',
  ],
  takeaway:
    'AI can quickly structure reports, identify issues, suggest actions, and highlight data gaps. Human review is important because AI may misinterpret data, miss operational context, overstate or understate impact, or suggest actions without ground reality.',
}

export const sheet7 = {
  objective:
    'Decide whether a particular AI use is safe, risky, or not allowed in a corporate IT environment.',
  whyItMatters: [
    'AI output should not be blindly trusted.',
    'AI tools may give incorrect answers, expose sensitive information, misinterpret business context, or create security risks if connected to tools and systems.',
    'Some outputs need legal, technical, management, safety, or security review.',
  ],
  noShare: [
    ['Passwords / tokens / API keys', 'Database password, access token, secret key', 'No'],
    ['Customer personal data', 'Name, mobile number, email, address, ID number', 'No'],
    ['Employee personal data', 'Salary, medical detail, personal contact details', 'No'],
    ['Confidential business data', 'Pricing, contract, vendor rates, strategy', 'No'],
    ['Production-sensitive data', 'Machine settings, process formula, plant layout', 'Usually no'],
    ['Internal source code', 'Proprietary application code', 'Only with approval and controls'],
    ['Logs with sensitive values', 'IPs, usernames, tokens, request payloads', 'Only after masking'],
    ['Public information', 'Generic concepts, public documentation, dummy examples', 'Usually yes'],
    ['Anonymized sample data', 'Fake or masked sample ticket/log/report', 'Usually yes'],
  ],
  safetyQuestions: [
    ['Does the input contain customer information?', 'Remove, mask, or do not use.'],
    ['Does the input contain employee personal information?', 'Remove, mask, or do not use.'],
    ['Does the input contain passwords, tokens, API keys, or secrets?', 'Do not use. Remove immediately.'],
    ['Does the input contain confidential company data?', 'Get approval or use approved internal AI system.'],
    ['Does the input contain production system details?', 'Mask and check with IT/security team.'],
    ['Does the input contain logs with IPs, usernames, headers, or payloads?', 'Mask sensitive fields before use.'],
    ['Does the task involve decision-making with business impact?', 'Human review required.'],
    ['Does the task involve safety, compliance, finance, HR, or legal impact?', 'Human approval required.'],
    ['Is the AI output going to be sent to customers, vendors, or management?', 'Review before sharing.'],
    ['Is the AI connected to tools, APIs, databases, or workflows?', 'Add access control, approval, and audit logs.'],
  ],
  classifyScenarios: [
    'Asking AI to explain what predictive maintenance means using public examples.',
    'Pasting actual employee salary data and asking AI to summarize it.',
    'Pasting a server log after removing usernames, tokens, IPs, and request payloads.',
    'Asking AI to draft a generic email for a planned maintenance notification.',
    'Pasting a database password and asking AI to debug a connection issue.',
    'Asking AI to summarize a confidential vendor contract.',
    'Asking AI to create test cases using a dummy requirement document.',
    'Connecting AI directly to production systems without human approval.',
    'Asking AI to generate a checklist for IT incident review.',
    'Asking AI to approve a production change automatically.',
  ],
  unsafeInput: `User: Rajesh Kumar
Email: rajesh.kumar@company.com
Mobile: 9876543210
Employee ID: EMP-20456
System: MES Dashboard
IP Address: 10.20.15.45
API Token: sk_live_7x92abxxxx
Issue: User cannot access the MES dashboard from Plant 2.`,
  maskedInput: `User: [Employee Name Masked]
Email: [Email Masked]
Mobile: [Mobile Number Masked]
Employee ID: [Employee ID Masked]
System: MES Dashboard
IP Address: [Internal IP Masked]
API Token: [Removed]
Issue: User cannot access the MES dashboard from Plant 2.`,
  humanReviewRows: [
    'Draft email to internal employee',
    'Root cause analysis for production outage',
    'Suggested password reset steps',
    'Summary of public AI article',
    'Production change recommendation',
    'Cybersecurity incident summary',
    'Vendor contract summary',
    'Machine maintenance recommendation',
    'Management report generated from operations data',
    'Code generated for production deployment',
  ],
  riskAreas: [
    ['Data Privacy', 'Does it use personal or sensitive data?'],
    ['Confidentiality', 'Does it use internal business or technical data?'],
    ['Accuracy', 'What happens if AI gives a wrong answer?'],
    ['Security', 'Can AI access tools, systems, APIs, or databases?'],
    ['Compliance', 'Does the output affect audit, legal, finance, HR, or compliance work?'],
    ['Operational Impact', 'Can the output affect production, maintenance, or safety?'],
    ['Human Oversight', 'Is a human reviewing the result before action?'],
    ['Auditability', 'Is the AI decision/output recorded for review?'],
  ],
  rules: [
    ['Do not share secrets', 'Never enter passwords, tokens, API keys, private keys, or credentials.'],
    ['Mask sensitive data', 'Remove personal, customer, employee, or confidential data before using AI.'],
    ['Use approved tools', 'Prefer organization-approved AI tools for internal work.'],
    ['Verify output', 'Review AI answers before using them in reports, emails, tickets, or decisions.'],
    [
      'Do not automate critical actions without approval',
      'AI should not directly approve changes, delete data, or modify production systems without controls.',
    ],
    [
      'Keep humans in the loop',
      'Human review is required for high-risk, safety, security, legal, HR, compliance, and production-impacting tasks.',
    ],
    ['Maintain audit trail', 'Record important AI-assisted decisions and outputs where required.'],
    ['Avoid overreliance', 'AI can assist, but the final responsibility remains with the user or team.'],
  ],
  discussionQuestions: [
    'What type of data should never be entered into a public AI tool?',
    'Which AI use cases in your organization require human approval?',
    'Where can AI be safely used immediately?',
    'What controls should be introduced before enterprise-wide AI adoption?',
  ],
  declaration: [
    'I will not share passwords, tokens, API keys, or credentials.',
    'I will not share customer or employee personal information without approval.',
    'I will mask sensitive data before using AI.',
    'I will verify AI-generated output before using it.',
    'I will not use AI output blindly for production, safety, legal, HR, or financial decisions.',
    'I will follow my organization’s AI usage policy.',
    'I will ask for approval when handling confidential or high-risk data.',
  ],
  takeaway:
    'AI should be used as an assistant, not as an unchecked decision-maker. Responsible AI requires data privacy, information security, human validation, access control, auditability, clear ownership, and governance.',
}

export const sheet8 = {
  objective:
    'Convert an AI idea into a practical use case that can be evaluated and possibly taken forward as a pilot.',
  departments:
    'IT Support, Production, Maintenance, Quality, Supply Chain, HR, Finance, Cybersecurity, Software Development',
  useCaseFields: [
    'Use Case Name',
    'Department / Function',
    'Problem Area',
    'Current Process',
    'AI Opportunity',
    'Risk',
    'Small Pilot Idea',
  ],
  metrics: [
    'Time saved',
    'Accuracy improvement',
    'Reduction in manual work',
    'Faster response time',
    'Reduction in errors',
    'User satisfaction',
    'Other',
  ],
  priorityQuestions: [
    'Is the business value clear?',
    'Is the data available?',
    'Is the risk manageable?',
    'Can it be piloted in 30-60 days?',
    'Overall priority',
  ],
  scoringCriteria: [...scoreCriteria, 'User adoption potential'],
  presentationFields: [
    'Selected Use Case Name',
    'Why did your group select this use case?',
    'What problem does it solve?',
    'How will AI help?',
    'What data is required?',
    'What is the expected benefit?',
    'What is the main risk?',
    'What control is required?',
    'What will be the first pilot?',
    'How will success be measured?',
  ],
  exampleRows: [
    ['Use Case Name', 'AI Assistant for Machine Manual and SOP Search'],
    ['Department / Function', 'Maintenance / Production / IT'],
    [
      'Problem Area',
      'Employees spend time searching machine manuals, SOPs, and troubleshooting documents.',
    ],
    ['Current Process', 'Users manually search PDFs or ask senior team members.'],
    ['AI Opportunity', 'AI can answer questions from approved SOPs and machine manuals.'],
    ['Data Required', 'SOPs, machine manuals, maintenance documents, troubleshooting guides.'],
    [
      'Expected Benefit',
      'Faster knowledge access, reduced dependency on senior staff, quicker issue resolution.',
    ],
    ['Risk', 'AI may give incorrect maintenance guidance.'],
    [
      'Control Required',
      'Use only approved documents, show source reference, require human validation before action.',
    ],
    ['Small Pilot', 'Upload 10 approved SOPs/manuals and test with common maintenance questions.'],
    ['Success Metric', '30% reduction in time spent searching documents.'],
    ['Priority', 'High'],
  ],
  presentationTemplate: `Our selected use case is:
[Use case name]

The problem is:
[Problem statement]

Today, this is handled by:
[Current process]

AI can help by:
[AI opportunity]

The required data is:
[Data required]

The expected benefit is:
[Benefit]

The main risk is:
[Risk]

The control required is:
[Control]

The first pilot can be:
[Pilot idea]

Success can be measured by:
[Success metric]`,
  takeaway:
    'A practical AI use case should be clear, measurable, and safe. The best AI projects usually start small, prove value, and then scale gradually.',
}
