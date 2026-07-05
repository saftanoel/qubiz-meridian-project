// ── Shared ──

export type TaskStatus = "not_started" | "in_progress" | "done";

export interface ProgressSummary {
  total: number;
  done: number;
  in_progress: number;
  not_started: number;
  completion_percent: number;
}

// ── Dashboard ──

export interface DashboardNewHire {
  name: string;
  full_name: string;
  start_date: string;
  role: string;
  department: string;
}

export interface NextAction {
  id: number;
  title: string;
  meta: string;
  tone: string;
  completed: boolean;
}

export interface SuggestedPerson {
  id: number;
  name: string;
  role: string;
  department: string;
  reason: string;
  initials: string;
  avatar_url?: string;
}

export interface UpcomingOfficeDay {
  day: string;
  date: string;
  label: string;
  tone: string;
}

export interface DashboardResponse {
  new_hire: DashboardNewHire;
  today_next_actions: NextAction[];
  progress_summary: ProgressSummary;
  suggested_people: SuggestedPerson[];
  upcoming_office_days: UpcomingOfficeDay[];
}

// ── Onboarding ──

export interface OnboardingTask {
  id: number;
  title: string;
  description: string | null;
  phase: string;
  priority: string;
  estimated_minutes: number | null;
  owner_department: string | null;
  status: TaskStatus;
}

export interface PhaseGroup {
  phase: string;
  title: string;
  tasks: OnboardingTask[];
}

export interface OnboardingTasksResponse {
  phases: PhaseGroup[];
  progress: ProgressSummary;
}

export interface TaskUpdateResponse {
  task: OnboardingTask;
  progress: ProgressSummary;
}

// ── Employees ──

export interface EmployeeInterest {
  id: number;
  interest: string;
}

export interface EmployeeOfficeDay {
  id: number;
  day: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar_url: string | null;
  is_buddy: boolean;
  match_reason: string | null;
  ask_me_about: string | null;
  interests: EmployeeInterest[];
  office_days: EmployeeOfficeDay[];
  usual_location_name?: string;
}

// ── Resources ──

export interface Resource {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// ── Office ──

export interface OfficeLocationPerson {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar_url?: string;
}

export interface OfficeLocation {
  id: number;
  name: string;
  description: string | null;
  tips: string[];
  who_you_can_meet: string | null;
  why_it_matters: string | null;
  people: OfficeLocationPerson[];
}

// ── HR ──

export interface HrNewHire {
  id: number;
  name: string;
  role: string;
  department: string;
  start_date: string;
  buddy_name: string | null;
  status: string;
  progress: number;
}

export interface HrActionItem {
  id: number;
  title: string;
  description: string | null;
  severity: string;
  action_label: string | null;
  status: string;
}

export interface HrStats {
  new_hires_this_month: number;
  average_onboarding_progress: number;
  missing_buddy_assignments: number;
  overdue_tasks: number;
  pending_checkins: number;
}

export interface HrOverviewResponse {
  stats: HrStats;
  new_hires: HrNewHire[];
  action_items: HrActionItem[];
}
