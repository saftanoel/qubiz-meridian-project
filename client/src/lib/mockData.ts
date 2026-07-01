export const employeeData = {
  name: "Alex Doe",
  startDate: "2026-07-04",
  role: "Software Engineer",
  department: "Engineering",
};

export const nextActions = [
  { id: 1, title: "Review equipment checklist", completed: true },
  { id: 2, title: "Set up benefits portal", completed: false },
  { id: 3, title: "Introduce yourself on Slack", completed: false },
];

export const suggestedConnections = [
  { id: 1, name: "Sarah Chen", role: "Engineering Manager", reason: "Your Manager" },
  { id: 2, name: "Mike Ross", role: "Product Designer", reason: "Works on your team" },
  { id: 3, name: "Emily Wong", role: "HR Partner", reason: "Your Onboarding Buddy" },
];

export const journeyPhases = [
  {
    id: "phase-1",
    title: "Before Day 1",
    status: "completed", // completed, current, upcoming
    tasks: [
      { id: "t1", title: "Sign offer letter", completed: true, priority: "high" },
      { id: "t2", title: "Fill out background check", completed: true, priority: "high" },
      { id: "t3", title: "Choose laptop & equipment", completed: true, priority: "medium" },
    ]
  },
  {
    id: "phase-2",
    title: "First Day",
    status: "current",
    tasks: [
      { id: "t4", title: "Review equipment checklist", completed: true, priority: "high" },
      { id: "t5", title: "Set up benefits portal", completed: false, priority: "high" },
      { id: "t6", title: "Introduce yourself on Slack", completed: false, priority: "medium" },
    ]
  },
  {
    id: "phase-3",
    title: "First Week",
    status: "upcoming",
    tasks: [
      { id: "t7", title: "Meet your onboarding buddy", completed: false, priority: "high" },
      { id: "t8", title: "Complete security training", completed: false, priority: "high" },
    ]
  },
  {
    id: "phase-4",
    title: "First Month",
    status: "upcoming",
    tasks: [
      { id: "t9", title: "30-day check-in with manager", completed: false, priority: "high" },
      { id: "t10", title: "Present first mini-project", completed: false, priority: "medium" },
    ]
  }
];

export const allEmployees = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Engineering Manager",
    department: "Engineering",
    interests: ["Hiking", "Coffee", "React"],
    officeDays: ["Mon", "Wed", "Thu"],
    askMeAbout: "System Architecture, Local coffee spots",
    matchReason: "Your Manager"
  },
  {
    id: 2,
    name: "Mike Ross",
    role: "Product Designer",
    department: "Design",
    interests: ["Photography", "Figma", "Dogs"],
    officeDays: ["Tue", "Wed"],
    askMeAbout: "Design System, Dog friendly parks",
    matchReason: "Works on your team"
  },
  {
    id: 3,
    name: "Emily Wong",
    role: "HR Partner",
    department: "Human Resources",
    interests: ["Reading", "Baking"],
    officeDays: ["Mon", "Tue", "Thu"],
    askMeAbout: "Benefits, Onboarding, Best bakeries",
    matchReason: "Your Onboarding Buddy"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Frontend Engineer",
    department: "Engineering",
    interests: ["React", "Gaming", "Anime"],
    officeDays: ["Wed", "Fri"],
    askMeAbout: "Frontend Guild, Video games",
    matchReason: "Shared interest: React"
  }
];

export const officeAreas = {
  reception: {
    title: "Reception & Lobby",
    description: "The main entrance. Check in guests and grab a morning coffee.",
    tips: ["Say hi to Sarah at the front desk!", "Coffee machine here is the best one."]
  },
  engineering: {
    title: "Engineering Pods",
    description: "Where the magic happens. Quiet work zones and pairing stations.",
    tips: ["Please keep voices low in the deep work zone.", "Standup happens here at 10 AM."]
  },
  kitchen: {
    title: "Main Kitchen & Cafe",
    description: "Lunch area, snacks, and casual meetings.",
    tips: ["Snacks refilled on Mondays.", "Microwave rush hour is 12:30 PM."]
  },
  meeting: {
    title: "Meeting Rooms (A-D)",
    description: "Formal meeting spaces with AV equipment.",
    tips: ["Book via Google Calendar.", "Room C has the best natural light."]
  },
  social: {
    title: "Social Space & Games",
    description: "Ping pong, couches, and relaxation area.",
    tips: ["Ping pong tournament on Fridays.", "Great place for informal 1-on-1s."]
  }
};

export const faqs = [
  {
    id: 1,
    question: "How do I request time off?",
    answer: "You can request time off through the HR Portal under the 'Leave' section. Approvals typically take 1-2 business days.",
    category: "HR & Benefits"
  },
  {
    id: 2,
    question: "What is the dress code?",
    answer: "Meridian has a casual dress code. Jeans and t-shirts are perfectly fine. Please dress smartly if you have client meetings.",
    category: "Culture"
  },
  {
    id: 3,
    question: "How do I expense a home office purchase?",
    answer: "Submit your receipts through Expensify. Home office budgets are up to $500 for your first year.",
    category: "Finance"
  },
  {
    id: 4,
    question: "Who do I contact for IT support?",
    answer: "You can reach IT Support by posting in the #help-it Slack channel or submitting a ticket via Jira Service Desk.",
    category: "IT Support"
  }
];

export const newHires = [
  {
    id: 1,
    name: "Alex Doe",
    role: "Software Engineer",
    startDate: "2026-07-04",
    status: "Upcoming",
    progress: 25,
    actionRequired: true,
    actionNote: "Needs laptop selection"
  },
  {
    id: 2,
    name: "Jamie Smith",
    role: "Marketing Manager",
    startDate: "2026-06-25",
    status: "First Week",
    progress: 60,
    actionRequired: false,
    actionNote: ""
  },
  {
    id: 3,
    name: "Taylor Reed",
    role: "Data Analyst",
    startDate: "2026-06-10",
    status: "First Month",
    progress: 90,
    actionRequired: false,
    actionNote: ""
  }
];
