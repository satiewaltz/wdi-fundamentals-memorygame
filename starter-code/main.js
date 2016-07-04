(function() {
  "use strict";
  console.log("JS file is connected to HTML! Woo!");

  // == Variables for tallys and game state == //
  var cardsInPlay = [],
  playerScore = 0,
  gameOver = false;

  // == Preloader to fix first turn bug - Credit *1 == //
  function preloadCards(x, y) {
    var imagesArray = [x, y];
    for (var i = 0; i < imagesArray.length; i++) {
      var img = new Image();
      img.src = imagesArray[i];
    }
  }

  // == Update Score Function - Shorter version looks pretty == //
  function updateScore() {
    document.getElementById("playerScore").innerHTML = playerScore;
  }

  // == Score Logic and Keeping == //
  function scoreBoard(point) {
    playerScore += point;
    if (playerScore < 0) playerScore = 0;
    updateScore();
    if (playerScore === 2) {
      var emojiHand = String.fromCharCode(0xD83D, 0xDC4C),
      emoji100 = String.fromCharCode(0xD83D, 0xDCAF),
      emojiFire = String.fromCharCode(0xD83D, 0xDD25);
      alert("You win!" + emojiHand + emoji100 + emojiFire + " Game Over.");
      restartGame(gameOver = true);
    }
    newTurn();
  }

  // == Restart Game == //
  function restartGame(gameOver) {
    playerScore = 0;
    updateScore();
    newTurn(gameOver);
  }

  // == Card Checker & Push array indexes into HTML == //
  function isTwoCards() {
    cardsInPlay.push(this.getAttribute('data-card'));
    if (this.getAttribute('data-card') == "king") {
      this.innerHTML = '<img src="king.png" alt="King of Spades"/>';

    } else {
      this.innerHTML = '<img src="queen.png" alt="Queen of Spades"/>';
    }
    if (cardsInPlay.length === 2) {
      isMatch(cardsInPlay);
    }
  }

  // == Card Matcher == //
  function isMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      alert("You've found a match! +1 point!");
      scoreBoard(1);
    } else {
      if (playerScore === 0) {
        alert("Sorry, try again. No points...");
      } else {
        alert("Oops, try again. -1 point.");
      }
      scoreBoard(-1);
    }
  }

  // == Image Remover Function for clearing board - Credit *2 == //
  function imageRemover() {
    var images = document.getElementsByTagName("img");
    while(images.length > 0) {
      images[0].parentNode.removeChild(images[0]);
    }
  }

  // == Reset Board & Cards Played on new turn == //
  function newTurn() {
    if ((cardsInPlay[0] != cardsInPlay[1] || gameOver) ||
    typeof cardsInPlay[0] === 'undefined') {
      imageRemover();
      gameOver = false;
    }
    cardsInPlay = [];
  }

  // == Create and Initialize Board == //
  (function createBoard() {
    var cards = ["queen", "queen", "king", "king"],
    board = document.getElementById('game-board'),
    restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restartGame);

    preloadCards("king.png", "queen.png");
    for (var i = 0; i < cards.length; i++) {
      var cardElement = document.createElement('div');
      cardElement.setAttribute('data-card', cards[i]);
      cardElement.className = 'card';
      cardElement.addEventListener('click', isTwoCards, false);
      board.appendChild(cardElement);
    }
  })();
})();
