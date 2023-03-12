import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('No [id="root"] element was found in the DOM');
}

const root = ReactDOM.createRoot(rootNode);
root.render(<App />);
