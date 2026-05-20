import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import Settings from './pages/Settings';
import Checkout from './pages/Checkout';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for theme preference
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Check auth status
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            user ? (
              user.role === 'customer' ? <Navigate to="/customer" /> : <Navigate to="/shopkeeper" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
          
          <Route path="/customer" element={
            user && user.role === 'customer' ? 
            <CustomerDashboard user={user} toggleTheme={toggleDarkMode} isDark={darkMode} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } />
          
          <Route path="/shopkeeper" element={
            user && user.role === 'shopkeeper' ? 
            <ShopkeeperDashboard user={user} toggleTheme={toggleDarkMode} isDark={darkMode} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } />

          <Route path="/settings" element={<Settings user={user} toggleTheme={toggleDarkMode} isDark={darkMode} onLogout={handleLogout} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
