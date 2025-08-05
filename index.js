import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('root');
  
  if (container) {
    console.log('Root container found, mounting React app...');
    const root = createRoot(container);
    root.render(React.createElement(App));
    console.log('React app mounted successfully');
  } else {
    console.error('Root container not found');
  }
});

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  // Document is still loading, wait for DOMContentLoaded
} else {
  // Document is already loaded
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
}
