# MERN Scalable Auth System

A full-stack authentication and role-based access control (RBAC) system built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a scalable backend architecture with secure JWT authentication and a responsive frontend dashboard.

## 🚀 Features

* **Authentication:** Secure User Registration & Login (Bcrypt password hashing).
* **Security:** JSON Web Token (JWT) implementation for stateless authentication.
* **RBAC (Role-Based Access Control):** distinct `User` and `Admin` roles.
    * **Users:** Can view items.
    * **Admins:** Can Add and Delete items.
* **Frontend:** Built with React (Vite) for fast performance.
* **API Security:** Protected routes via custom Middleware.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT, Bcryptjs

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

## 1. Clone the Repository
```bash
git clone https://github.com/Aditibawiskar/MERN-Scalable-Auth-System.git
cd MERN-Scalable-Auth-System
```
## 2. Backend Setup
Navigate to the backend folder and install dependencies:

```bash

cd backend
npm install
```

Create a .env file in the backend/ directory and add your secrets:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/primetrade_db
JWT_SECRET=your_super_secret_key
```
Start the Server:


```bash

npm run dev
```
(Server will run on http://localhost:5000)


## 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash

cd ../frontend
npm install
```

Start the React App:

```bash

npm run dev
```

## 📈 Scalability Strategy (Assignment Note)
To ensure this system handles high traffic and growth, the following strategies were implemented:
1. Stateless Authentication (JWT): We use JWTs instead of server-side sessions. This makes the backend "stateless," allowing us to scale horizontally by adding multiple server instances behind a Load Balancer without syncing session data
2. Database Optimization:
- Indexing: MongoDB is used with Mongoose schemas. For production, we would add indexes on frequently queried fields (like email and role) to speed up read operations.
- Sharding: For massive datasets, MongoDB supports sharding to distribute data across multiple machines.
3. Frontend Performance: Built using Vite, which ensures faster build times and optimized asset bundling compared to traditional CRA. We can further implement "Lazy Loading" for React components to reduce initial load time.

## 📝 API Documentation
  | Method |	 Endpoint	    |     Description	     |       Access        |
  | :---   |       :---         |        :---            |        :---         | 
  | POST   | /api/auth/register	|  Register a new user	 |       Public        |
  | POST   | /api/auth/login	|  Login and get Token	 |       Public        |
  | GET	   | /api/items	        |   Get all items	     |  Authenticated Users|
  | POST   | /api/items	        |   Add a new item	     |       Admin         |
  | DELETE | /api/items/:id	    |   Delete an item	     |    Admin Only       |

See API_DOCUMENTATION.md for full details.