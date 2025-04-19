# GoInvesto Backend

This is the backend API server for GoInvesto built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set environment variables:

- `MONGO_URI` - MongoDB connection string (default: mongodb://localhost:27017/goinvesto)
- `JWT_SECRET` - Secret key for JWT tokens

3. Run the server:

```bash
node server.js
```

The server will run on port 5000 by default.

## API Endpoints

- `/api/auth` - Authentication (signup, login)
- `/api/profile` - Profile management for startup, investor, incubator
- `/api/posts` - Common posts feed
- `/api/events` - Incubator events
- `/api/notifications` - Notifications between users

## Notes

- Authentication uses JWT tokens.
- Role-based access control is implemented in routes.
- MongoDB is used as the database.
