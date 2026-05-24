import { Routes, Route, Link } from 'react-router-dom';
import { type ReactNode } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { MainPage } from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';
import { SelectedBar } from './components/SelectedBar/SelectedBar';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export function App(): ReactNode {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="app">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <ThemeToggle />
          </nav>

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <SelectedBar />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
