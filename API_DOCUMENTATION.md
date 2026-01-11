# API Documentation

Base URL: `http://localhost:5000/api`

## 1. Authentication

### Register User
* **Endpoint:** `POST /auth/register`
* **Description:** Creates a new user account.
* **Body:**
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "user" 
    }
    ```
    *(Note: role can be "user" or "admin")*

### Login User
* **Endpoint:** `POST /auth/login`
* **Description:** Authenticates user and returns a JWT Token.
* **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
* **Response:** Returns `{ "token": "...", "role": "..." }`

---

## 2. Items (CRUD Operations)
*Headers Required:* `Authorization: Bearer <your_jwt_token>`

### Get All Items
* **Endpoint:** `GET /items`
* **Access:** Public (Authenticated Users)
* **Description:** Returns a list of all items.

### Add Item
* **Endpoint:** `POST /items`
* **Access:** **Admin Only**
* **Body:**
    ```json
    {
      "name": "Gaming Laptop",
      "description": "High performance machine",
      "price": 1200
    }
    ```

### Delete Item
* **Endpoint:** `DELETE /items/:id`
* **Access:** **Admin Only**
* **Description:** Deletes an item by its ID.