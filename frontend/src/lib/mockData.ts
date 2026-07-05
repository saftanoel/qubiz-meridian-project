// ──────────────────────────────────────────────
// Employee profile (the logged-in new hire)
// ──────────────────────────────────────────────
export const employeeData = {
  name: "George",
  fullName: "Safta George-Manuel",
  startDate: "2026-07-04",
  role: "Software Engineer",
  department: "Engineering",
};

// ──────────────────────────────────────────────
// Dashboard – next actions
// ──────────────────────────────────────────────
export const nextActions = [
  { id: 1, title: "Check your first-day schedule", meta: "3 min · HR", tone: "peach", completed: false },
  { id: 2, title: "Meet your onboarding buddy online", meta: "15 min · Mara Ionescu", tone: "teal", completed: false },
  { id: 3, title: "Read the hybrid work guide", meta: "10 min · People Ops", tone: "sky", completed: false },
];

// ──────────────────────────────────────────────
// Dashboard – suggested connections (summary)
// ──────────────────────────────────────────────
export const suggestedConnections = [
  { id: 1, name: "Mara Ionescu", role: "Frontend Developer", department: "Engineering", reason: "You both like React and music.", initials: "MI", color: "var(--color-subtle-peach)" },
  { id: 2, name: "Andrei Pop", role: "Backend Developer", department: "Engineering", reason: "You'll both work in Engineering workflows.", initials: "AP", color: "var(--color-teal-soft)" },
  { id: 3, name: "Ioana Radu", role: "HR Specialist", department: "HR", reason: "She can help with first-month questions.", initials: "IR", color: "var(--color-light-mint)" },
];

// ──────────────────────────────────────────────
// Dashboard – upcoming office days
// ──────────────────────────────────────────────
export const upcomingOfficeDays = [
  { day: "Mon", date: "Jul 7", label: "Your first day", tone: "peach" },
  { day: "Wed", date: "Jul 9", label: "Team anchor day", tone: "teal" },
  { day: "Thu", date: "Jul 10", label: "Team anchor day", tone: "teal" },
  { day: "Fri", date: "Jul 11", label: "Remote — demo day", tone: "sky" },
];

// ──────────────────────────────────────────────
// Journey – 30-day phases & tasks
// ──────────────────────────────────────────────
export type TaskStatus = 'done' | 'in_progress' | 'not_started';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface JourneyTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  time: string;
  owner: string;
}

export interface JourneyPhase {
  id: string;
  title: string;
  iconName: string;
  tasks: JourneyTask[];
}

export const journeyPhases: JourneyPhase[] = [
  {
    id: "phase-1",
    title: "Before Day 1",
    iconName: "ClipboardCheck",
    tasks: [
      { id: "t1", title: "Sign offer letter", description: "Review and digitally sign your employment agreement.", status: "done", priority: "High", time: "10 min", owner: "HR" },
      { id: "t2", title: "Complete background check", description: "Fill out the verification form sent to your email.", status: "done", priority: "High", time: "15 min", owner: "HR" },
      { id: "t3", title: "Choose laptop & equipment", description: "Pick your preferred setup from the equipment catalog.", status: "done", priority: "Medium", time: "5 min", owner: "IT" },
    ],
  },
  {
    id: "phase-2",
    title: "First Day",
    iconName: "CalendarCheck",
    tasks: [
      { id: "t4", title: "Check your first-day schedule", description: "Review the agenda HR prepared for your arrival.", status: "done", priority: "High", time: "3 min", owner: "HR" },
      { id: "t5", title: "Set up your laptop & accounts", description: "Follow the IT setup guide to configure your dev environment.", status: "in_progress", priority: "High", time: "30 min", owner: "IT" },
      { id: "t6", title: "Introduce yourself on Slack", description: "Post a quick hello in #new-joiners with your name and fun fact.", status: "not_started", priority: "Medium", time: "5 min", owner: "You" },
      { id: "t7", title: "Meet your onboarding buddy", description: "A casual 15-minute video call to say hi and ask anything.", status: "not_started", priority: "High", time: "15 min", owner: "People Ops" },
    ],
  },
  {
    id: "phase-3",
    title: "First Week",
    iconName: "Route",
    tasks: [
      { id: "t8", title: "Complete security training", description: "Mandatory online module covering data protection basics.", status: "not_started", priority: "High", time: "20 min", owner: "IT" },
      { id: "t9", title: "Read the hybrid work guide", description: "Understand anchor days, remote policies, and office norms.", status: "not_started", priority: "Medium", time: "10 min", owner: "People Ops" },
      { id: "t10", title: "Join your first standup", description: "Observe the team's daily standup — no pressure to present yet.", status: "not_started", priority: "Medium", time: "15 min", owner: "Engineering" },
    ],
  },
  {
    id: "phase-4",
    title: "First Month",
    iconName: "Trophy",
    tasks: [
      { id: "t11", title: "30-day check-in with manager", description: "A relaxed 1:1 to discuss how you're settling in.", status: "not_started", priority: "High", time: "30 min", owner: "Engineering" },
      { id: "t12", title: "Present first mini-project", description: "Share a small piece of work with the team — show what you've learned.", status: "not_started", priority: "Medium", time: "45 min", owner: "Engineering" },
    ],
  },
];

