import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error Boundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          color: '#F3E8DF',
          backgroundColor: '#1E1416',
          border: '1px solid #721C24',
          margin: '20px',
          borderRadius: '8px',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ color: '#E05368', fontSize: '20px', marginBottom: '10px' }}>
            Application Error Caught
          </h2>
          <p style={{ color: '#D8BDAA', marginBottom: '15px' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <pre style={{
            background: '#100D0D',
            padding: '15px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {this.state.error?.stack}
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global window error listener
window.addEventListener('error', (event) => {
  console.error('Global Error caught:', event.error || event.message);
  const container = document.getElementById('root');
  if (container && container.innerHTML.trim() === '') {
    container.innerHTML = `
      <div style="padding: 40px; color: #F3E8DF; background: #1C1214; margin: 20px; border-radius: 8px; font-family: monospace;">
        <h2 style="color: #E05368;">Global Window Error</h2>
        <p style="color: #D8BDAA;">${event.message} at ${event.filename}:${event.lineno}:${event.colno}</p>
        <pre style="background: #100D0D; padding: 15px; border-radius: 4px; font-size: 12px;">${event.error ? event.error.stack : 'No stack'}</pre>
      </div>
    `;
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found!");
}
