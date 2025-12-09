# 🎨 Callioo Frontend

A responsive React + Vite frontend for the **Callioo Video Conferencing & Meeting Scheduler** application.

This frontend provides the UI for:

- User login/signup
- Scheduling meetings
- Managing participants
- Joining instant or scheduled meetings
- Communicating with the backend via REST APIs

---

## 🚀 Features

### 🔹 Authentication UI

- Login page
- Signup page
- JWT stored in localStorage
- Redirects based on authentication state

### 🔹 Meeting Scheduling Interface

- Create new meetings
- Select room name, start date, end date, start time
- Add recurring meeting rules (Mon → Sun)
- Add participants through checkboxes
- Prevent scheduling in the past
- Clean validation and alerts

### 🔹 Fetching Data from Backend

The frontend communicates with the backend using:

```js
fetch(`${import.meta.env.VITE_BACKEND_URL}api/...`);
```

### 🔹 Timezone Handling

The browser timezone offset is sent to backend:

```js
new Date().getTimezoneOffset();
```

### 🔹 Environment-based build

Uses Vite environment variables such as:

```
VITE_BACKEND_URL=https://callioo-deployment-latest.onrender.com
```

---

## 🧰 Tech Stack

- **React (with Hooks)**
- **Vite**
- **JavaScript**
- **CSS**
- **HTML**
- **LocalStorage (for JWT + user session)**

---

## 📦 Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

The app will be available at:

```
https://callioo-app.onrender.com
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## 🌍 Environment Variables

Create a `.env` file:

```
VITE_BACKEND_URL=https://callioo-deployment-latest.onrender.com
```

Make sure the value **ends with a slash** (`/`).

---

## 🗂 Folder Structure

```
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── assets/
│   └── App.jsx
│
├── public/
└── index.html
```

---

## 📡 API Usage Example

```js
fetch(`${import.meta.env.VITE_BACKEND_URL}api/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
})
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("jwt", data.jwt);
  });
```

---

## 🧭 Routing

React Router is used for:

- `/` → Login
- `/signup` → Signup
- `/schedule` → ScheduleMeeting
- `/main` → Dashboard
- `/n` → Create new schedule
- `/edit/:id` → Edit schedule
- …additional pages as needed

---

## 🧩 Key Components

### `ScheduleMeeting.jsx`

- Handles meeting form
- Fetches all users
- Adds/removes participants
- Validates date/time
- Sends meeting data to backend

### `Main.jsx`

- Displays dashboard and upcoming meetings
- Links to scheduling interface

### `Login.jsx` / `Signup.jsx`

- Auth forms
- JWT stored in localStorage

---

## ✨ Deployment (Render)

1. Create **Static Site**
2. Set:
   - **Build Command:**
     ```
     npm install && npm run build
     ```
   - **Publish Directory:**
     ```
     dist
     ```
3. Add redirects (create `_redirects` file):

```
/*  /index.html  200
```

4. Set environment variable:

```
VITE_BACKEND_URL=https://callioo-deployment-latest.onrender.com
```

---

## 📄 License

MIT — free to use and modify.

---

## 💬 Contact

For support or feedback, reach out at:

📧 **nallana.anirudh@gmail.com**
