# SynergySphere Full-Stack Integration Guide

This guide will help you run the complete SynergySphere application with both frontend and backend integrated.

## 🚀 Quick Start

### Option 1: Run Everything at Once (Recommended)
```bash
# Install all dependencies and start both servers
npm run fullstack
```

### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run dev
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud)
- **npm** or **yarn**

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Default connection: `mongodb://localhost:27017/synergysphere`

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get connection string and update `backend/.env`

### 3. Environment Configuration

The setup script will automatically create the necessary environment files:

- **Backend**: `backend/.env` (created from `backend/env.example`)
- **Frontend**: `.env.local` (created automatically)

### 4. Seed Demo Data (Optional)
```bash
npm run backend:seed
```

This creates:
- 5 test users
- 3 sample projects
- 8 tasks with different statuses
- 7 chat messages
- 5 notifications

## 🌐 Application URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api
- **Backend Health**: http://localhost:5000/api/health

## 🔑 Test Accounts

After seeding data, you can use these test accounts:

| Email | Password | Name |
|-------|----------|------|
| john@example.com | password123 | John Doe |
| jane@example.com | password123 | Jane Smith |
| mike@example.com | password123 | Mike Johnson |
| sarah@example.com | password123 | Sarah Wilson |
| alex@example.com | password123 | Alex Brown |

## 🏗️ Architecture Overview

```
Frontend (React + Vite)
├── src/
│   ├── services/
│   │   ├── api.ts          # API service layer
│   │   └── socket.ts       # Socket.io client
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── components/         # UI components

Backend (Node.js + Express)
├── models/                 # Mongoose schemas
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── scripts/                # Utility scripts
└── server.js              # Main server file
```

## 🔌 API Integration

### Authentication
- JWT-based authentication
- Automatic token management
- Socket.io authentication

### Real-time Features
- Live chat messages
- Task updates
- Notifications
- Project member changes

### Data Flow
1. Frontend makes API calls via `apiService`
2. Backend processes requests and updates database
3. Real-time events sent via Socket.io
4. Frontend updates UI based on events

## 🛠️ Development Commands

```bash
# Frontend only
npm run dev

# Backend only
npm run backend

# Backend production
npm run backend:start

# Seed database
npm run backend:seed

# Full-stack development
npm run fullstack

# Build for production
npm run build
```

## 🔍 Troubleshooting

### Common Issues

**1. Backend won't start**
```bash
# Check if MongoDB is running
# Verify .env file exists in backend/
# Check if port 5000 is available
```

**2. Frontend can't connect to backend**
```bash
# Verify backend is running on port 5000
# Check .env.local file exists
# Ensure CORS is properly configured
```

**3. Socket.io connection fails**
```bash
# Check if backend is running
# Verify JWT token is valid
# Check browser console for errors
```

**4. Database connection issues**
```bash
# Verify MongoDB is running
# Check MONGODB_URI in backend/.env
# Test connection string
```

### Debug Mode

Enable debug logging:
```bash
# Backend
cd backend
DEBUG=* npm run dev

# Frontend
npm run dev -- --debug
```

## 📊 Features Implemented

### ✅ Backend Features
- JWT Authentication
- User Management
- Project CRUD Operations
- Task Management with Status Workflow
- Real-time Chat System
- Notification System
- Member Management
- File Upload Support
- Input Validation
- Error Handling
- Rate Limiting
- CORS Protection

### ✅ Frontend Features
- React + TypeScript
- Modern UI with Tailwind CSS
- Real-time Updates
- Authentication Flow
- Project Management
- Task Management
- Chat Interface
- Notification System
- Responsive Design
- Error Handling

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in `.env`
2. Use production MongoDB instance
3. Configure proper CORS origins
4. Use PM2 for process management

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy `dist/` folder to your hosting service
3. Update API URLs for production

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

### Project Endpoints
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Task Endpoints
- `GET /api/projects/:id/tasks` - List project tasks
- `POST /api/projects/:id/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Message Endpoints
- `GET /api/projects/:id/messages` - Get project messages
- `POST /api/projects/:id/messages` - Send message
- `PUT /api/messages/:id` - Edit message
- `DELETE /api/messages/:id` - Delete message

### Notification Endpoints
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🎉 You're Ready!

Once everything is running, you should see:
- Frontend at http://localhost:8080
- Backend API at http://localhost:5000/api
- Real-time features working
- Demo data available for testing

The application is now fully integrated and ready for development!
