import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import "tailwindcss/tailwind.css"
import './App.css';
import {DiscussionPage} from './pages/DiscussionPage';

function App() {
  return (
    <div >
      <DiscussionPage />
    </div>
  );
}

export default App;