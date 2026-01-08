import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Persistence Helper
  const persistUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Also update main users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    
    // Initialize complex fields if missing
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.registeredEvents) user.registeredEvents = [];
    if (!user.jobApplications) user.jobApplications = [];
    if (!user.quizResults) user.quizResults = [];
    
    persistUser(user);
    toast({ title: "Welcome back!", description: `Logged in as ${user.fullName}` });
    return user;
  };

  const signup = async (email, password, role, fullName) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email exists');

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      role,
      fullName,
      profileComplete: false,
      subscriptionStatus: 'free',
      pointsBalance: 0,
      enrolledCourses: [],
      registeredEvents: [],
      jobApplications: [],
      quizResults: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    persistUser(newUser);
    toast({ title: "Account created!", description: "Welcome to CareerBoost" });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({ title: "Logged out" });
  };

  const updateUserProfile = (updates) => {
    persistUser({ ...currentUser, ...updates });
  };

  // Feature Actions
  const enrollCourse = (courseId, paymentStatus = 'free') => {
    if (currentUser.enrolledCourses.find(c => c.courseId === courseId)) return;
    
    const newEnrollment = {
      courseId,
      enrollmentDate: new Date().toISOString(),
      paymentStatus,
      progress: 0,
      completedModules: []
    };
    
    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...currentUser.enrolledCourses, newEnrollment],
      pointsBalance: (currentUser.pointsBalance || 0) + 50
    };
    persistUser(updatedUser);
  };

  const registerEvent = (registrationData) => {
    // Check for duplicates
    if (currentUser.registeredEvents.find(e => e.eventId === registrationData.eventId)) return;

    const updatedUser = {
      ...currentUser,
      registeredEvents: [...currentUser.registeredEvents, registrationData],
      pointsBalance: (currentUser.pointsBalance || 0) + 40
    };
    persistUser(updatedUser);
  };

  const applyJob = (jobId, resumeName) => {
    if (currentUser.jobApplications.find(j => j.jobId === jobId)) return;

    const newApplication = {
      jobId,
      resumeName,
      applicationDate: new Date().toISOString(),
      status: 'Applied'
    };

    const updatedUser = {
      ...currentUser,
      jobApplications: [...currentUser.jobApplications, newApplication],
      pointsBalance: (currentUser.pointsBalance || 0) + 30
    };
    persistUser(updatedUser);
  };

  const submitQuiz = (courseId, score, answers) => {
    const newResult = {
      courseId,
      score, // Percentage
      answers,
      timestamp: new Date().toISOString()
    };
    
    // Update or add quiz result
    const existingResults = currentUser.quizResults || [];
    const otherResults = existingResults.filter(r => r.courseId !== courseId);
    
    const updatedUser = {
      ...currentUser,
      quizResults: [...otherResults, newResult],
      pointsBalance: (currentUser.pointsBalance || 0) + 50 // Bonus points for completing course quiz
    };
    
    persistUser(updatedUser);
  };

  const upgradePremium = (planType) => {
    const updatedUser = {
      ...currentUser,
      subscriptionStatus: 'premium',
      premiumPlan: planType,
      premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // +30 days mock
    };
    persistUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      signup,
      logout,
      updateUserProfile,
      enrollCourse,
      registerEvent,
      applyJob,
      submitQuiz,
      upgradePremium
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
