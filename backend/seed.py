"""
Seed data for Meridian Compass.
Idempotent — checks if data exists before inserting.
"""
import json
from sqlalchemy.orm import Session
from models import (
    Employee, EmployeeInterest, EmployeeOfficeDay,
    OnboardingTask, TaskProgress,
    Resource, OfficeLocation,
    HrActionItem, NewHire,
)


def seed_database(db: Session) -> None:
    """Seed all tables. Skips if employees already exist."""
    existing = db.query(Employee).first()
    if existing:
        return  # already seeded

    _seed_employees(db)
    _seed_onboarding_tasks(db)
    _seed_new_hires(db)
    _seed_task_progress(db)
    _seed_resources(db)
    _seed_office_locations(db)
    _seed_hr_action_items(db)

    db.commit()


# ── Employees ──

def _seed_employees(db: Session) -> None:
    employees_data = [
        {
            "id": 1,
            "name": "Mara Ionescu",
            "role": "Engineering Manager",
            "department": "Engineering",
            "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
            "is_buddy": False,
            "match_reason": "Your direct manager — she'll guide your first sprint and help you ramp up.",
            "ask_me_about": "System architecture, local coffee spots",
            "interests": ["Hiking", "Coffee", "React"],
            "office_days": ["Monday", "Wednesday", "Thursday"],
            "usual_location_id": 3,
        },
        {
            "id": 2,
            "name": "Andrei Pop",
            "role": "Product Designer",
            "department": "Design",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            "is_buddy": False,
            "match_reason": "Works on the same product pod — great for cross-functional questions.",
            "ask_me_about": "Design system, dog-friendly parks nearby",
            "interests": ["Photography", "Figma", "Dogs"],
            "office_days": ["Tuesday", "Wednesday"],
            "usual_location_id": 3,
        },
        {
            "id": 3,
            "name": "Ioana Radu",
            "role": "HR Partner",
            "department": "Human Resources",
            "avatar_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
            "is_buddy": True,
            "match_reason": "Your onboarding buddy — your go-to person for literally any question.",
            "ask_me_about": "Benefits, onboarding process, best bakeries in town",
            "interests": ["Reading", "Baking", "Yoga"],
            "office_days": ["Monday", "Tuesday", "Thursday"],
            "usual_location_id": 2,
        },
        {
            "id": 4,
            "name": "Vlad Marinescu",
            "role": "Frontend Engineer",
            "department": "Engineering",
            "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
            "is_buddy": False,
            "match_reason": "Shared interest: React — joined 3 months ago and remembers what it's like.",
            "ask_me_about": "Frontend guild, video games, TypeScript patterns",
            "interests": ["React", "Gaming", "Anime"],
            "office_days": ["Wednesday", "Friday"],
            "usual_location_id": 5,
        },
        {
            "id": 5,
            "name": "Ana Popescu",
            "role": "Marketing Lead",
            "department": "Marketing",
            "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
            "is_buddy": False,
            "match_reason": "Runs the internal newsletter — a great way to learn what's happening.",
            "ask_me_about": "Company brand, content strategy, running routes",
            "interests": ["Writing", "Running", "Podcasts"],
            "office_days": ["Monday", "Thursday"],
            "usual_location_id": 6,
        },
        {
            "id": 6,
            "name": "Tudor Munteanu",
            "role": "Data Analyst",
            "department": "Finance",
            "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
            "is_buddy": False,
            "match_reason": "Organizes the weekly board game social — easiest way to meet people.",
            "ask_me_about": "Analytics tools, board game nights, lunch spots",
            "interests": ["Python", "Board Games", "Cooking"],
            "office_days": ["Tuesday", "Wednesday", "Friday"],
            "usual_location_id": 8,
        },
    ]

    for emp_data in employees_data:
        interests = emp_data.pop("interests")
        office_days = emp_data.pop("office_days")

        employee = Employee(**emp_data)
        db.add(employee)
        db.flush()

        for interest in interests:
            db.add(EmployeeInterest(employee_id=employee.id, interest=interest))
        for day in office_days:
            db.add(EmployeeOfficeDay(employee_id=employee.id, day=day))


