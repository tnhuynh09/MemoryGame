const startGame = document.getElementById("start-game-button");
const restartGame = document.getElementById("restart-game-button");
const totalGuessesLabel = document.getElementById("total-guesses");
const gameContainer = document.getElementById("game");

let card1 = null;
let card2 = null;
let card1Index = -1;
let cardFlippedCounter = 0;
let cardsMatched = 0;
let shuffledColors;
let totalGuessesCounter = 0;

const COLORS = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "red",
      "blue",
      "green",
      "orange",
      "purple"
];

// Function to start the game
startGame.addEventListener("click", function () {
      createDivsForColors(shuffledColors);
      totalGuessesLabel.innerText = totalGuessesCounter;
      startGame.remove();
      restartGame.classList.remove("hidden");
});

// Function to restart the game
restartGame.addEventListener("click", function () {
      shuffledColors = shuffle(COLORS);
      cardFlippedCounter = 0;
      cardsMatched = 0;
      card1Index = -1;
      card1 = null;
      card2 = null;
      totalGuessesCounter = 0;
      totalGuessesLabel.innerText = totalGuessesCounter;
      // Loop through every child element of gameContainer to remove it 
      const childElements = Array.from(gameContainer.children);
      for (childElement of childElements) {
            childElement.remove();
      };
      // Loop through the array to create the shuffled colors again
      createDivsForColors(shuffledColors);
      // This is just removing the Start Button when we Restart a game
      startGame.remove();
});

// Fisher-Yates shuffle function 
function shuffle(array) {
      let counter = array.length;

      while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
      }
      return array;
}

shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
      for (let color of colorArray) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(color);
            newDiv.addEventListener("click", handleCardClick);
            gameContainer.append(newDiv);
      }
}

function handleCardClick(event) {
      let clickedCard = event.target;
      // Does not allow a third card to be flipped if two cards are flipped
      if (cardFlippedCounter == 0 || cardFlippedCounter == 1) {
            clickedCard.style.background = clickedCard.classList[0];
      }

      // Retrieving the index of the card being clicked on
      const childElements = Array.from(gameContainer.children);
      const index = childElements.indexOf(event.target);

      // Retrieving the index of the FIRST card 
      if (cardFlippedCounter == 0) {
            card1Index = index;
            cardFlippedCounter = 1;
            card1 = shuffledColors[index]
            // Retrieving the index of the SECOND card 
      } else if (cardFlippedCounter == 1) {
            // Comparing the cards: if the cards are the SAME 
            if (card1Index != index) {
                  cardFlippedCounter = 2;
                  card2 = shuffledColors[index];
                  // The cards are MATCHED
                  if (card1 === card2) {
                        cardsMatched += 2;
                        cardFlippedCounter = 0;
                        // The cards are NOT MATCHED
                  } else {
                        setTimeout(function () {
                              gameContainer.children[card1Index].style.background = "#fcedf3";
                              clickedCard.style.background = "#fcedf3";
                              cardFlippedCounter = 0;
                        }, 1000);
                  }
                  totalGuessesCounter += 1;
                  totalGuessesLabel.innerText = totalGuessesCounter;
            }
      }
      // When all the cards are matched and the game is over 
      if (cardsMatched === COLORS.length) {
            setTimeout(function () {
                  alert("You matched all the colors! Click the RESTART button and play again! (:");
            }, 1000);
      }
}