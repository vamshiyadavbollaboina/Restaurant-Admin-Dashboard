Here is a clean, professional **README.md** for your project.
Copy this into your `README.md` file.

```md
# 🍽️ Restaurant Admin Dashboard

A full-stack Restaurant Admin Dashboard built using the MERN stack.  
It allows restaurant administrators to manage menu items, track orders, and control availability in real-time.

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
- Axios
- Zustand (State Management)
- Tailwind CSS
- Radix UI

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

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
- Filter by category
- Search using text index
- Filter by price range

### 🧾 Order Management
- Create orders
- Auto-generated order number
- Update order status
- Pagination support
- Filter by status

### 🔐 API Features
- RESTful API structure
- MongoDB text search
- Query-based filtering
- Production-ready CORS setup

---

## 📁 Project Structure

```

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

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder:

```

PORT=5000
MONGO_URI=your_mongodb_connection_string

```

---

## 🧪 Run Locally

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

---

## 🌍 Production CORS Configuration

Backend allows:
- localhost (development)
- All vercel.app deployments

This ensures smooth integration between Vercel frontend and Render backend.

---

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
```