# ── Onboarding Tasks ──

def _seed_onboarding_tasks(db: Session) -> None:
    tasks = [
        # Before Day 1
        {"id": 1, "title": "Sign offer letter", "description": "Review and digitally sign your employment agreement.", "phase": "before_day_1", "priority": "high", "estimated_minutes": 10, "owner_department": "HR"},
        {"id": 2, "title": "Complete background check", "description": "Fill out the verification form sent to your email.", "phase": "before_day_1", "priority": "high", "estimated_minutes": 15, "owner_department": "HR"},
        {"id": 3, "title": "Choose laptop & equipment", "description": "Pick your preferred setup from the equipment catalog.", "phase": "before_day_1", "priority": "medium", "estimated_minutes": 5, "owner_department": "IT"},
        # First Day
        {"id": 4, "title": "Check your first-day schedule", "description": "Review the agenda HR prepared for your arrival.", "phase": "first_day", "priority": "high", "estimated_minutes": 3, "owner_department": "HR"},
        {"id": 5, "title": "Set up your laptop & accounts", "description": "Follow the IT setup guide to configure your dev environment.", "phase": "first_day", "priority": "high", "estimated_minutes": 30, "owner_department": "IT"},
        {"id": 6, "title": "Introduce yourself on Slack", "description": "Post a quick hello in #new-joiners with your name and fun fact.", "phase": "first_day", "priority": "medium", "estimated_minutes": 5, "owner_department": "You"},
        {"id": 7, "title": "Meet your onboarding buddy", "description": "A casual 15-minute video call to say hi and ask anything.", "phase": "first_day", "priority": "high", "estimated_minutes": 15, "owner_department": "People Ops"},
        # First Week
        {"id": 8, "title": "Complete security training", "description": "Mandatory online module covering data protection basics.", "phase": "first_week", "priority": "high", "estimated_minutes": 20, "owner_department": "IT"},
        {"id": 9, "title": "Read the hybrid work guide", "description": "Understand anchor days, remote policies, and office norms.", "phase": "first_week", "priority": "medium", "estimated_minutes": 10, "owner_department": "People Ops"},
        {"id": 10, "title": "Join your first standup", "description": "Observe the team's daily standup — no pressure to present yet.", "phase": "first_week", "priority": "medium", "estimated_minutes": 15, "owner_department": "Engineering"},
        # First Month
        {"id": 11, "title": "30-day check-in with manager", "description": "A relaxed 1:1 to discuss how you're settling in.", "phase": "first_month", "priority": "high", "estimated_minutes": 30, "owner_department": "Engineering"},
        {"id": 12, "title": "Present first mini-project", "description": "Share a small piece of work with the team — show what you've learned.", "phase": "first_month", "priority": "medium", "estimated_minutes": 45, "owner_department": "Engineering"},
    ]

    for task_data in tasks:
        db.add(OnboardingTask(**task_data))


# ── New Hires ──

def _seed_new_hires(db: Session) -> None:
    new_hires = [
        {"id": 1, "name": "George", "role": "Software Engineer", "department": "Engineering", "start_date": "Jul 7, 2026", "buddy_name": "Ioana Radu", "status": "on_track"},
        {"id": 2, "name": "Diana Pavel", "role": "Marketing Specialist", "department": "Marketing", "start_date": "Jul 14, 2026", "buddy_name": None, "status": "needs_attention"},
        {"id": 3, "name": "Matei Rusu", "role": "Data Analyst", "department": "Finance", "start_date": "Jun 23, 2026", "buddy_name": "Liam O'Brien", "status": "needs_attention"},
    ]

    for hire_data in new_hires:
        db.add(NewHire(**hire_data))


# ── Task Progress (for demo new hire George, id=1) ──

