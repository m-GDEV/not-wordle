import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import Keyboard from "./components/Keyboard";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
    const [guess, setGuess] = useState("");
    const [guessArray, setGuessArray] = useState([]);
    const [ready, setReady] = useState(false);
    const [finished, setFinished] = useState(false);
    const [word, setWord] = useState("");
    const [words, setWords] = useState("");
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        // Fetch 5k words from file, choose one randomly, make it uppercase,
        // assign "text" state to check is word is valid later
        fetch("./words.txt")
            .then((res) => res.text())
            .then((text) => {
                let random = Math.floor(Math.random() * 5757);
                let mot = text.split("\n")[random];
                setWords(text);
                setWord(mot.toUpperCase());
            });

        // Event listener that recognizes all keyboard events from a-z, backspace, and enter
        document.addEventListener("keydown", (e) => {
            if (e.key == "Backspace") {
                // remove last letter from guess if backspace is pressed
                setGuess((oldState) => oldState.slice(0, -1));
            } else if (e.keyCode >= 65 && e.keyCode <= 90) {
                // if guess is bigger than 5 chars, do not update guess keep the old value
                setGuess((oldState) => {
                    if (oldState.length < 5) {
                        return oldState + e.key.toUpperCase();
                    } else {
                        return oldState;
                    }
                });
            } else if (e.key == "Enter") {
                // starts validation of guess
                setReady(true);
            }
        });
    }, []);

    // Validation of guess
    useEffect(() => {
        if (ready) {
            if (guess.length == 5) {
                // display success message
                if (guess == word) {
                    setFinished(true);
                    toast.success("Congradulations! You won!");
                    // if user has entered max amount of guesses with no right answer, print error
                } else if (guessArray.length == 5) {
                    setFinished(true);
                    toast.error(word);
                }
                // if theres less than 6 guesses, add one more; otherwise don't
                setGuessArray((current) => {
                    if (current.length < 6) {
                        // checking if the current guess is a valid english word
                        if (words.includes(guess.toLowerCase())) {
                            return [...current, guess];
                        } else {
                            // if word is invalid toast error, must use another state variable as toasting in set state function triggers it twice
                            setInvalid(true);
                            return current;
                        }
                        // if the user already used all their guesses, return the same old array
                    } else {
                        return current;
                    }
                });
                // reset guess & ready state
                setGuess("");
                setReady(false);
            } else {
                // only shows error message if there are less than  six guesses
                if (guessArray.length < 6) {
                    toast.error("Enter the right length of word");
                    setReady(false);
                }
            }
        }
    }, [ready]);

    useEffect(() => {
        if (invalid == true) {
            toast.error("Invalid Word.");
        }
        setInvalid(false);
    }, [invalid]);

    return (
        <main className="bg-[#121213]  text-white max-h-screen overflow-hidden">
            <div>
                <Toaster />
            </div>
            <Navbar />
            <div className="flex justify-between flex-col h-screen pb-20">
                <Grid
                    guess={guess}
                    guessArray={guessArray}
                    hideGuess={finished}
                    word={word}
                />
                <Keyboard />
            </div>
        </main>
    );
}

export default App;

// - add animations
// add keyboard support, idk how i'd mange the state so idk do it or don't
// instead of stop taking input after win or loss, just show modal or some shit
// (this is too hard to do smh)
