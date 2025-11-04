import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import AIChatAssistant from './components/AIChatAssistant';
import GamificationManager from './components/GamificationManager';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MBTIAssessment from './pages/MBTIAssessment';
import TKIAssessment from './pages/TKIAssessment';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Badges from './pages/Badges';
import CreativeSurvey from './pages/CreativeSurvey';
import AuthCallback from './pages/AuthCallback';

import './App.css';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Route (redirect to dashboard if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background-primary dark:bg-dark-background-primary flex flex-col transition-colors duration-200">
      <Navigation />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/mbti-assessment" element={
            <ProtectedRoute>
              <MBTIAssessment />
            </ProtectedRoute>
          } />
          <Route path="/tki-assessment" element={
            <ProtectedRoute>
              <TKIAssessment />
            </ProtectedRoute>
          } />
          <Route path="/creative-survey" element={
            <ProtectedRoute>
              <CreativeSurvey />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <CourseCatalog />
            </ProtectedRoute>
          } />
          <Route path="/courses/:courseId" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          <Route path="/badges" element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-heading-xl text-text-primary mb-4">404 - Page Not Found</h1>
                <p className="text-body-md text-text-secondary mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="px-6 py-3 bg-brand-primary text-background-primary rounded-lg hover:bg-brand-hover transition-fast">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>

      <Footer />

      {/* Floating Features for Logged-in Users */}
      {user && (
        <>
          <AIChatAssistant />
          <GamificationManager>{null}</GamificationManager>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;