    //Global variables.
        var words = ["toy story", "a bugs life", "monsters inc", "finding nemo", "the incredibles", "cars", "ratatouille", "walle", "up", "brave", "inside out", "pinocchio", "fantasia", "dumbo", "bambi", "cinderella", "alice in wonderland", "peter pan", "sleeping beauty", "robin hood", "the little mermaid", "alladin", "the lion king"];
        var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var wordHolder = [];
        var currentWord = "";
        var chancesLeft = undefined;
        var wins= 0;
        var loses = 0;
        // document.onkeyup = function(event) {
        //     var letter = String.fromCharCode(event.keyCode).toLowerCase();
        // }




function newGuess() {
    x = document.getElementById("fname").value;
    userGuess(x);

}

function resetForm() {
     document.getElementById("fname").value = "";
}

// document.getElementById("demo").innerHTML = x;



//initializing function.
        function newGame(){
            var newgame = confirm("ready to start a game?");        //Checks if the user is ready to start the game.

            if (newgame) {
                var randomWord = Math.floor(Math.random() * words.length);               
                currentWord = (words[randomWord]).split("");    //Generates a random word and splits it into an array.
                
                chanceDeteriminative(currentWord);                  //Determines the number of chances allowed based on currentWord length.

                for (var i = 0; i < currentWord.length; i++) {      //Stores spaces that correspond to the hangman word in a variable called wordHolder.
                    wordHolder.push("_");
                };
                currentWord.forEach(function(value,index){          //Replaces spaces between words with a space.
                    if (value == " ") {
                        wordHolder[index] = " ";
                    }
                });                                                  
                document.getElementById("word").innerHTML = wordHolder;
                debugger;
            }  
        }; 

    //Chance determinate function.
        function chanceDeteriminative(word){                //Sets the number of chances based on length of hangman word.
            var val = word.length;
            switch (true) {
                case (val <= 4):
                    chancesLeft = 12;
                    break;
                case (val <= 7):
                    chancesLeft = 8;
                    break;
                case (val <= 12):
                    chancesLeft = 6;
                    break;
                case (val > 12):
                    chancesLeft = 5;
                    break;        
            }
        };

    //User input function.
        function userGuess(currentGuess){
                                                                //Prompts the user to guess a letter.

            if (inArray(currentGuess,alphabet)) {               //Makes sure the input was a letter in the alphabet.
                
                var index = alphabet.indexOf(currentGuess);     
                alphabet.splice(index, 1);                      //Removes guessed letter from the alphabet array for comparative measures.

                checkWord(currentGuess);
            } else {
                ;   //do nothing if its not a letter of the alphabet.
            }
        }; 

    //General function for array value checks.
        function inArray(value,array) {                      //This function checks if a value is in an array, returns true or false
              for(var i=0;i<array.length;i++) {
                if(array[i]===value){
                    return true;
                }
            }
            return false;
        };

    //Copmarative function, fate deciding function.
        function checkWord(guess){                    //This function checks if the guessed letter is in the active hangman word.
            currentWord.forEach(function(value,index) {
                if (value == guess) {
                    wordHolder[index] = guess;             //This replaces the corresponding space in wordHolder with the correctly guessed letter.
                }
            })

            if (currentWord.indexOf(guess) == -1) {                //This subtracts a chance if the letter is not in the active hangman word.
                chancesLeft--;
                console.log("You have " + chancesLeft + " chances Left. ");
                gameOver();
            }

            document.getElementById("word").innerHTML = wordHolder;  
            checkWin();
        };

    //Negative outcome function.
        function gameOver() {                               //Checks to see if the game is over, resets and updates global variables. Restarts game.
            if (chancesLeft <= 0) {
                alert("Game Over! You suck.")
                loses++;
                alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
                wordHolder = [];
                console.log("wins: " + wins);
                console.log("  loses: " + loses + "  ");
                newGame();
            }
        };

    //Positive outcome function.
        function checkWin(){                                //Checks to see if the user guessed all the correct letters, resets and updates global variables. Restarts game.
            if (wordHolder.indexOf("_") == -1) {
                alert("Good Job! You win!")
                wins++;
                alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
                wordHolder = [];
                console.log("wins: " + wins);
                console.log("  loses: " + loses + "  ");
                newGame();
            }
        };

    //Start Game!
        newGame();
