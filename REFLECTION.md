# Reflection

When I first approached the Meridian Compass project, I started by thinking about the problem from the perspective of a new employee feeling lost before day one. Joining a new company—especially a 200-person hybrid organization—can be overwhelming. The onboarding process is often scattered across endless wikis, disparate tools, and awkward introductions. I wanted to build something that cut through that noise. 

To handle the ambiguity of the prompt, I decided to create a product that directly answers four practical questions every new hire has: *What should I do?*, *Who should I meet?*, *Where should I go?*, and *Who can answer my questions?*

I prioritized building a reliable, end-to-end full-stack workflow over cobbling together flashy but fragile features. The project evolved from what could have been a simple UI prototype into a functional full-stack application with persistent onboarding progress, database-backed directory profiles, and synchronized HR reporting. 

Of course, this required making some deliberate trade-offs. For example, instead of spending days integrating real Slack or Google Calendar APIs, I built simulated communication actions. A local, state-driven chat popup successfully demonstrates the user experience of reaching out to a colleague without the overhead of real integrations. Similarly, rather than fighting with a complex WebGL 3D engine for the office map, I used high-quality generated 2D/3D visual assets combined with HTML/CSS hotspots. This provided an excellent spatial experience while keeping the frontend fast and accessible.

What turned out to be harder than I expected was coordinating the UI polish with the backend data and the relationships between different views (like linking Office Explorer locations to Connect profiles), all while keeping the project scope under strict control. Ensuring that the HR view perfectly reflected the real-time status of the new hire's journey added an unexpected layer of state management complexity.

If I were to start over, the main decision I would make differently is defining the backend data model and relationships thoroughly before generating too much UI mock data. Because I built the frontend with rich mock data first, I had to spend extra time later doing synchronization work to ensure the frontend fallback and the SQLite seed data perfectly mirrored each other. 

Ultimately, this project taught me a lot about myself as a developer. I learned how to manage scope, choose pragmatic solutions, and turn a vague problem into a working product instead of chasing every ambitious idea immediately. 

I am very proud of the final result. I believe Meridian Compass succeeds because it focuses on empathy. It gives new hires the structure and confidence they need to succeed in their first 30 days, while simultaneously helping Meridian's sole HR person manage their workload through automation and clear dashboards.
