import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { Users, UserCheck, Home, LogOut, Moon, Sun } from 'lucide-react';
import GestionAlumnos from './components/GestionAlumnos';
import RegistrarAsistencia from './components/RegistrarAsistencia';
import HomePage from './components/HomePage';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gestion-alumnos" element={<GestionAlumnos />} />
            <Route path="/asistencia" element={<RegistrarAsistencia />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
          <div className="container mx-auto">
            <ul className="flex justify-center space-x-8">
              <li>
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  <Home className="mb-1" />
                  <span className="text-xs">Inicio</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/gestion-alumnos" className={({ isActive }) => `flex flex-col items-center transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  <Users className="mb-1" />
                  <span className="text-xs">Alumnos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/asistencia" className={({ isActive }) => `flex flex-col items-center transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  <UserCheck className="mb-1" />
                  <span className="text-xs">Asistencia</span>
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                  <LogOut className="mb-1" />
                  <span className="text-xs">Logout</span>
                </button>
              </li>
              <li>
                <button onClick={toggleDarkMode} className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                  {darkMode ? <Sun className="mb-1" /> : <Moon className="mb-1" />}
                  <span className="text-xs">{darkMode ? 'Light' : 'Dark'}</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;