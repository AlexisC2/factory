import React, { useEffect, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import ThemeToggle from './ThemeToggle';
import { subscribeToProjectsThunk } from '../store/slices/projectSlice';
import { subscribeToTemplatesThunk } from '../store/slices/templateSlice';
import PWAInstallPrompt from './PWAInstallPrompt';

// Lazy load components
const Dashboard = React.lazy(() => import('./Dashboard'));
const TrendExplorer = React.lazy(() => import('./TrendExplorer'));
const CreationHub = React.lazy(() => import('./CreationHub'));
const TemplateLibrary = React.lazy(() => import('./TemplateLibrary'));
const AIAssistant = React.lazy(() => import('./AIAssistant'));
const Analytics = React.lazy(() => import('./Analytics'));

const DigitalProductStudio: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(subscribeToProjectsThunk());
    // @ts-ignore
    dispatch(subscribeToTemplatesThunk());
  }, [dispatch]);

  const tabs = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Trend Explorer', path: '/trend-explorer' },
    { name: 'Creation Hub', path: '/creation-hub' },
    { name: 'Template Library', path: '/template-library' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto sm:justify-center">
            <div className="flex space-x-0 sm:space-x-8">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) =>
                    `whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      isActive
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`
                  }
                  role="tab"
                >
                  {tab.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/trend-explorer" element={<ProtectedRoute><TrendExplorer /></ProtectedRoute>} />
            <Route path="/creation-hub" element={<ProtectedRoute><CreationHub /></ProtectedRoute>} />
            <Route path="/template-library" element={<ProtectedRoute><TemplateLibrary /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><div>Welcome to Digital Product Studio</div></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
      <PWAInstallPrompt />
    </div>
  );
};

export default DigitalProductStudio;
