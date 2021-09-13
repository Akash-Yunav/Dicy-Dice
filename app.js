

var scores, roundScore, activePlayer, gamePlaying, dice, prevDiceRoll;

init();

// document.getElementById('name-' + activePlayer).textContent = P1;
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// random number
		dice = Math.floor(Math.random() * 6) + 1;

		// display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';


		if (prevDiceRoll === dice && dice === 6) {
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = 0;

			nextPlayer();
		}

		// update the current score
		else if (dice !== 1) {
			// update RoundScore

			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;

		} else {
			// next plater turn
			nextPlayer();
		}
		prevDiceRoll = dice;
	}

});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// updates the global score variable and the UI
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	}


	// check if player won
	if (scores[activePlayer] >= 100) {
		document.getElementById('name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	} else {
		// next player
		nextPlayer();
	}
});

function nextPlayer() {
	roundScore = 0;
	document.getElementById('current-0').textContent = roundScore;
	document.getElementById('current-1').textContent = roundScore;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	prevDiceRoll = 0;

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

}
