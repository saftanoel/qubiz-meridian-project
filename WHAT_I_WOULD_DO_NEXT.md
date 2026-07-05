# What I Would Do Next

While building Meridian Compass, several ambitious ideas were intentionally left out to ensure the MVP delivered a reliable, full-stack onboarding workflow first. Given more time, here is how I would prioritize future improvements:

## Priority 1 — Features that would fundamentally improve the experience
- **Real Ask Meridian AI Agent**: Upgrade the current searchable FAQ into a real AI assistant using the Gemini API or OpenAI API. It would be connected to trusted internal docs with strict guardrails to answer nuanced questions securely.
- **Admin/Content Editor**: Provide an interface for HR to manage onboarding tasks, FAQs, people, office locations, and buddy assignments without needing developer assistance.
- **Real Authentication and User Accounts**: Replace the demo role switcher with secure login and individualized accounts for every new hire and HR manager.

## Priority 2 — Features that would add significant value
- **Real Slack Integration**: Connect the "Start conversation" action directly to Meridian's Slack workspace.
- **Google Meet/Calendar Integration**: Automate "Coffee chat" scheduling.
- **HR Reminders**: Send automated notifications through email or Slack for pending HR action items.
- **Smarter Employee Matching**: Improve the Connect algorithm to suggest colleagues based on the new hire's pending tasks, department, role, office days, and current onboarding phase.
- **Real Messaging Backend**: Store chat messages in a database rather than relying on `localStorage`.

## Priority 3 — Nice-to-have improvements and why they matter
- **Full Interactive 3D Office Explorer / Onboarding Game**: Use Spline, Three.js, or React Three Fiber to build a virtual office. This matters because it gamifies onboarding and reduces anxiety about navigating the physical space.
- **Colleague Avatars/NPCs**: Add avatars in the 3D office that provide small onboarding tips or tasks when clicked, making the experience more engaging.
- **Onboarding Analytics**: Help HR track bottlenecks and average completion times across cohorts.
- **Expanded Testing**: Add comprehensive Playwright tests and backend unit tests to ensure long-term stability.
- **Production Infrastructure**: Migrate to a production database (like PostgreSQL), add database migrations, and deploy the application to the cloud.
