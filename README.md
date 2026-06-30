# Waypoint

Waypoint is a custom Version Control System (VCS) web application built to manage repositories, track file versions, manage issues, and view user contribution statistics via an interactive dashboard.

---

## Features

### Core Version Control System (VCS)
* **Custom Git-Like Commands:** Custom core VCS command management.
* **Supabase Cloud Storage:** Code push operations integrated with Supabase Storage buckets.
* **Repository Syncing:** Repository pulling mechanisms to fetch and sync specific commit snapshots.
* **Version Rollback:** Built-in commit reverting capability.
* * **Granular Repository Access Controls:** Built-in authorization mechanics regulating access levels for public and private repositories based on user permissions.

### Backend Architecture
* **Secure Authentication:** User management powered by MongoDB and secured via JWT authentication.
* **Modular Routing & API Design:** Robust controllers and API endpoints handling:
  * Users (Profile tracking, updates, and account deletion).
  * Repositories (Creation, tracking, and sync status).

### Frontend Dashboard
* **User Onboarding:** Responsive custom signup and login workflows.
* **Route Guards:** Protected application pages enforced by client-side routing authentication guards.
* **Interactive Workspace:** Clean navigation sidebar and interactive dashboard.
* **Contribution Heatmap:** Personal profile workspace featuring a visual Git-style activity contribution grid.

---

## Tech Stack

* **Frontend:** React.js, Client-side Router
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT)
* **Database:** MongoDB
* **Cloud Storage:** Supabase Storage Buckets

---



## Project Structure

```text
waypoint/
├── backend/
│   ├── config/
│   │   └── supabase-config.js
│   ├── controllers/
│   │   ├── add.js
│   │   ├── commit.js
│   │   ├── init.js
│   │   ├── issueController.js
│   │   ├── pull.js
│   │   ├── push.js
│   │   ├── repoController.js
│   │   ├── revert.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── authoriseMiddleware.js
│   ├── models/
│   │   ├── issueModel.js
│   │   ├── repoModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── issue.router.js
│   │   ├── main.router.js
│   │   ├── repo.router.js
│   │   └── user.router.js
│   ├── .gitignore
│   ├── hello.txt
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── auth.css
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── dashboard.css
│   │   │   └── user/
│   │   │       ├── HeatMap.jsx
│   │   │       ├── Profile.jsx
│   │   │       └── profile.css
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Routes.jsx
│   │   ├── authContext.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
└── README.md

```


## Future Improvements

* **Branching & Conflict Resolution:** Implement robust branch isolation commands (`checkout`, `branch`) along with automatic merge-conflict highlighting via the web UI during tracking updates.
* **Inline File Viewer:** Integrate a client-side tree view and code visualization element directly inside the repository profile page to allow browsing file contents without local pulling.
* **Real-time Webhook Triggers:** Hook up active listener systems to fire immediate notifications or update the issue pipeline whenever incoming Supabase file pushes modify repository state.
