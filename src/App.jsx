import React from 'react';
import './App.css';
import PostContainer from './components/PostContainer';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Посты из StackOverflow по React</h1>
      </header>
      <PostContainer/>
    </div>
  );
}

export default App;
