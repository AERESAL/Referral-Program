import React from 'react';
import { createRoot } from 'react-dom/client';
import TestApp from './TestApp';

console.log('Script loaded, waiting for DOM...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready, looking for root...');
  const container = document.getElementById('root');
  
  if (container) {
    console.log('Root container found, mounting test app...');
    const root = createRoot(container);
    root.render(React.createElement(TestApp));
    console.log('Test app mounted successfully');
  } else {
    console.error('Root container not found');
    document.body.innerHTML = '<div style="color: red; padding: 20px;">ERROR: Root container not found</div>';
  }
});

// Fallback if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
  console.log('Document already loaded, mounting immediately...');
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(TestApp));
  }
}
