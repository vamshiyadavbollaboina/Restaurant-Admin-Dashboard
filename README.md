# 🍽️ Restaurant Admin Dashboard

Build a restaurant admin dashboard that allows restaurant owners to manage their menu items, view orders, and track inventory. This project will test your ability to create RESTful APIs, query MongoDB efficiently, implement React best practices, and handle real-world scenarios like search optimization and state management.

---

## 🚀 Live Demo

Frontend (Vercel):  
https://restaurant-admin-dashboard-2lh2.vercel.app

Backend (Render API):  
https://restaurant-admin-dashboard-x4h3.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js
- MongoDB

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📦 Features

### 🍽️ Menu Management
- Add new menu items
- Edit existing items
- Delete items
- Toggle availability
- Filter by price range

### 🧾 Order Management
- Create orders
- Auto-generated order number
- Update order status
- Filter by status

### 🔐 API Features
- RESTful API structure
- MongoDB text search
- Query-based filtering
- Production-ready CORS setup

---
```
## 📁 Project Structure


restaurant-admin-dashboard/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md

```

### 1️⃣ Clone Repository

```

git clone [https://github.com/your-username/restaurant-admin-dashboard.git](https://github.com/your-username/restaurant-admin-dashboard.git)
cd restaurant-admin-dashboard

```

### 2️⃣ Backend Setup

```

cd backend
npm install
npm run dev

```

### 3️⃣ Frontend Setup

```

cd frontend
npm install
npm start

```

Frontend runs on:
```

[http://localhost:3000](http://localhost:3000)

```

Backend runs on:
```

[http://localhost:5000](http://localhost:5000)

```

## 📌 API Endpoints

### Menu

```

GET    /api/menu
GET    /api/menu/search?q=keyword
GET    /api/menu/:id
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id
PATCH  /api/menu/:id/availability

```

### Orders

```

GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id/status

```
---

## 👨‍💻 Author

Developed by Vamshi
