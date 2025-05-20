# 📝 Advanced Task Manager App

A powerful and user-friendly Task Manager built with **React.js (Vite)**. This app goes beyond the basics with modern React practices and clean UI/UX, offering robust task management along with advanced features like theming, animations, responsive design, and drag-and-drop functionality.

---

## 🚀 Features

### ✅ Basic Task Management
- **Add Tasks** – Create new to-do items.
- **Mark as Completed** – Toggle task completion status.
- **Delete Tasks** – Remove tasks permanently.
- **Filter Tasks** – View All / Completed / Pending tasks.
- **Persistent Storage** – Tasks are saved in **Local Storage** for session persistence.

---

### ⚛️ Advanced React Features
- **Custom Hook: `useLocalStorage`**  
  Abstracted logic to read/write data from `localStorage` easily and efficiently.

- **React Context API**  
  Shared task data across components without prop drilling.

- **Performance Optimization**  
  - `React.memo` for preventing unnecessary re-renders  
  - `useCallback` and `useMemo` for optimizing rendering and computations

- **Form Validation**  
  Prevents adding empty or whitespace-only tasks.

---

### 🎨 Advanced CSS Features
- **Theming Support**  
  Toggle between **Light Mode** and **Dark Mode** for better accessibility and UX.

- **CSS Animations**  
  Smooth transitions when adding or removing tasks.

- **Responsive Design**  
  Fully functional and optimized for mobile, tablet, and desktop.

- **Drag-and-Drop Support**  
  Rearrange tasks using touch or mouse interactions with **@dnd-kit** for a better UX.

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── TaskItem.jsx
│   └── TaskList.jsx
├── context/
│   └── taskContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
└── main.jsx
