console.log("JS file is connected to HTML! Woo!");

// == Variables for tallys == //
var cardsInPlay = [];
var score = 0;

// == Preloader to fix first turn bug == //
function preload() {
	var images = [];
	for (var i = 0; i < arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}

// == Create and Initialize Board == //
(function createBoard() {
	preload("king.png","queen.png");
	var cards = ["queen", "queen", "king", "king"];
	var board = document.getElementById('game-board');
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('div');
		cardElement.setAttribute('data-card', cards[i]);
		cardElement.addEventListener('click', isTwoCards);
		cardElement.className = 'card';
		board.appendChild(cardElement);
	}
})();

// == Card Checker == //
function isTwoCards() {
	cardsInPlay.push(this.getAttribute('data-card'));

	if (this.getAttribute('data-card') == "king") {
		this.innerHTML = '<img src="king.png" alt="King of Spades"/>';
	} else {
		this.innerHTML = '<img src="queen.png" alt="Queen of Spades"/>';
	}

	if (cardsInPlay.length === 2) {
		isMatch(cardsInPlay);
		reset();
	}
}

// == Card Matcher == //
function isMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You've found a match! +1 point!");
		score += 1;
		document.getElementById("score").innerHTML = score;
	} else {
		alert("Sorry, try again. -1 point.");
		score -= 1;
		document.getElementById("score").innerHTML = score;
	}
}

// == Image Remover Function for clearing board == //
function imageRemover() {
	var images = document.getElementsByTagName("img");
	while(images.length > 0) {
		images[0].parentNode.removeChild(images[0]);
	}
}

function reset() {
	imageRemover();
	cardsInPlay = [];
}