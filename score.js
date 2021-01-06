const PREV_SCORE = "currentHighScore";

function saveScore(score) {
	let inputString = prompt("Do you want to save your score? [Y/N]:");
	const currentHighScore = loadScore(); 

	if (inputString === "Y" || inputString === "y") {
		if (currentHighScore === "N/R") {
			localStorage.setItem(PREV_SCORE, score);
		} else if (parseInt(currentHighScore) < score){
			localStorage.setItem(PREV_SCORE, score);
		}
	}	
}

function loadScore() {
	const currentHighScore = localStorage.getItem(PREV_SCORE);

	if (currentHighScore !== null) {
		return currentHighScore;
	} else {
		return "N/R";
	}
}
