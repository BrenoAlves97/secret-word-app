import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/words";

import "./App.css";

import StartScreen from "./components/StartScreen";
import GameOverStage from "./components/GameOverStage";
import GameStage from "./components/GameStage";

const stages = [
    { id: 1, stageName: "start" },
    { id: 2, stageName: "game" },
    { id: 3, stageName: "end" },
];

function App() {
    const [gameStage, setGameStage] = useState(stages[0].stageName);
    const [words] = useState(wordsList);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setpickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [score, setScore] = useState(0);
    const [guesses, setGuesses] = useState(3);

    const pickedWordAndCategory = useCallback(() => {
        const categories = Object.keys(words);
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
        const word = words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category };
    }, [words]);

    const handleStartGame = useCallback(() => {
        clearLetterStates();
        const { word, category } = pickedWordAndCategory();

        let wordLetters = word.split("");
        wordLetters = wordLetters.map((l) => l.toLowerCase());

        setPickedWord(word);
        setpickedCategory(category);
        setLetters(wordLetters);

        setGameStage(stages[1].stageName);
    }, [pickedWordAndCategory]);

    const verifyLetter = (letter) => {
        const letterLoweCase = letter.toLowerCase();

        const alreadyContainsLetter =
            guessedLetters.includes(letterLoweCase) || wrongLetters.includes(letterLoweCase);

        if (alreadyContainsLetter) {
            return;
        }

        if (letters.includes(letterLoweCase)) {
            setGuessedLetters((actual) => [...actual, letterLoweCase]);
            setScore((actualScore) => actualScore + 100);
        } else {
            setWrongLetters((actualWrongLetters) => [...actualWrongLetters, letterLoweCase]);
            setGuesses((actualGuesses) => actualGuesses - 1);
        }
    };

    const clearLetterStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    };

    // check guesses quantity
    useEffect(() => {
        if (guesses <= 0) {
            clearLetterStates();
            setGameStage(stages[2].stageName);
        }
    }, [guesses]);

    // win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];

        if (guessedLetters.length === uniqueLetters.length) {
            setScore((actualScore) => (actualScore += 100));

            handleStartGame();
        }
    }, [guessedLetters, letters, handleStartGame]);

    const retry = () => {
        setScore(0);
        setGuesses(3);

        setGameStage(stages[0].stageName);
    };

    return (
        <div className="App">
            {gameStage === "start" && <StartScreen handleStartGame={handleStartGame} />}
            {gameStage === "game" && (
                <GameStage
                    verifyLetter={verifyLetter}
                    pickedWord={pickedWord}
                    pickedCategory={pickedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            )}
            {gameStage === "end" && <GameOverStage retry={retry} score={score} />}
        </div>
    );
}

export default App;
