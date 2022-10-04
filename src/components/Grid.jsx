function Grid(props) {
    let result = [];
    function checkWord(word, guess) {
        main: for (let i = 0; i < 5; i++) {
            if (guess[i] == word[i]) {
                result[i] = "#50C878";
                continue main;
            } else {
                for (let j = 0; j < 5; j++) {
                    if (guess[i] == word[j]) {
                        result[i] = "#FFBF00";
                        continue main;
                    }
                }
            }
            result[i] = "#3A3A3C";
        }
        return result;
    }

    return (
        <section className="flex place-content-center mt-32">
            <div className="flex flex-col">
                {props.guessArray.map((guess) => {
                    // maps array of previous guesses
                    const guessAsArray = [...guess];
                    let result = checkWord(props.word, guessAsArray);

                    return (
                        <div className="flex flex-row gap-1.5 mb-1.5">
                            {guessAsArray.map((letter, index) => {
                                return (
                                    <div
                                        className="h-[3.875rem] w-[3.875rem] items-center flex justify-center text-3xl font-bold bg-[#3A3A3C]"
                                        style={{
                                            backgroundColor: result[index],
                                        }}
                                    >
                                        {letter}
                                    </div>
                                );
                            })}
                        </div>
                    );

                    // Comment for below: current guess div
                })}
                {!props.hideGuess && (
                    <div className="flex flex-row gap-1.5 mb-1.5">
                        <div className="bg-transparent border-2 border-box rounded-sm w-[3.875rem] h-[3.875rem] text-3xl flex items-center justify-center font-bold">
                            {props.guess[0]}
                        </div>
                        <div className="bg-transparent border-2 border-box rounded-sm w-[3.875rem] h-[3.875rem] text-3xl flex items-center justify-center font-bold">
                            {props.guess[1]}
                        </div>
                        <div className="bg-transparent border-2 border-box rounded-sm w-[3.875rem] h-[3.875rem] text-3xl flex items-center justify-center font-bold">
                            {props.guess[2]}
                        </div>
                        <div className="bg-transparent border-2 border-box rounded-sm w-[3.875rem] h-[3.875rem] text-3xl flex items-center justify-center font-bold">
                            {props.guess[3]}
                        </div>
                        <div className="bg-transparent border-2 border-box rounded-sm w-[3.875rem] h-[3.875rem] text-3xl flex items-center justify-center font-bold">
                            {props.guess[4]}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Grid;
