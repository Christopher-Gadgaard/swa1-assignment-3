import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './components/Login';  
import Register from './components/Register';

function App() {
  return (
<div className="App">
            <h1>Welcome to Match3 Game</h1>
            <Login />
            <Register />
            
        </div>
  );
}

export default App;
