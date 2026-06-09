React Terminal To-Do (Ink)

This is a small React (Ink) CLI to-do application that runs in your terminal and calculates total and completed estimated hours.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the app:

```powershell
npm start
```

Usage

- Press `a` to add a task. When prompted, enter: `Task title | hours` (e.g. `Write tests | 2.5`).
- Press `t` to toggle a task's done state. When prompted, enter the task number.
- Press `c` to clear all tasks.
- Press `q` to quit.

Files added

- `package.json` — project manifest
- `index.js` — entry that renders the Ink app
- `src/App.js` — the Ink React app
- `README.md` — this file

Notes

This app uses `ink` and `ink-text-input`. If you want to package as a global CLI, update `package.json` accordingly.
