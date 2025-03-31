import Navbar from './components/Navbar'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Homepage from './pages/Homepage.jsx'

import { Routes, Route, Navigate } from 'react-router-dom'
import { Hatch } from 'ldrs/react'
import 'ldrs/react/Hatch.css'
import { Toaster } from 'react-hot-toast'

import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Hatch size={65} stroke={8} speed={4.5} color='white'/>
    </div>
  );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to = "/login" />} />
        <Route path="/signup" element={!authUser ? <Signup />  : <Navigate to = "/" />} />
        <Route path="/login" element={!authUser ? <Login />  : <Navigate to = "/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile />  : <Navigate to = "/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App
