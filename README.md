# React Native To-Do App

A simple React Native To-Do List application built using **Expo**, featuring local data persistence, basic authentication, and smooth task management.

---

## Architecture & Approach

This app uses **React Native with Expo** for building the UI and leverages **Redux** for global state management. The app architecture follows a modular component-based structure with the following separation:

- **Screens**: For views like Login, Home, and Add/Edit task.
- **Components**: Reusable UI elements like `Header`, `Todos`, etc.
- **Services**: Logic for interacting with AsyncStorage.
- **State**: Redux for managing the current authenticated user.

**AsyncStorage** is used to persist tasks locally per user. Tasks are filtered and rendered dynamically, and gestures are handled using `react-native-gesture-handler`.

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CarnageX19/todo-app-react-native.git
   cd todo-app-react-native
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the project:**
   ```bash
   npx expo start
   ```

4. **Open in emulator or Expo Go app.**

---

## Features Implemented


#### UI Screens
-  **Login Screen**: Dummy authentication where any non-empty username/password logs the user in. In demo, pre-filled as `dummy` / `dummy`.
-  **Home Screen**: Shows all tasks with filter options (`All`, `Completed`, `Pending`).
-  **Add/Edit Task Screen**: Modal/screen for task creation with form validations.

#### **CRUD Operations**:
  - Create new tasks
  - Read/list tasks
  - Update task status
  - Delete tasks
-  **Task Fields**:
  - Title (required)
  - Description (optional)
  - Completion status via checkbox
-  **Filter tasks** by status (`All`, `Completed`, `Pending`)
-  **Local Storage**: All tasks saved persistently using `AsyncStorage`.
-  **Empty State View**: Shown when no tasks exist.

---

## Bonus Features

-  **Swipeable Delete**: Swipe left on any task to delete using FlatList + gesture handler.
-  **UI Validations**: Ensures task title is not empty during creation/edit.
-  Add due date per task 

---

## 📁 Project Structure

```
.
├── components/
│   ├── Header.js
│   ├── Todos.js
│   ├── Login.js
|   ├── Addtodo.js
|   ├── Homescreen.js
|   ├── Loginscreen.js
|   └── index (to index all components for smaller line for imports)
├── globalstate/
│   ├── store.js
│   └── userSlice.js
├── services/
│   └── storage.js
├── App.js
└── README.md
```

---

## Final Notes

This project serves as a solid base for understanding React Native development with state management and persistent local storage.

