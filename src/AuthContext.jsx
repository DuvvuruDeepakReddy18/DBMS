import React, { createContext, useContext, useEffect, useState } from "react";

/* -------------------- Context -------------------- */
const AuthContext = createContext(null);

/* -------------------- Hook -------------------- */
export const useAuth = () => {
  return useContext(AuthContext);
};

/* -------------------- Provider -------------------- */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Load user from localStorage ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("careerboost_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* ---------- Helpers ---------- */
  const saveUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("careerboost_user", JSON.stringify(user));
  };

  /* ---------- Auth Actions ---------- */
  const signup = async (email, password, role, fullName) => {
    const newUser = {
      id: Date.now(),
      email,
      role,
      fullName,
      profileComplete: false,
      enrolledCourses: [],
      registeredEvents: [],
      jobApplications: [],
      quizResults: [],
      subscriptionStatus: "free",
      premiumPlan: null,
      premiumExpiry: null,
      pointsBalance: 0,
    };

    saveUser(newUser);
    return newUser;
  };

  const login = async (email, password) => {
    const storedUser = localStorage.getItem("careerboost_user");
    if (!storedUser) throw new Error("No user found");

    const user = JSON.parse(storedUser);
    if (user.email !== email) throw new Error("Invalid credentials");

    saveUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("careerboost_user");
    setCurrentUser(null);
  };

  /* ---------- Profile ---------- */
  const updateUserProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    saveUser(updatedUser);
  };

  /* ---------- Courses ---------- */
  const enrollCourse = (courseId, type) => {
    const updatedUser = {
      ...currentUser,
      enrolledCourses: [
        ...(currentUser.enrolledCourses || []),
        {
          courseId,
          type,
          enrollmentDate: new Date().toISOString(),
          completedModules: [],
        },
      ],
    };
    saveUser(updatedUser);
  };

  /* ---------- Quiz ---------- */
  const submitQuiz = (courseId, percentage, answers) => {
    const updatedUser = {
      ...currentUser,
      quizResults: [
        ...(currentUser.quizResults || []),
        {
          courseId,
          percentage,
          answers,
          submittedAt: new Date().toISOString(),
        },
      ],
      pointsBalance: (currentUser.pointsBalance || 0) + 100,
    };
    saveUser(updatedUser);
  };

  /* ---------- Events ---------- */
  const registerEvent = (eventData) => {
    const updatedUser = {
      ...currentUser,
      registeredEvents: [
        ...(currentUser.registeredEvents || []),
        {
          ...eventData,
          registeredAt: new Date().toISOString(),
        },
      ],
      pointsBalance: (currentUser.pointsBalance || 0) + 50,
    };
    saveUser(updatedUser);
  };

  /* ---------- Jobs ---------- */
  const applyJob = (jobId, resumeName) => {
    const updatedUser = {
      ...currentUser,
      jobApplications: [
        ...(currentUser.jobApplications || []),
        {
          jobId,
          resume: resumeName,
          appliedAt: new Date().toISOString(),
        },
      ],
      pointsBalance: (currentUser.pointsBalance || 0) + 30,
    };
    saveUser(updatedUser);
  };

  /* ---------- Premium ---------- */
  const upgradePremium = (plan) => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    const updatedUser = {
      ...currentUser,
      subscriptionStatus: "premium",
      premiumPlan: plan,
      premiumExpiry: expiry.toISOString(),
    };
    saveUser(updatedUser);
  };

  /* ---------- Context Value ---------- */
  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUserProfile,
    enrollCourse,
    submitQuiz,
    registerEvent,
    applyJob,
    upgradePremium,
  };

  /* ---------- Render ---------- */
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
