import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Feature imports
import {
  StudentDashboard,
  BrowseCoaches,
  BookCoach,
  StudentAppointments,
  StudentProfile,
  StudentLayout
} from './features/student';
import {
  CoachDashboard,
  CoachAvailability,
  CoachAppointments,
  CoachProfile,
  CoachLayout
} from './features/coach';
import { AdminDashboard } from './features/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student routes with shared layout */}
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/browse-coaches" element={<BrowseCoaches />} />
          <Route path="/student/appointments" element={<StudentAppointments />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/book/:coachId" element={<BookCoach />} />
        </Route>

        {/* Coach routes with shared layout */}
        <Route element={<CoachLayout />}>
          <Route path="/coach/dashboard" element={<CoachDashboard />} />
          <Route path="/coach/availability" element={<CoachAvailability />} />
          <Route path="/coach/appointments" element={<CoachAppointments />} />
          <Route path="/coach/profile" element={<CoachProfile />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;