import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleGuard from '@/components/RoleGuard';
import Layout from '@/components/Layout';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ProfileSetup from '@/pages/ProfileSetup';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import CoursePlayer from '@/pages/CoursePlayer';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import Rewards from '@/pages/Rewards';
import Premium from '@/pages/Premium';
import PaymentHistory from '@/pages/PaymentHistory';
import Progress from '@/pages/Progress';
import SponsorDashboard from '@/pages/SponsorDashboard';
import AdminPortal from '@/pages/AdminPortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/profile-setup" element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <Layout><Courses /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <Layout><CourseDetail /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses/:id/learn" element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          } />
          
          <Route path="/jobs" element={
            <ProtectedRoute>
              <Layout><Jobs /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/jobs/:id" element={
            <ProtectedRoute>
              <Layout><JobDetail /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/events" element={
            <ProtectedRoute>
              <Layout><Events /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/events/:id" element={
            <ProtectedRoute>
              <Layout><EventDetail /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/rewards" element={
            <ProtectedRoute>
              <Layout><Rewards /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/premium" element={
            <ProtectedRoute>
              <Layout><Premium /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/payment-history" element={
            <ProtectedRoute>
              <Layout><PaymentHistory /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/progress" element={
            <ProtectedRoute>
              <Layout><Progress /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/sponsor-dashboard" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['Sponsor']}>
                <Layout><SponsorDashboard /></Layout>
              </RoleGuard>
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['Admin']}>
                <Layout><AdminPortal /></Layout>
              </RoleGuard>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
