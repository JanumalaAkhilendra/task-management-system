# Task Management System

A full-stack task management application built with **Next.js** (frontend) and **Express + Prisma** (backend).

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Tasks can be in PENDING, IN_PROGRESS, or COMPLETED states
- **Responsive UI**: Built with Tailwind CSS for a modern look
- **Secure Backend**: Express server with authentication middleware
- **Database**: PostgreSQL with Prisma ORM

## 📁 Project Structure

```
task-management-system/
├── backend/                 # Express + Prisma API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth & error handling
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── package.json
│
└── frontend/                # Next.js React app
    ├── app/                # Next.js app directory
    ├── components/         # React components
    ├── contexts/           # React contexts
    ├── lib/                # Utility functions
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Prisma** as ORM
- **PostgreSQL** for database
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **Next.js 14** with App Router
- **React 18** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** for API calls

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

## 🚀 Getting Started

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"
   DIRECT_URL="postgresql://user:password@localhost:5432/taskdb"
   JWT_ACCESS_SECRET="your-secret-key"
   JWT_REFRESH_SECRET="your-refresh-secret-key"
   PORT=5000
   NODE_ENV=development
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Tasks
- `GET /tasks` - Get all user tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🔐 Security Notes

- JWT tokens are stored in secure HTTP-only cookies
- Passwords are hashed with bcrypt
- CORS is configured for frontend origin
- Environment variables must be kept secret

## 📝 Available Scripts

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio UI
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure credentials are correct

### CORS Errors
- Verify FRONTEND_URL is set correctly in backend
- Check that frontend URL matches CORS origin in `server.ts`

### Missing Dependencies
- Run `npm install` in both backend and frontend directories
- Clear node_modules and reinstall if issues persist

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit pull requests.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.