def _seed_task_progress(db: Session) -> None:
    """
    Match the frontend mock data status:
    - t1 (Sign offer letter): done
    - t2 (Complete background check): done
    - t3 (Choose laptop & equipment): done
    - t4 (Check your first-day schedule): done
    - t5 (Set up your laptop & accounts): in_progress
    - t6 (Introduce yourself on Slack): not_started
    - t7 (Meet your onboarding buddy): not_started
    - t8-t12: not_started
    """
    progress_entries = [
        {"task_id": 1, "new_hire_id": 1, "status": "done"},
        {"task_id": 2, "new_hire_id": 1, "status": "done"},
        {"task_id": 3, "new_hire_id": 1, "status": "done"},
        {"task_id": 4, "new_hire_id": 1, "status": "done"},
        {"task_id": 5, "new_hire_id": 1, "status": "in_progress"},
        {"task_id": 6, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 7, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 8, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 9, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 10, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 11, "new_hire_id": 1, "status": "not_started"},
        {"task_id": 12, "new_hire_id": 1, "status": "not_started"},
    ]

    for entry in progress_entries:
        db.add(TaskProgress(**entry))


# ── Resources / FAQs ──

def _seed_resources(db: Session) -> None:
    resources = [
        {"id": 1, "question": "What should I wear on my first day?", "answer": "Meridian has a casual dress code. Jeans and a clean t-shirt are perfectly fine. Dress smartly only if you have a client meeting scheduled.", "category": "First Day"},
        {"id": 2, "question": "How does hybrid work actually work?", "answer": "Each team has 'anchor days' — usually 2-3 days per week in the office. Engineering anchors on Wednesday and Thursday. Remote days are fully flexible. There's no micromanagement.", "category": "Hybrid Work"},
        {"id": 3, "question": "Who should I message first on Slack?", "answer": "Start with #general, #new-joiners, and your team channel (#eng-frontend). For fun, try #random, #pets, and #lunch-plans. Don't worry about being in too many — you can always leave.", "category": "Slack & Communication"},
        {"id": 4, "question": "How do I book a meeting room?", "answer": "Add the meeting room as a 'guest' in your Google Calendar invite. Rooms A–D are on the 2nd floor. Room C has the best natural light. Book at least 30 minutes in advance.", "category": "Meetings"},
        {"id": 5, "question": "Who is my onboarding buddy?", "answer": "Your onboarding buddy is Emily Wong from HR. She's your go-to for any question — even the ones that feel 'too small' to ask. Don't hesitate!", "category": "People"},
        {"id": 6, "question": "Where do I eat lunch?", "answer": "Most people eat in the main kitchen/café area. Snacks are free and refilled on Mondays. Many teams do informal lunch together — just ask in your team's Slack channel.", "category": "Office"},
        {"id": 7, "question": "How do I request time off?", "answer": "Submit requests through the HR Portal under the 'Leave' section. Approvals typically take 1-2 business days. For your first month, just coordinate with your manager directly.", "category": "HR & Admin"},
        {"id": 8, "question": "How do I expense a home office purchase?", "answer": "Submit receipts through Expensify. New hires get up to $500 for home office setup in their first year. Your manager needs to pre-approve purchases over $100.", "category": "HR & Admin"},
        {"id": 9, "question": "Who do I contact for IT support?", "answer": "Post in the #help-it Slack channel or submit a ticket via Jira Service Desk. For urgent laptop issues on day one, find the IT desk on the 1st floor near Reception.", "category": "Slack & Communication"},
        {"id": 10, "question": "Is there a gym or wellness benefit?", "answer": "Yes! Meridian covers up to $50/month for gym or wellness apps. Submit receipts through Expensify under 'Wellness'. There's also a quiet yoga room on the 3rd floor.", "category": "HR & Admin"},
    ]

    for res_data in resources:
        db.add(Resource(**res_data))


# ── Office Locations ──

