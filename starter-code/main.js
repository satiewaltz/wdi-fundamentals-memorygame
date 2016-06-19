console.log("JS file is connected to HTML! Woo!")

var cardOne = "queen";

var cardTwo = "king"

var cardThree = "queen"

var cardFour = "king"

// if (cardTwo === cardFour) {
// 	alert("You've found a match!");
// } else {
// 	alert("Sorry, try again.");
// }

// if (cardOne === cardThree) {
// 	alert("You've found a match!");
// } else {
// 	alert("Sorry, try again.");
// }

var board = document.getElementById('game-board');

function createBoard () {
	for (var i = 0; i < 4; i++) {
		var newCard = document.createElement('div')
		newCard.className = 'card';
		board.appendChild(newCard);
	}
}

createBoard();