#  Library Management System API

A simple, beginner-friendly RESTful API built with **Node.js** and **Express.js** to manage users, books, subscriptions, and fine calculations in a library.

This project is perfect for learning the core concepts of Express.js, routing, handling HTTP requests (GET, POST, PUT, DELETE), and working with JSON data locally.

##  Features

- **User Management**: Register new users, fetch details, update user information, and delete users.
- **Book Management**: Add new books, view all books, update book details, and delete books.
- **Library Operations**: 
  - Track which books are currently issued.
  - View subscription details of users.
- **Automated Fine & Subscription Calculation**:
  - Calculates subscription expiration based on user plan (`Basic`: 3 Months, `Standard`: 6 Months, `Premium`: 12 Months).
  - Automatically calculates fines if a user misses their book return date or subscription renewal date.

##  Tech Stack

- **JavaScript (ES6+)**
- **Node.js**
- **Express.js**

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone https://github.com/Thanuja-coder/library-management-system.git
   cd library-management-system
   ```

2. **Install Dependencies**:
   The project uses `express` and `nodemon` (for auto-restarting the server during development).
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The server will start running on `http://localhost:8081`.

## 📖 API Endpoints Reference

### 🧑‍🤝‍🧑 Users (`/users`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/users` | Get a list of all users in the system. |
| **POST** | `/users` | Register/Create a new user. |
| **GET** | `/users/:id` | Get details of a specific user by their ID. |
| **PUT** | `/users/:id` | Update data of an existing user by their ID. |
| **DELETE** | `/users/:id` | Delete a user from the system by their ID. |
| **GET** | `/users/subscription-details/:id` | Get user's subscription status, days left, and fine amounts. |

###  Books (`/books`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/books` | Get a list of all books in the library. |
| **POST** | `/books` | Add a new book to the library. |
| **GET** | `/books/:id` | Get details of a specific book by its ID. |
| **PUT** | `/books/:id` | Update details of an existing book by its ID. |
| **DELETE** | `/books/:id` | Delete a book by its ID. |
| **GET** | `/books/issued` | Get a list of all currently issued books and their issuers. |
| **GET** | `/books/issued/withFine` | Get all issued books along with any calculated fines. |

##  Subscription & Fine Logic

### Subscription Types
- **Basic**: Valid for 3 Months (90 days)
- **Standard**: Valid for 6 Months (180 days)
- **Premium**: Valid for 12 Months (365 days)

### Fines
- If a user misses their **book return date** (but subscription is active): Fine is **Rs 100**.
- If a user misses their **subscription renewal date** (but returned the book on time): Fine is **Rs 100**.
- If a user misses **both** the renewal date and the return date: Fine is **Rs 200**.

##  Project Structure

```text
library-management-system/
├── Routes/
│   ├── books.js         # Routes and logic for books endpoints
│   └── users.js         # Routes and logic for users endpoints
├── data/
│   ├── books.json       # Mock JSON database for books
│   └── users.json       # Mock JSON database for users
├── index.js             # Entry point of the Express server
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---
*Created as a beginner project to master the fundamentals of Javascript and Express APIs!*
