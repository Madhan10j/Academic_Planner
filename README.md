# Academic Planner with AI - Full Stack Application

## Project Structure
```
academic-planner/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
└── README.md
```

## Backend Implementation

... (truncated for brevity, but will include the full content you provided) ...

# Academic Planner with AI

An intelligent academic planner that helps students organize their study schedules, track deadlines, and get personalized study suggestions using AI.

## 🚀 Features

### Core Features
- **User Profiles** – Basic student info & course list
- **Timetable Creation** – Add classes, assignments, exams
- **Smart Scheduling** – AI suggests optimal study slots
- **Deadline Reminders** – Alerts for upcoming tasks
- **Progress Tracker** – Monitor task completion and study hours
- **AI Tips** – Personalized study tips & productivity insights
- **Calendar View** – Visual planner for day/week/month

### AI Features (Coming Soon)
- Content analysis using NLP
- User preference modelling
- Similarity-based recommendation algorithm

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `config.env.example` to `config.env`
   - Update the values in `config.env`:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/academic-planner
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     NODE_ENV=development
     ```

4. Start MongoDB (if running locally):
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. Start the backend server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🗄️ Database Models

### User
- Basic info (name, email, student ID, major, year)
- Course list
- Study preferences
- Study statistics

### Course
- Course details (code, name, credits, instructor)
- Schedule information
- Difficulty and workload ratings

### Task
- Task details (title, description, type, due date)
- Priority and status tracking
- Estimated vs actual hours
- AI suggestions

### StudySession
- Session tracking (start/end time, duration)
- Productivity and focus ratings
- Study method and location
- Break tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences
- `GET /api/users/stats` - Get user study statistics

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/schedule/weekly` - Get weekly schedule

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Mark task as completed
- `GET /api/tasks/upcoming` - Get upcoming tasks
- `GET /api/tasks/overdue` - Get overdue tasks

### Schedule
- `POST /api/schedule/sessions` - Start a new study session
- `PATCH /api/schedule/sessions/:id/end` - End a study session
- `GET /api/schedule/sessions` - Get study sessions
- `GET /api/schedule/suggestions` - Get AI-powered study suggestions
- `GET /api/schedule/calendar` - Get calendar view data

### Progress
- `GET /api/progress/overview` - Get progress overview
- `GET /api/progress/analytics` - Get detailed analytics
- `GET /api/progress/insights` - Get AI-generated insights
- `GET /api/progress/streak` - Get study streak information

## 🎯 Usage

### Getting Started
1. Register a new account or login with existing credentials
2. Add your courses with schedules
3. Create tasks and assignments
4. Start study sessions to track your progress
5. View analytics and AI insights

### Key Features
- **Dashboard**: Overview of your academic progress
- **Courses**: Manage your course list and schedules
- **Tasks**: Create and track assignments, exams, and projects
- **Schedule**: Plan and track study sessions
- **Progress**: View detailed analytics and insights
- **Profile**: Manage your account settings and preferences

## 🤖 AI Features

The application includes several AI-powered features:

1. **Smart Scheduling**: Suggests optimal study times based on user preferences
2. **Task Prioritization**: Recommends task order based on due dates and difficulty
3. **Productivity Insights**: Analyzes study patterns and provides recommendations
4. **Progress Analytics**: Generates insights from study data
5. **Study Tips**: Provides personalized study advice

## 🔒 Security

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🧪 Testing

To run tests (when implemented):
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/academic-planner/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Basic user authentication
- ✅ Course management
- ✅ Task management
- ✅ Study session tracking
- ✅ Progress analytics

### Phase 2 (Coming Soon)
- 🔄 Advanced AI features
- 🔄 Mobile app
- 🔄 Real-time notifications
- 🔄 Study group features
- 🔄 Integration with learning management systems

### Phase 3 (Future)
- 📋 Advanced NLP for content analysis
- 📋 Machine learning for personalized recommendations
- 📋 Integration with external APIs
- 📋 Advanced analytics and reporting

---
#   A c a d e m i c _ P l a n n e r  
 