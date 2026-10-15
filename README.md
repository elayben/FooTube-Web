# FooTube — Web Client

The React web client of **FooTube**, a YouTube-style video platform built by a team of three as a Bar-Ilan University Advanced Programming project.

<p align="center">
  <img src="https://raw.githubusercontent.com/elayben/FooTube-CPP-Server/main/wiki/Screenshot_17.png" alt="FooTube video page" width="720">
</p>

## Features

- **Video feed** with thumbnails, channel names and view counts
- **Video page** with player, like / dislike, share, and an "Up Next" list of suggested videos
- **Comments** — add, edit and delete
- **Upload** a new video with title, description and thumbnail
- **Search** across video titles
- **Sign-up flow** in Google-account style: details → email & password → profile image
- **Sign in** with protected routes for logged-in actions
- **Dark mode** toggle

## The FooTube project

| Repository | What it is |
|------------|------------|
| [FooTube-Server](https://github.com/elayben/FooTube-Server) | Node.js + Express REST API with MongoDB; serves the production build of this client |
| **FooTube-Web** (this repo) | React web client |
| [FooTube-Android](https://github.com/elayben/FooTube-Android) | Native Android client (Java) |
| [FooTube-CPP-Server](https://github.com/elayben/FooTube-CPP-Server) | Multithreaded C++ TCP server for video recommendations |

## Tech stack

React 18 · React Router 6 · Create React App · CSS

## Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/elayben/FooTube-Web.git
cd FooTube-Web
npm install
npm start
```

The app opens at **http://localhost:3000** on the video feed. Use **Sign in** at the top right, or register a new user first.

## Project structure

```
src/
├── app/            # App shell, routing, layouts, sign-in / sign-up screens
├── loginSignin/    # Multi-step registration and login layouts
├── videoLogic/     # Feed, player, video info, suggested videos, comments
├── createVideo/    # Upload form
├── search/         # Search bar and results
├── leftMenu/       # Side navigation
└── darkMode/       # Theme toggle
```

## Team

Built by a team of three: one developer owned the video screens on web, one owned the same screens on Android, and one owned login and registration on both platforms. Work was planned and tracked in Jira. [Elay Ben Yehoshua](https://github.com/elayben) was one of the three developers.

The original team repository is [ayalbir/Web](https://github.com/ayalbir/Web).
