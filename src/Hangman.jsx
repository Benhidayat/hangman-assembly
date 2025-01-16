import React from 'react';
import './Hangman.css';

const Hangman = () => {
  return (
    <main>
        <header className="title__container">
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
        <h2 className="game__status">
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
        </h2>
    </main>
  )
}

export default Hangman
