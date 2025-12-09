# PROJECT_OVERVIEW.md — Session Starter / Continuation Brief

This document is the high-level, always-up-to-date summary of the project.

The human will copy/paste this file at the beginning of new sessions with
ChatGPT, Gemini, Cursor, Bolt, or DeepSeek to provide immediate context.

All agents must keep this file accurate and current.

## 1. Project Name
HYGGE – The Cozy Dating App

## 2. Current Vision / Purpose
A cozy, slow, safe dating app focused on emotional warmth and meaningful connection. Designed to feel like home, with features that encourage depth over speed.

## 3. Key Features / Modules
- **Authentication**: Login screen with Hygge branding.
- **Onboarding**: Multi-step flow capturing "Cozy Vibes", interests, and photos.
- **Discovery**: Tinder-style card deck with smooth animations and cozy details.
- **Matching**: Mutual like logic with AI-generated icebreakers.
- **Chat**: Real-time messaging interface with AI date ideas.
- **Profile**: Editable profile with photo drag-and-drop and specific cozy attributes.
- **Safety**: Robust reporting, blocking, and safety guidelines.

## 4. Current Status
MVP implementation complete using React/TypeScript and Tailwind CSS. The app features a functional mock backend (`services/mockData.ts`) and integrates with Google Gemini for AI features. UI is polished with a specific "Hygge" color palette.

## 5. Active Branches / Environments
- main: Primary development branch.
- dev: N/A
- feature branches: N/A
- deployment notes: Client-side only demo.

## 6. Most Recent Work
- Implemented comprehensive Profile editing (Photos, Bio, Interests).
- Added Safety features (Blocking, Reporting, Guidelines screen).
- Enhanced UI animations for swiping and drag-and-drop.
- Integrated Google Gemini for icebreakers and date ideas.

## 7. Known Issues / Risks
- Data persistence is local-storage based (Mock MVP).
- File uploads are client-side simulations.
- AI features require a valid API key in environment variables.

## 8. Next Intended Actions
- Implement real backend integration (Firebase).
- Add push notifications.
- Refine match algorithm.

## 9. User Feedback Highlights
(Short summary from USER_FEEDBACK.md)

## 10. Last Updated
- Date: 2024-05-22
- By: Gemini
- Summary of change: Initialized continuity documentation and established project overview.
