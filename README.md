# BookmarkIt

A fullstack personal bookmark manager where you can save, tag, search, and organise links — all in one private workspace.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)

---

## About the Project

BookmarkIt was built as a portfolio project to practise fullstack JavaScript development. The goal was to build a complete web app from scratch — covering authentication, database design, REST API design, and a vanilla JavaScript frontend — without using any frontend frameworks.

---

## Features

- User registration and login with session-based authentication
- Save bookmarks with a title, URL, and tag
- Tag categories: `tool`, `article`, `video`, `reference`
- Mark bookmarks as favourites
- Filter bookmarks by tag or favourite status
- Search bookmarks by title or tag
- Delete bookmarks
- Stats panel showing counts per tag and total saved
- Responsive design — works on desktop and mobile

---

## Tech Stack

**Frontend**
- HTML
- CSS
- Vanilla JavaScript (ES Modules)
- Plus Jakarta Sans (Google Fonts)
- Tabler Icons
- Font Awesome

**Backend**
- Node.js
- Express.js
- express-session (session-based auth)
- bcryptjs (password hashing)
- validator (input validation)

**Database**
- SQLite
- better-sqlite3

**Deployment**
- Render

---

## Deployment

This project is deployed on [Render](https://bookmarkit-5bm9.onrender.com/).
