![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-yellow)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

# 🎫 TicketMaster - Event Ticketing System

A full-stack application for browsing events, booking tickets, and managing orders and payments, built using **React.js**, **Express.js**, and **MongoDB**.

---

# 🔑 Features

- 📲 Browse event categories and available events
- 🚪 Book and purchase event tickets
- 💼 Manage orders and payment history
- 🔒 Secure user session management with cookies and MongoDB
- 🌎 Responsive design powered by Bootstrap and React-Bootstrap
- 💪 Full-stack integration using Node.js APIs and MongoDB

---

# 🔧 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React.js, React Router DOM, Axios, Bootstrap 5 |
| Backend      | Node.js, Express.js |
| Database     | MongoDB (Mongoose) |
| DevOps       | Localhost (Optional Render deployment) |

---

# 🚀 Getting Started

## 1. Clone the Repo
```bash
git clone https://github.com/your-username/ticketmaster.git
cd ticketmaster
```

## 2. Setup the Backend
```bash
cd backend
npm install

# Create a `.env` file inside backend/ with:
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your_session_secret_here
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

npm start
```
Backend will run on **http://localhost:3001**

## 3. Setup the Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on **http://localhost:3000**

## 4. Access the App
Open your browser at [http://localhost:3000](http://localhost:3000)

---

# 🎥 Demo Video

Watch a live walkthrough here:  
[🎥 Watch Demo](https://youtu.be/3IRZI2SqN0Q)

---

## 📸 Screenshots

| Home Page | Event Listings |
|:---------:|:--------------:|
| ![Home](./screenshots/Screenshot%202025-04-26%20080136.png) | ![Events](./screenshots/Screenshot%202025-04-26%20080209.png) |

| Booking Page | Payment Confirmation |
|:------------:|:--------------------:|
| ![Booking](./screenshots/Screenshot%202025-04-26%20080229.png) | ![Payment](./screenshots/Screenshot%202025-04-26%20080250.png) |


---

# 🧭 Key Pages

| URL Path         | Description                  |
|------------------|-------------------------------|
| `/`              | Home Page (Event categories)  |
| `/events/:id`    | View detailed event information |
| `/login`         | User Login page               |
| `/register`      | User Registration page        |
| `/profile`       | Manage personal profile       |
| `/orders`        | View past ticket orders        |

# 📌 Planned Enhancements

- 🔐 Implement JWT-based secure authentication
- 💳 Integrate Stripe API for payment processing
- 📱 Build a fully responsive mobile version
- 🛒 Improve shopping cart for multi-ticket booking
- 🌍 CI/CD automatic deployment via Render or Railway



# 👨‍💻 Developer

**Moustafa Obari**  
Software Engineer | Full-Stack Developer | Cloud & Database Enthusiast  
📧 moustafaobari@gmail.com  
🔗 GitHub • LinkedIn

---

✨ _"Streamlining event experiences through clean architecture and powerful integrations."_
