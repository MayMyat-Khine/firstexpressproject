# Retail Management API

Backend learning project built with Express.js and MongoDB.

---

## Purpose

This project was created to practice backend development concepts using Express.js.

The focus is on:

- Express.js
- MongoDB
- Mongoose
- Layered Architecture
- Validation
- Error Handling
- CRUD APIs
- Order & Stock Management

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator

---

## Folder Structure

```
controllers/
services/
repositories/
mongoose/
middlewares/
routes/
utils/
enums/


---

## Features

### Auth

- Login

### User(For Employee)

- Create User
- Read all Users
- Read User By UserID
- Update User
- Delete User

### Customer 

- Create

### Branch

- Create Branch
- Read all Branches
- Read Branch by BranchID
- Update Branch
- Delete Branch

### Product

- CRUD Product
- Read Products By Branch
- Product belongs to multiple branches

### Stock

- Update Stock per product per branch

### Transfer Products between Branches

- Create Transfer Products
- Get All Transfer Records

### Order

- Create Order
- Validate Products
- Check Stock
- Calculate Total
- Deduct Stock
- Read all orders
- Read Orders by Branch
- Update Order

---

## Project Architecture

```
Request
    │
Router
    │
Validation
    │
Controller
    │
Service
    │
Repository
    │
MongoDB
```

---

## Installation

```bash
git clone https://github.com/MayMyat-Khine/firstexpressproject

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file.

```
PORT=3000

MONGO_URI=mongodb://127.0.0.1:27017/retail_db
```

---

## Future Improvements

- Change Response data (not to include some fields like ObjectID)
- JWT Authentication
- Authorization
- Pagination
- Unit Testing
- Update Order with Products
- Swagger Documentation

---

## Learning Goals

This project is for learning backend architecture and practices rather than production use.