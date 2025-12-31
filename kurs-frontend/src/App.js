import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminCoursePage from './pages/AdminCoursePage';
import StudentCoursePage from './pages/StudentCoursePage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MyCourses from './pages/MyCourses';
import Navbar from './components/Navbar';
import CourseContent from './pages/CourseContent';


const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
     
      <Navbar /> 
      
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/course-content/:id" element={<CourseContent />} />

        
        <Route path="/" element={<HomePage />} />
        <Route path="/my-courses" element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        } />
        
        
        <Route path="/admin-panel" element={
          <ProtectedRoute allowedRole="admin">
            <AdminCoursePage />
          </ProtectedRoute>
        } />

        
        <Route path="/courses" element={
          <ProtectedRoute allowedRole="student">
            <StudentCoursePage />
          </ProtectedRoute>
        } />

        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;