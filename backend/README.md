# Task Management System - Backend API

Express.js + Prisma backend for the Task Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your PostgreSQL credentials

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:5000`

## 📚 API Routes

### Authentication (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with credentials
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Tasks (`/tasks`)
- `GET /tasks` - Get all user tasks (requires auth)
- `POST /tasks` - Create new task (requires auth)
- `PUT /tasks/:id` - Update task (requires auth)
- `DELETE /tasks/:id` - Delete task (requires auth)

## 🔧 Available Scripts

```bash
npm run dev              # Start with hot reload (uses nodemon)
npm run build            # Compile TypeScript to JavaScript
npm start                # Run compiled JavaScript
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run pending migrations
npm run prisma:studio    # Open Prisma Studio
```

## 📁 Project Structure

```
src/
├── controllers/        # Request handlers
├── middleware/         # Auth & error handling
├── routes/            # Route definitions
└── server.ts          # Express app initialization
prisma/
├── schema.prisma      # Database schema
└── migrations/        # Migration files
```

## 🔐 Authentication

- Uses JWT for token-based authentication
- Access tokens stored in HTTP-only cookies
- Passwords hashed with bcrypt
- Refresh tokens for token renewal

## 📖 Environment Variables

```env
DATABASE_URL=          # PostgreSQL connection string
DIRECT_URL=            # Direct PostgreSQL connection
JWT_ACCESS_SECRET=     # Secret for access token signing
JWT_REFRESH_SECRET=    # Secret for refresh token signing
PORT=                  # Server port (default: 5000)
NODE_ENV=              # Environment (development/production)
FRONTEND_URL=          # Frontend origin for CORS
```

## 🗄️ Database

PostgreSQL with Prisma ORM.

**Models:**
- **User**: email, name, password, refreshToken, tasks
- **Task**: title, description, status, userId, timestamps
- **Status**: PENDING, IN_PROGRESS, COMPLETED

## 🛡️ Middleware

- **CORS**: Configured for frontend origin
- **Auth**: JWT validation for protected routes
- **Error Handler**: Global error handling middleware

## 📝 Error Handling

All errors return JSON responses with:
- `message`: Error description
- `status`: HTTP status code
- `data`: Additional error details (if applicable)

## 🐛 Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL is running
- Verify DATABASE_URL credentials
- Check network connectivity

### Migration Issues
- Run `npm run prisma:migrate -- --force` to force migration
- Check `prisma/migrations/` for migration files

### Port Already in Use
- Change PORT in `.env`
- Or kill process using the port

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Guide](https://jwt.io/introduction)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
