# Milestonenest

Milestonenest is a comprehensive project management application designed to streamline team collaboration, task tracking, and milestone achievement. It combines a modern, interactive frontend with a robust, real-time backend to deliver a premium user experience.

## 🚀 Features

- **Project Management**: Create and manage multiple projects with ease.
- **Task Tracking**: Kanban-style task boards with drag-and-drop functionality.
- **Milestones**: Track major project goals and deadlines.
- **Real-time Collaboration**: Instant updates on tasks and projects via Socket.io.     
- **Interactive UI**: 3D elements using Three.js and smooth animations with GSAP.
- **Analytics**: Visual dashboards with Recharts for project insights.
- **AI Integration**: AI-powered summaries and assistance (Gemini AI).
- **File Management**: Upload and attach files to tasks (Local/S3).
- **Authentication**: Secure user authentication with JWT and Firebase integration.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: TailwindCSS, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **State Management**: React Context / Hooks
- **Icons**: Lucide React
- **Charts**: Recharts
- **Drag & Drop**: @dnd-kit

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Authentication**: JWT, BCrypt
- **File Storage**: Multer (Local), AWS S3 (Optional)

## 📋 Prerequisites

Before you begin, ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- [Git](https://git-scm.com/)

## Getting Started

Follow these instructions to set up the project locally.
                                                                
### 1. Clone the Repository

```bash
git clone <repository-url>
cd Milstonenenest
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**Configuration:**
Create a `.env` file in the `backend` directory based on `.env.example`.

```env
https://milestonenest.in/
PORT=5000
MONGODB_URI=mongodb://localhost:27017/milestonenest
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

**Start the Backend Server:**

```bash
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the project root (if not already there), and install dependencies:

```bash
# If you are in the backend folder, go back to root
cd ..

# Install dependencies
npm install
```

**Configuration:**
Ensure you have the necessary environment variables in the root `.env` file (e.g., for Firebase or API URLs).

**Start the Frontend Development Server:**

```bash
npm run dev
```
The frontend application will be available at `http://localhost:5173`.

## 🔗 API Documentation

For detailed information about the Backend API endpoints, WebSocket events, and database models, please refer to the [Backend README](./backend/README.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
