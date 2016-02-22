    //Global variables.
        var words = ["toy story", "the nightmare before christmas", "shrek", "mulan", "kung fu panda", "tarzan", "ice age", "happy feet", "the hunchback of notre dame", "despicable me", "pocahontas", "chicken little", "the jungle book", "madagascar", "shark tale", "the land before time", "lilo and stitch", "charlottes web", "a bugs life", "beauty and the beast", "monsters inc", "finding nemo", "the incredibles", "cars", "ratatouille", "walle", "up", "brave", "inside out", "pinocchio", "fantasia", "dumbo", "bambi", "cinderella", "alice in wonderland", "peter pan", "sleeping beauty", "robin hood", "the little mermaid", "alladin", "the lion king"];
        var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var pastGuesses = [];
        var wordHolder = [];
        var currentWord = "";
        var chancesLeft = undefined;
        var wins= 0;
        var loses = 0;


function resetForm() {                                          //Resets the input form on keydown.
     document.getElementById("fname").value = "";
}

//initializing function.
        function newGame(){  
            
            pastGuesses = [];                                   //This and the following 3 lines reset the game parameters so that a new game works correctly.
            alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
            wordHolder = [];

            var randomWord = Math.floor(Math.random() * words.length);               
            currentWord = (words[randomWord]).split("");        //Generates a random word and splits it into an array.
            
            chanceDeteriminative(currentWord, difficulty());    //Decides how many guesses the user gets. see line 66 for more detail.

            document.getElementById("messenger").innerHTML = chancesLeft + " guesses left"; //updates chances left in HTML.

            for (var i = 0; i < currentWord.length; i++) {      //Stores spaces that correspond to the hangman word in a variable called wordHolder.
                wordHolder.push("_");
            };
            currentWord.forEach(function(value,index){          //Replaces underscores that represented spaces between words with a space.
                if (value == " ") {
                    wordHolder[index] = " ";
                }
            });                                                  
            document.getElementById("word").innerHTML = makeString(wordHolder); //updates HTML with the correct amount of empty underscores and spaces.

        }; 

    //Chance determinate function.
        function chanceDeteriminative(word, level){             //Determines the number of chances allowed based on currentWord length and chosen difficulty setting from difficulty function.
            var val = word.length;
            switch (true) {
                case (level == 0):
                    chancesLeft = 1;
                    break;
                case (val <= 4):
                    chancesLeft = +level + 3;
                    break;
                case (val <= 7):
                    chancesLeft = +level + 2;
                    break;
                case (val >= 7):
                    chancesLeft = +level + 1;
                    break;        
            }
        };

    //Difficulty function
        function difficulty(){                                  //function checks which radio button is checked, then returns the value which is used as a multiplier in chanceDeterminative.
            if (document.getElementById('easy').checked) {
                return document.getElementById('easy').value;
            } else if (document.getElementById('medium').checked) {
                return document.getElementById('medium').value;
            } else if (document.getElementById("hard").checked) {
                return document.getElementById("hard").value;
            } else if (document.getElementById("impossible").checked) {
                return document.getElementById("impossible").value;
            }
        }
    //User input retriever function.
        function newGuess() {                                           //Gets the user input from the form element and executes userGuess function.
            x = document.getElementById("fname").value;
            if (wordHolder.indexOf("_") == -1 || chancesLeft == 0) {    //Starts the game if the game is over. Allows break point for user and for "press any key to start" capabiliity.
                document.getElementById("guessed").innerHTML = "Animated Films";
                newGame();
            }else {
            x = x.toLowerCase();
            userGuess(x);
            }
        }

    //User input function.
        function userGuess(currentGuess){

            if (inArray(currentGuess,alphabet)) {               //Checks if users guess is in the current alphabet array.
                
                var index = alphabet.indexOf(currentGuess);     
                alphabet.splice(index, 1);                      //Removes guessed letter from the alphabet array so that it can't be guessed wrong more than once.
                pastGuesses.push(currentGuess);
                document.getElementById("guessed").innerHTML = makeString(pastGuesses); //Updates HTML with past guesses, see makeString function for more detail.
                                      
                checkWord(currentGuess);
            }                                                   //do nothing if its not a letter of the alphabet.
        }; 

    //General function for array value checks.
        function inArray(value,array) {                         //This is a general function that checks if a value is in an array, returns true or false.
              for(var i=0;i<array.length;i++) {
                if(array[i]===value){
                    return true;
                }
            }
            return false;
        };

    //General array to string function.
        function makeString(arr) {                              //Turns an array into a string, then removes all the commas.
            return (arr.toString()).replace(/,/g, "");
                
        }

    //Comparative fate deciding function.
        function checkWord(guess){                              //This function checks if the guessed letter is in the active hangman word.
            currentWord.forEach(function(value,index) {
                if (value == guess) {
                    wordHolder[index] = guess;                  //This replaces the corresponding array index in wordHolder with the correctly guessed letter.
                }
            })

            if (currentWord.indexOf(guess) == -1) {             //This subtracts a chance if the letter is not in the active hangman word and updates guesses left in HTML.
                document.getElementById("messenger").innerHTML = --chancesLeft + " guesses left";
                gameOver();                                     //Executes gameOver function if letter was not in the current hangman word.
            } else {
                checkWin();                                     //Otherwise we check if the user won.
            }  
        };

    //Negative outcome function.
        function gameOver() {                                   //Checks to see if the game is over, resets and updates global variables. Restarts game.
            if (chancesLeft <= 0) {
                loses++;
                document.getElementById("loses").innerHTML = loses; //Updates loses in HTML.
                document.getElementById("messenger").innerHTML = "You Lose! The word was '" + makeString(currentWord) + ".'";
            }
        };

    //Positive outcome function.
        function checkWin(){                                //Checks to see if the user guessed all the correct letters.
            document.getElementById("word").innerHTML = makeString(wordHolder); //Updates HTML with new progress since a letter was guessed correctly.
            if (wordHolder.indexOf("_") == -1) {
                wins++;
                document.getElementById("wins").innerHTML = wins; //Updates wins in HTML.
                document.getElementById("messenger").innerHTML = "You Win! Press a key to play again"
            }                       
        };
