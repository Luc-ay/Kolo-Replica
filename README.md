# Kolo App Backend

This is the backend API for the **Kolo App**, a financial tracking application that allows users to monitor income, expenses, and balances from multiple bank accounts in one place. The backend is built using **Node.js, Express, MongoDB**, and **Google OAuth** for authentication.

## Features

- **Google OAuth Authentication** (Sign in with Google)
- **User Management** (Sign up & Login using Google)
- **Bank Account Linking** (Add multiple bank accounts)
- **Transaction Tracking** (Fetch and categorize transactions from email/SMS alerts)
- **Financial Analytics** (Track daily, weekly, and monthly expenses)
- **Secure API** (JWT authentication & middleware security)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Google OAuth, JWT
- **Middleware:** CORS, Helmet, Compression, Morgan

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── connectDB.js  # Database connection
│   │   ├── passport.js   # Google OAuth setup
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── bank.controller.js
│   │   ├── transaction.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT Authentication
│   ├── models/
│   │   ├── user.model.js
│   │   ├── bank.model.js
│   │   ├── transaction.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── bank.routes.js
│   │   ├── transaction.routes.js
│   ├── server.js
├── .gitignore
├── package.json
├── README.md
```

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/kolo-app-backend.git
cd kolo-app-backend/backend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend/` directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```sh
npm start
```

The server will run at `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint                    | Description                            |
| ------ | --------------------------- | -------------------------------------- |
| GET    | `/api/auth/google`          | Redirects to Google for authentication |
| GET    | `/api/auth/google/callback` | Handles Google OAuth callback          |
| GET    | `/api/auth/logout`          | Logs out the user                      |

### Users

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/users/me` | Get logged-in user profile |

### Banks

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/api/banks/add` | Add a new bank account        |
| GET    | `/api/banks/`    | Get user-linked bank accounts |

### Transactions

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| GET    | `/api/transactions/`        | Fetch all transactions   |
| GET    | `/api/transactions/daily`   | Get today's transactions |
| GET    | `/api/transactions/weekly`  | Get weekly transactions  |
| GET    | `/api/transactions/monthly` | Get monthly transactions |

## License

This project is licensed under the MIT License.