def _seed_office_locations(db: Session) -> None:
    locations = [
        {
            "id": 1,
            "name": "Reception / Welcome Area",
            "description": "The main arrival point where new hires check in, get greeted, and orient themselves.",
            "tips": json.dumps(["Say hi to Sarah at the front desk!", "First impressions matter!"]),
            "who_you_can_meet": "Office Managers, IT Support (morning shift)",
            "why_it_matters": "Your first impression of the office — and where your badge gets you in.",
        },
        {
            "id": 2,
            "name": "HR Desk / People Ops",
            "description": "The People Ops area for onboarding help, admin questions, and first-day support.",
            "tips": json.dumps(["Ioana Radu sits here — your onboarding buddy.", "Don't hesitate to ask even 'silly' questions."]),
            "who_you_can_meet": "HR Partners, Onboarding Specialists",
            "why_it_matters": "Your home base for all onboarding questions in the first weeks.",
        },
        {
            "id": 3,
            "name": "Engineering Workspace",
            "description": "The main open workspace where product and engineering teams work together.",
            "tips": json.dumps(["Please keep voices low in the deep work zone.", "Standup happens here at 10 AM."]),
            "who_you_can_meet": "Software Engineers, Product Managers, Designers",
            "why_it_matters": "This is the core engine of the company where all the building happens.",
        },
        {
            "id": 4,
            "name": "Meeting Room",
            "description": "A formal room for team meetings, planning sessions, and presentations.",
            "tips": json.dumps(["Book via Google Calendar.", "Room C has the best natural light."]),
            "who_you_can_meet": "Cross-functional teams, Leadership",
            "why_it_matters": "Equipped with screens and whiteboards for collaborative planning and syncs.",
        },
        {
            "id": 5,
            "name": "Collaboration Room",
            "description": "A smaller room for quick syncs, 1:1s, and focused group discussions.",
            "tips": json.dumps(["Book via Slack or Calendar.", "Great for pair programming."]),
            "who_you_can_meet": "Small project groups, Mentors",
            "why_it_matters": "Perfect for ad-hoc brainstorming or private conversations.",
        },
        {
            "id": 6,
            "name": "Kitchen / Coffee Area",
            "description": "The social recharge zone for coffee, snacks, lunch, and casual conversations.",
            "tips": json.dumps(["Snacks refilled on Mondays.", "Microwave rush hour is 12:30 PM.", "Friday lunch is usually team-ordered."]),
            "who_you_can_meet": "Everyone from all departments",
            "why_it_matters": "The best place to meet people outside your team and grab a caffeine boost.",
        },
        {
            "id": 7,
            "name": "Quiet Focus Zone",
            "description": "A low-distraction area for deep work and concentrated solo tasks.",
            "tips": json.dumps(["Use noise-cancelling headphones here.", "Reserve a booth for long focus blocks."]),
            "who_you_can_meet": "Anyone needing deep focus (no talking allowed)",
            "why_it_matters": "When you need to put your head down and crush a task without interruptions.",
        },
        {
            "id": 8,
            "name": "Social Lounge / Break Area",
            "description": "A relaxed space for informal chats, breaks, and decompressing during the day.",
            "tips": json.dumps(["Ping pong tournament on Fridays.", "Great place for informal 1-on-1s.", "Board game night is every other Wednesday."]),
            "who_you_can_meet": "Colleagues taking a break",
            "why_it_matters": "Important for mental health, catching up on life, and building team culture.",
        },
    ]

    for loc_data in locations:
        db.add(OfficeLocation(**loc_data))


# ── HR Action Items ──

def _seed_hr_action_items(db: Session) -> None:
    action_items = [
        {"id": 1, "title": "Diana Pavel needs a buddy", "description": "Starts next week in Marketing. No buddy assigned yet.", "severity": "urgent", "action_label": "Assign Buddy", "status": "open"},
        {"id": 2, "title": "2 tasks overdue for Matei", "description": "First Day phase tasks are still pending.", "severity": "warning", "action_label": "Send Reminder", "status": "open"},
        {"id": 3, "title": "3 feedback check-ins pending", "description": "Week 1 surveys have not been opened.", "severity": "info", "action_label": "Nudge Employees", "status": "open"},
    ]

    for item_data in action_items:
        db.add(HrActionItem(**item_data))
