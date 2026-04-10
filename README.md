# Project Name: Task Flowboard 

A modern Jira-like task management dashboard built using React. This application helps users manage tasks, track sprint progress, and visualize project status in an intuitive UI.

---

## 📖 Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- Screenshots
- Future Improvements
- Author

---

 📌 Overview

The Task Management Dashboard is designed to help teams organize tasks efficiently. It provides a clear overview of project progress, including total tasks, completed tasks, and tasks in progress.

✨ Features

- 📊 Dashboard with project overview
- ✅ Task tracking (Not Started, In Progress, Completed)
- 📈 Sprint progress visualization
- 🔍 Search functionality
- 🧩 Modular and reusable components
- ⚡ Fast and responsive UI

 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** CSS / Tailwind CSS (if used)
- **State Management:** useState / useReducer
- **Build Tool:** Vite / Create React App

 📂 Project Structure
Task-FlowBoard/
│
├── public/                         # Static files
│   └── index.html
│
├── src/
│
│   ├── assets/                     # Images, icons
│   │   └── avatar.png
│
│   ├── components/                 # Reusable UI components
│   │   ├── TaskCard.tsx            # Task UI component
│   │   ├── Column.tsx              # Kanban column
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── Modal.tsx               # Create/Edit task modal
│   │   ├── UserAvatar.tsx          # User avatar
│   │   └── DragDropWrapper.tsx     # Drag & drop wrapper
│
│   ├── pages/                      # Application pages
│   │   └── Dashboard.tsx           # Main board UI
│
│   ├── context/                    # Global state management
│   │   └── TaskContext.tsx         # Context API with TypeScript types
│
│   ├── types/                      # TypeScript type definitions
│   │   ├── task.types.ts           # Task interfaces
│   │   └── user.types.ts           # User interfaces
│
│   ├── data/                       # Mock data
│   │   ├── tasks.ts                # Initial tasks
│   │   └── users.ts                # Users data
│
│   ├── hooks/                      # Custom hooks
│   │   └── useDragDrop.ts          # Drag & drop logic
│
│   ├── utils/                      # Helper functions
│   │   ├── constants.ts            # Status constants
│   │   └── helpers.ts              # Utility functions
│
│   ├── styles/                     # Global styles
│   │   └── index.css
│
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite config (TS)
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── package.json                    # Dependencies
├── .gitignore
└── README.md   

Clone the repository
git clone https://github.com/yashchavan5/Task-FlowBoard.git
Navigate to project folder
cd Task-FlowBoard
Install dependencies
npm install
Run the project
npm run dev
🌐 Live Demo

👉 https://your-vercel-link.vercel.app

📸 Screenshots

![Dashboard](public/screenshots/dashboard.png)
![Tasks](public/screenshots/tasks.png)
![Settings](public/screenshots/settings.png)

> Replace the placeholder images above with your actual screenshots in `public/screenshots/`.

💡 What I Learned
Building scalable React applications
Managing global state effectively
Implementing drag-and-drop features
Creating smooth UI animations
Designing clean and responsive layouts
🚀 Future Improvements
Add backend (Node.js / Firebase)
Authentication system
Real-time collaboration
Notifications & reminders
🙌 Conclusion

This project helped me understand how real-world task management systems work and improved my frontend development skills. I focused on writing clean code, creating a smooth user experience, and making the application feel professional.

👨‍💻 Author

Yash Chavan

GitHub: https://github.com/yashchavan5