// ──────────────────────────────────────────────
// Connect – employee directory
// ──────────────────────────────────────────────
export const allEmployees = [
  {
    id: 1,
    name: "Mara Ionescu",
    role: "Engineering Manager",
    department: "Engineering",
    interests: ["Hiking", "Coffee", "React"],
    officeDays: ["Monday", "Wednesday", "Thursday"],
    askMeAbout: "System architecture, local coffee spots",
    matchReason: "Your direct manager — she'll guide your first sprint and help you ramp up.",
    isBuddy: false,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Andrei Pop",
    role: "Product Designer",
    department: "Design",
    interests: ["Photography", "Figma", "Dogs"],
    officeDays: ["Tuesday", "Wednesday"],
    askMeAbout: "Design system, dog-friendly parks nearby",
    matchReason: "Works on the same product pod — great for cross-functional questions.",
    isBuddy: false,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ioana Radu",
    role: "HR Partner",
    department: "Human Resources",
    interests: ["Reading", "Baking", "Yoga"],
    officeDays: ["Monday", "Tuesday", "Thursday"],
    askMeAbout: "Benefits, onboarding process, best bakeries in town",
    matchReason: "Your onboarding buddy — your go-to person for literally any question.",
    isBuddy: true,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Vlad Marinescu",
    role: "Frontend Engineer",
    department: "Engineering",
    interests: ["React", "Gaming", "Anime"],
    officeDays: ["Wednesday", "Friday"],
    askMeAbout: "Frontend guild, video games, TypeScript patterns",
    matchReason: "Shared interest: React — joined 3 months ago and remembers what it's like.",
    isBuddy: false,
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ana Popescu",
    role: "Marketing Lead",
    department: "Marketing",
    interests: ["Writing", "Running", "Podcasts"],
    officeDays: ["Monday", "Thursday"],
    askMeAbout: "Company brand, content strategy, running routes",
    matchReason: "Runs the internal newsletter — a great way to learn what's happening.",
    isBuddy: false,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Tudor Munteanu",
    role: "Data Analyst",
    department: "Finance",
    interests: ["Python", "Board Games", "Cooking"],
    officeDays: ["Tuesday", "Wednesday", "Friday"],
    askMeAbout: "Analytics tools, board game nights, lunch spots",
    matchReason: "Organizes the weekly board game social — easiest way to meet people.",
    isBuddy: false,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

// ──────────────────────────────────────────────
// Office Explorer – areas
// ──────────────────────────────────────────────
export const officeAreas = {
  reception: {
    title: "Reception & Lobby",
    description: "The main entrance. Check in guests and grab a morning coffee.",
    tips: ["Say hi to Sarah at the front desk!", "Coffee machine here is the best one."],
    whoYouMeet: "Front desk staff, arriving visitors",
    whyItMatters: "Your first impression of the office — and where your badge gets you in.",
  },
  hr: {
    title: "HR & People Desk",
    description: "The People team sits here. Drop by for onboarding paperwork or a chat.",
    tips: ["Ioana Radu sits here — your onboarding buddy.", "Don't hesitate to ask even 'silly' questions."],
    whoYouMeet: "Ioana Radu (HR Partner), the People Ops team",
    whyItMatters: "Your home base for all onboarding questions in the first weeks.",
  },
  engineering: {
    title: "Engineering Pods",
    description: "Where the magic happens. Quiet work zones and pairing stations.",
    tips: ["Please keep voices low in the deep work zone.", "Standup happens here at 10 AM."],
    whoYouMeet: "Mara Ionescu (your manager), Vlad Marinescu, backend & infra engineers",
    whyItMatters: "This is where your team sits — you'll spend most of your office days here.",
  },
  kitchen: {
    title: "Main Kitchen & Cafe",
    description: "Lunch area, snacks, and casual meetings. The social heartbeat of the office.",
    tips: ["Snacks refilled on Mondays.", "Microwave rush hour is 12:30 PM.", "Friday lunch is usually team-ordered."],
    whoYouMeet: "Everyone — the kitchen is the great equalizer",
    whyItMatters: "Best place for accidental conversations. Many friendships start over coffee here.",
  },
  meeting: {
    title: "Meeting Rooms (A–D)",
    description: "Formal meeting spaces with AV equipment and whiteboards.",
    tips: ["Book via Google Calendar.", "Room C has the best natural light.", "Room A has a standing desk setup."],
    whoYouMeet: "Cross-functional teams during sprint planning and reviews",
    whyItMatters: "Where you'll have your 1:1s, sprint ceremonies, and design reviews.",
  },
  quiet: {
    title: "Quiet Zone",
    description: "A dedicated space for focused, heads-down work. No calls, no meetings.",
    tips: ["Use noise-cancelling headphones here.", "Reserve a booth for long focus blocks."],
    whoYouMeet: "Writers, developers doing deep work, analysts",
    whyItMatters: "Perfect when you need to concentrate on learning new codebases or completing training.",
  },
  social: {
    title: "Social Space & Games",
    description: "Ping pong, couches, and relaxation area.",
    tips: ["Ping pong tournament on Fridays.", "Great place for informal 1-on-1s.", "Board game night is every other Wednesday."],
    whoYouMeet: "Tudor Munteanu (board game organizer), cross-team friends",
    whyItMatters: "Easiest way to meet people outside your team. Highly recommended in week one.",
  },
};

// ──────────────────────────────────────────────
// Ask Meridian – FAQs
// ──────────────────────────────────────────────
export const faqCategories = [
  "All",
  "First Day",
  "Hybrid Work",
  "Slack & Communication",
  "Meetings",
  "People",
  "Office",
  "HR & Admin",
];

export const suggestedQuestions = [
  "What should I wear on my first day?",
  "How does hybrid work actually work?",
  "Who should I message first on Slack?",
  "Where do I eat lunch?",
  "How do I book a meeting room?",
];

export const faqs = [
  {
    id: 1,
    question: "What should I wear on my first day?",
    answer: "Meridian has a casual dress code. Jeans and a clean t-shirt are perfectly fine. Dress smartly only if you have a client meeting scheduled.",
    category: "First Day",
  },
  {
    id: 2,
    question: "How does hybrid work actually work?",
    answer: "Each team has 'anchor days' — usually 2-3 days per week in the office. Engineering anchors on Wednesday and Thursday. Remote days are fully flexible. There's no micromanagement.",
    category: "Hybrid Work"
  },
  {
    id: 3,
    question: "Who should I message first on Slack?",
    answer: "Start with #general, #new-joiners, and your team channel (#eng-frontend). For fun, try #random, #pets, and #lunch-plans. Don't worry about being in too many — you can always leave.",
    category: "Slack & Communication",
  },
  {
    id: 4,
    question: "How do I book a meeting room?",
    answer: "Add the meeting room as a 'guest' in your Google Calendar invite. Rooms A–D are on the 2nd floor. Room C has the best natural light. Book at least 30 minutes in advance.",
    category: "Meetings",
  },
  {
    id: 5,
    question: "Who is my onboarding buddy?",
    answer: "Your onboarding buddy is Emily Wong from HR. She's your go-to for any question — even the ones that feel 'too small' to ask. Don't hesitate!",
    category: "People"
  },
  {
    id: 6,
    question: "Where do I eat lunch?",
    answer: "Most people eat in the main kitchen/café area. Snacks are free and refilled on Mondays. Many teams do informal lunch together — just ask in your team's Slack channel.",
    category: "Office",
  },
  {
    id: 7,
    question: "How do I request time off?",
    answer: "Submit requests through the HR Portal under the 'Leave' section. Approvals typically take 1-2 business days. For your first month, just coordinate with your manager directly.",
    category: "HR & Admin",
  },
  {
    id: 8,
    question: "How do I expense a home office purchase?",
    answer: "Submit receipts through Expensify. New hires get up to $500 for home office setup in their first year. Your manager needs to pre-approve purchases over $100.",
    category: "HR & Admin",
  },
  {
    id: 9,
    question: "Who do I contact for IT support?",
    answer: "Post in the #help-it Slack channel or submit a ticket via Jira Service Desk. For urgent laptop issues on day one, find the IT desk on the 1st floor near Reception.",
    category: "Slack & Communication",
  },
  {
    id: 10,
    question: "Is there a gym or wellness benefit?",
    answer: "Yes! Meridian covers up to $50/month for gym or wellness apps. Submit receipts through Expensify under 'Wellness'. There's also a quiet yoga room on the 3rd floor.",
    category: "HR & Admin",
  },
];

// ──────────────────────────────────────────────
// HR View – stats
// ──────────────────────────────────────────────
export const hrStats = {
  newHiresCount: 3,
  avgProgress: 58,
  missingBuddies: 1,
  overdueTasks: 2,
  pendingFeedback: 3,
};

// ──────────────────────────────────────────────
// HR View – new hires
// ──────────────────────────────────────────────
export type HireStatus = 'on_track' | 'needs_attention';

export interface NewHire {
  id: number;
  name: string;
  role: string;
  department: string;
  startDate: string;
  buddy: string | null;
  status: HireStatus;
  progress: number;
}

export const newHires: NewHire[] = [
  {
    id: 1,
    name: "Alex Doe",
    role: "Software Engineer",
    department: "Engineering",
    startDate: "Jul 7, 2026",
    buddy: "Emily Wong",
    status: "on_track",
    progress: 25,
  },
  {
    id: 2,
    name: "Diana Pavel",
    role: "Marketing Specialist",
    department: "Marketing",
    startDate: "Jul 14, 2026",
    buddy: null,
    status: "needs_attention",
    progress: 10,
  },
  {
    id: 3,
    name: "Matei Rusu",
    role: "Data Analyst",
    department: "Finance",
    startDate: "Jun 23, 2026",
    buddy: "Liam O'Brien",
    status: "needs_attention",
    progress: 65,
  },
];

// ──────────────────────────────────────────────
// HR View – action required items
// ──────────────────────────────────────────────
export type Severity = 'high' | 'medium' | 'low';

export interface ActionItem {
  id: number;
  title: string;
  description: string;
  buttonLabel: string;
  severity: Severity;
}

export const actionItems: ActionItem[] = [
  {
    id: 1,
    title: "Diana Pavel needs a buddy",
    description: "Starts next week in Marketing. No buddy assigned yet.",
    buttonLabel: "Assign Buddy",
    severity: "high",
  },
  {
    id: 2,
    title: "2 tasks overdue for Matei",
    description: "First Day phase tasks are still pending.",
    buttonLabel: "Send Reminder",
    severity: "medium",
  },
  {
    id: 3,
    title: "3 feedback check-ins pending",
    description: "Week 1 surveys have not been opened.",
    buttonLabel: "Nudge Employees",
    severity: "low",
  },
];
