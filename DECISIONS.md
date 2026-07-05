# Decisions

This document outlines the core product, technical, and UX decisions made while building Meridian Compass.

## Product Decisions
- **Included Features**: I built the Dashboard (Compass), Meridian Journey, Meridian Connect, Office Explorer, Ask Meridian, and HR View.
- **Prioritization**: I prioritized features that directly answer a new hire's most pressing questions:
  - *What should I do?*
  - *Who should I meet?*
  - *Where should I go?*
  - *Who can answer my questions?*
- **Out of Scope**: I intentionally left out a real AI agent, real authentication, real Slack/Google Meet integrations, and a full 3D game. The MVP needed to provide a reliable, full-stack onboarding workflow first before overbuilding complex, fragile features.

## Technical Decisions
- **React + TypeScript + Vite**: Chosen for the frontend to ensure a fast, modern development experience with strict type safety and a highly responsive single-page application.
- **FastAPI + SQLite**: Selected for the backend because it provides excellent performance, easy local setup, and requires no external dependencies like PostgreSQL or Docker.
- **Calculated Progress**: Instead of storing a hardcoded percentage for a new hire's progress, it is calculated dynamically from task statuses to ensure a single source of truth.
- **Seeded Database**: The backend automatically seeds the database on startup so the reviewer gets a fully populated app instantly.
- **Playwright Smoke Tests**: A minimal but high-value E2E suite was included to prove that the critical full-stack user flows actually work.

## UX Decisions
- **Friendly Interface**: I chose a warm, friendly UI over a cold corporate dashboard to make the new hire feel welcomed.
- **Role Switcher**: Used a simple UI toggle for the demo to easily switch between New Hire and HR views without dealing with login screens.
- **Office Explorer**: Opted for a 3D/2D image approach with clickable HTML hotspots. This delivers a great spatial experience while remaining fast and performant.
- **Local Chat Popup**: Used as a lightweight interaction for "Start conversation" rather than setting up complicated webhooks.
- **Ask Meridian**: Built as a searchable FAQ to serve as a reliable MVP instead of risking AI hallucinations.
- **Visual Iteration**: The application's UI evolved significantly. Iterative visual feedback refined the sidebar, cards, contrast, Connect filters, Office Explorer layout, and typography during development.
