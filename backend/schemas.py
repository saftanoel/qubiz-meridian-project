from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ── Employee ──

class EmployeeInterestOut(BaseModel):
    id: int
    interest: str

    model_config = {"from_attributes": True}


class EmployeeOfficeDayOut(BaseModel):
    id: int
    day: str

    model_config = {"from_attributes": True}


class EmployeeOut(BaseModel):
    id: int
    name: str
    role: str
    department: str
    avatar_url: Optional[str] = None
    is_buddy: bool
    match_reason: Optional[str] = None
    ask_me_about: Optional[str] = None
    interests: list[EmployeeInterestOut] = []
    office_days: list[EmployeeOfficeDayOut] = []

    model_config = {"from_attributes": True}


# ── Onboarding Tasks ──

class TaskProgressOut(BaseModel):
    status: str
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class OnboardingTaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    phase: str
    priority: str
    estimated_minutes: Optional[int] = None
    owner_department: Optional[str] = None
    status: str = "not_started"  # derived from TaskProgress

    model_config = {"from_attributes": True}


class TaskStatusUpdate(BaseModel):
    status: str  # not_started, in_progress, done


class ProgressSummary(BaseModel):
    total: int
    done: int
    in_progress: int
    not_started: int
    completion_percent: int


class PhaseGroup(BaseModel):
    phase: str
    title: str
    tasks: list[OnboardingTaskOut]


class OnboardingTasksResponse(BaseModel):
    phases: list[PhaseGroup]
    progress: ProgressSummary


class TaskUpdateResponse(BaseModel):
    task: OnboardingTaskOut
    progress: ProgressSummary


# ── Resources ──

class ResourceOut(BaseModel):
    id: int
    question: str
    answer: str
    category: str

    model_config = {"from_attributes": True}


# ── Office ──

class OfficeLocationOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    tips: list[str] = []
    who_you_can_meet: Optional[str] = None
    why_it_matters: Optional[str] = None


# ── HR ──

class NewHireOut(BaseModel):
    id: int
    name: str
    role: str
    department: str
    start_date: str
    buddy_name: Optional[str] = None
    status: str
    progress: int  # calculated from task_progress

    model_config = {"from_attributes": True}


class HrActionItemOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    severity: str
    action_label: Optional[str] = None
    status: str

    model_config = {"from_attributes": True}


class ActionItemStatusUpdate(BaseModel):
    status: str  # open, resolved


class HrStatsOut(BaseModel):
    new_hires_this_month: int
    average_onboarding_progress: int
    missing_buddy_assignments: int
    overdue_tasks: int
    pending_checkins: int


class HrOverviewResponse(BaseModel):
    stats: HrStatsOut
    new_hires: list[NewHireOut]
    action_items: list[HrActionItemOut]


# ── Dashboard ──

class SuggestedPersonOut(BaseModel):
    id: int
    name: str
    role: str
    department: str
    reason: str
    initials: str
    avatar_url: Optional[str] = None


class UpcomingOfficeDayOut(BaseModel):
    day: str
    date: str
    label: str
    tone: str


class NextActionOut(BaseModel):
    id: int
    title: str
    meta: str
    tone: str
    completed: bool


class DashboardNewHireOut(BaseModel):
    name: str
    full_name: str
    start_date: str
    role: str
    department: str


class DashboardResponse(BaseModel):
    new_hire: DashboardNewHireOut
    today_next_actions: list[NextActionOut]
    progress_summary: ProgressSummary
    suggested_people: list[SuggestedPersonOut]
    upcoming_office_days: list[UpcomingOfficeDayOut]
