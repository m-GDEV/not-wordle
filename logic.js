word = ["f", "r", "e", "s", "h"];
guess = ["f", "r", "e", "s", "h"];
result = [];

// word : array of right word
// guess : array of user's guess
// result : array of the results
function checkWord(word, guess) {
    let result = [];
    main: for (i = 0; i < 5; i++) {
        if (guess[i] == word[i]) {
            result[i] = "GREEN";
            continue main;
        } else {
            for (j = 0; j < 5; j++) {
                if (guess[i] == word[j]) {
                    result[i] = "YELLOW";
                    continue main;
                }
            }
        }
        result[i] = "GRAY";
    }
    return result;
}

// console.log(checkWord(word, guess, result));
//
console.log(checkWord(word, guess));
