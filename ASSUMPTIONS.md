# Assumptions

To build a focused and effective MVP for Meridian Compass, several foundational assumptions were made regarding the company, the users, and the context of the project.

## About the users
- **Primary user**: George, a new employee. He has minimal information before day one—essentially just an email saying "Welcome, see you on Monday."
- **Secondary user**: The single HR person managing onboarding.
- **Colleagues**: Other employees appear through the Meridian Connect directory and Office Explorer.
- The application is intended to be immediately useful before the first day and throughout the entire first month.

## About the data
- In a real-world scenario, HR or admins would normally enter the onboarding tasks, FAQ resources, employee profiles, office locations, and buddy assignments into a CMS or admin panel.
- For this MVP, the database is seeded locally on startup. The app assumes this initial data is mostly correct.
- Progress is based on calculated task statuses, not hardcoded stored percentages.
- If the backend data is missing or unavailable, frontend fallback data prevents the app from crashing and ensures a smooth demo experience.

## About the context
- Meridian is a 200-employee company operating in a strict hybrid work model (3 days in the office, 2 days remote).
- The company has five departments: Engineering, Sales, Marketing, HR, and Finance.
- Meridian uses Slack and Google Meet as primary internal communication tools.
- The company hires 2–3 new people per month, managed entirely by a single HR person.
- Full authentication and external integrations (like a real Slack API connection) are considered outside the scope of this MVP.
- The Office Explorer uses generated 2D/3D images with interactive hotspots rather than a true real-time 3D engine to keep the application lightweight.
