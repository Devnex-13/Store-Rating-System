# 🏪 Store Rating System

A modern **Full Stack Store Rating System** built using **React, Node.js, Express.js, and MySQL**. The application enables users to discover stores, submit ratings, and allows administrators and store owners to efficiently manage users, stores, and ratings through dedicated dashboards.

---

# 🚀 Features

## 👨‍💼 Admin

* Secure Admin Login
* Dashboard with Statistics
* Create New Users
* Delete Users
* Create New Stores
* Delete Stores
* Search Users
* Search Stores
* View Total Users
* View Total Stores
* View Total Ratings

---

## 👤 User

* User Registration
* Secure Login
* Browse All Stores
* Search Stores
* Submit Rating
* Update Existing Rating
* View Store Average Rating
* Responsive Store Cards

---

## 🏪 Store Owner

* Secure Login
* Owner Dashboard
* View Assigned Store
* View Average Rating
* View Total Ratings
* View Customer Ratings

---

# 🔑 Test Credentials

## Admin

Email: admin@gmail.com
Password: Dev@12345

---

## Store Owner

Email: owner@gmail.com
Password: Owner@123

---

## User

Email: dev@gmail.com
Password: Dev@12345

## 🔐 Authentication & Security

* JWT Authentication
* Role-Based Authorization
* Password Hashing using bcrypt
* Protected Routes
* Secure API Access

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Hook Form
* React Toastify
* React Icons

## Backend

* Node.js
* Express.js
* MySQL
* JWT
* bcrypt

---

# 📂 Project Structure

```
Store-Rating-System
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── screenshots
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
|
├── database.sql
|
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Devnex-13/Store-Rating-System.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🗄 Database

Import the provided MySQL database.

Configure your backend `.env` file:

```env
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=store_rating

JWT_SECRET=your_secret_key
```

---

# 📸 Application Screenshots

## Login Page

![Login](./public/screenshot/login.png)

---

## Register Page

![Register](./public/screenshot/Register.png)

---

## Admin Dashboard

![Admin Dashboard](./public/screenshot/AdminDashBoard.png)

---

## User Dashboard

![User Dashboard](./public/screenshot/UserDashboard.png)

---

## Owner Dashboard

![Owner Dashboard](./public/screenshot/OwnerDashboard.png)

---

# 📌 API Endpoints

## Authentication

```
POST /register

POST /login
```

---

## Admin

```
GET /admin/dashboard

GET /admin/users

POST /admin/users

DELETE /admin/users/:id
```

---

## Stores

```
GET /stores

GET /stores/admin

POST /stores

DELETE /stores/:id
```

---

## Ratings

```
POST /ratings

PUT /ratings/:id
```

---

# ✨ Highlights

* Modern Responsive UI
* JWT Authentication
* Role-Based Access Control
* CRUD Operations
* Store Rating System
* Search Functionality
* Dashboard Analytics
* Responsive Tables
* Toast Notifications
* Professional UI Design

---

# 🔮 Future Improvements

* Edit User
* Edit Store
* Profile Management
* Password Reset
* Email Verification
* Pagination
* Dark Mode
* Dashboard Charts
* Image Upload for Stores

---

# 👨‍💻 Developer

**Devanshu Pote**

B.Tech Computer Technology

React • Node.js • Express.js • MySQL • JavaScript

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📜 License

This project is developed for educational and portfolio purposes.