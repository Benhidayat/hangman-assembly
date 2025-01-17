import { useState } from 'react';
import './Hangman.css';
import { languages } from './language.js';

const Hangman = () => {
    const [currentWord, setCurrentWord] = useState('react');
    const [guessedLetter, setGuessedLetter] = useState([]);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // keyboard
    const keyboardElements = [...alphabet].map(letter => (
        <button key={letter}>{letter.toUpperCase()}</button>
    ))

    // letter
    const wordElements = [...currentWord].map((letter, index) => {
        return  (
            <span className='letter' key={index}>{letter.toUpperCase()}</span>
        )
    })


    //language
    const langElements = languages.map(langObj => {

        const styles = {
            backgroundColor: langObj.backgroundColor,
            color: langObj.color
        }

        return (
            <div style={styles}
                 key={langObj.name}
            >
                {langObj.name}
            </div>
        )
    });

  return (
    <main>
        <header className="title__container">
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
        <section className="game__status">
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
        </section>
        <section className='language__section'>
            {langElements}
        </section>
        <section className='word__section'>
            {wordElements}
        </section>
        <section className="keyboard__section">
            {keyboardElements}
        </section>
        <button className="new__game-btn" type='button'>New Game</button>
    </main>
  )
}

export default Hangman
