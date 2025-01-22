import { useState } from 'react';
import './Hangman.css';
import { languages } from './language.js';
import clsx from 'clsx';
import { getFarewellText, getRandomWord } from './utils.js';
import Confetti from 'react-confetti'

const Hangman = () => {
    // state value
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    // derived value
    const wrongGuessCount = guessedLetters.filter(letter => 
        !currentWord.includes(letter)
    ).length;

    const numberOfAttemptsLeft = (languages.length -1) - wrongGuessCount;

    const isGameWon = [...currentWord].every(letter => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length -1;
    const isGameOver = isGameWon || isGameLost;

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const lastGuessedLetterIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

    // static value
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // new game
    const geTNewGame = () => {
        setCurrentWord(getRandomWord);
        setGuessedLetters([]);
    }

    // save the letter in to state
    const saveLetters = (letter) => {
        setGuessedLetters(prevLetter => (
            prevLetter.includes(letter) ? prevLetter
                                        : [...prevLetter, letter]
        ));
    }

    // keyboard
    const keyboardElements = [...alphabet].map(letter => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isIncorrect = isGuessed && !currentWord.includes(letter);

        const className = clsx({
            correct: isCorrect,
            incorrect: isIncorrect 
        })

        return (
            <button key={letter}
                    onClick={() => saveLetters(letter)}
                    className={className}
                    disabled={isGameOver}
                    aria-disabled={guessedLetters.includes(letter)}
                    aria-label={`letter ${letter}`}>
                {letter.toLocaleUpperCase()}
            </button>
        )
    })

    // letter
    const letterElements = [...currentWord].map((letter, index) => {
        const shouldRevealLetters = isGameLost || guessedLetters.includes(letter);
        const letterClass = clsx('letter', {
            missed__letter: isGameLost && !guessedLetters.includes(letter)
        })
        return (
            <span className={letterClass} 
                  key={index}>
                {/* {isGameOver ? letter
                            : guessedLetters.includes(letter)
                                ? letter
                                : ''} */}
                {shouldRevealLetters ? letter : ''}
            </span>
        )
    })

    //language
    const langElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount;
        const lostClassName = clsx(isLanguageLost ? 'lost' : null)

        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }

        return (
            <div 
             style={styles}
             className={lostClassName}
             key={lang.name}>

                {lang.name}
            </div>
        )
    });


    // game status 
    const renderGameStatus = () => {
        if (!isGameOver && lastGuessedLetterIncorrect) {
            const lostLang = getFarewellText(languages[wrongGuessCount - 1].name)
            return  <>
                        <p>{lostLang}</p>
                    </>
        }
        
        if (isGameWon) {
            return  <>
                        <h2>You Win!</h2>
                        <p>Well done! 🎉</p>
                    </>
        } else if (isGameLost) {
            return <>
                    <h2>Game Over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
        }

            
    }

    const gameStatusClass = clsx('game__status', {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && lastGuessedLetterIncorrect
    })

  return (
    <main>
        {isGameWon ? <Confetti /> : null}
        <header className="title__container">
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
        <section aria-live='polite' 
                 className={gameStatusClass}
                 role='status'>
            {renderGameStatus()}
        </section>
        <section className='language__section'>
            {langElements}
        </section>
        <section className='word__section'>
            {letterElements}
        </section>

        {/* combined visually-hidden aria-live region for status update  */}
        <section className='sr-only'
                 role='status'
                 aria-live='polite'>
            
            <p>
                {currentWord.includes(lastGuessedLetter)
                    ? `Correct! The letter ${lastGuessedLetter}. is in the word`
                    : `Sorry, the letter ${lastGuessedLetter} is not in the word`
                }
                You have {numberOfAttemptsLeft} attempts left
            </p>
            
            <p>Current word: {currentWord.split('').map(letter => (
                guessedLetters.includes(letter) ? letter + '.' : 'blank.'
            ))}</p>

        </section>
        <section className="keyboard__section">
            {keyboardElements}
        </section>
        {isGameOver ? (<button className="new__game-btn" 
                               type='button'
                               onClick={geTNewGame}>
                            New Game
                        </button>)
                    : null}
    </main>
  )
}

export default Hangman
