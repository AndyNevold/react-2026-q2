import { Routes, Route, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { MainPage } from './pages/MainPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';
import { SelectedBar } from './components/SelectedBar/SelectedBar';

export function App(): ReactNode {
  return (
    <ErrorBoundary>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* TODO: where to place */}
        <SelectedBar />
      </div>
    </ErrorBoundary>
  );
}
