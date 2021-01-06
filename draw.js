const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");


// score element
const score = document.getElementById("jsScore");
const padKeys = document.getElementsByClassName("controller__btn");

let scale; // scale for snake
let snake;
let offsetX;
let offsetY;
let currentScore;

if (window.innerWidth <= 500) {
	scale = 15;
} else {
	scale = 10;
}

const rows = canvas.height / scale;
const columns = canvas.width / scale;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth;
offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
offsetY = canvas.offsetTop;
currentScore = 0;

// load prev score.
document.getElementById("jsHighScore").innerText = loadScore();

// Immediate Function: 함수를 정의함과 동시에 실행하는 함수
/*
즉시실행함수의 경우 함수를 정의하자마 실행되기 때문에, 같은 함수를 다시 호출할 수 없다. 이러한 특성을 이용해 최초에 한 번만 실행되는 초기화 코드에서 사용할 수 있다.
*/

(function setUp() {
	snake = new Snake();
	fruit = new Fruit();

	fruit.pickLocation();

	let intervalId = window.setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fruit.draw();
		snake.update();
		snake.draw();

		if (snake.eat(fruit)) {
			fruit.pickLocation();
			currentScore++;
		}
		if (snake.checkCollision() < 0 || snake.checkBoundary() < 0) {
			window.clearInterval(intervalId);
			saveScore(currentScore);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.font = "22px Segoe UI";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("Please refresh the browser.", canvas.width/2, canvas.height/2);
		}

		score.innerText = currentScore;
	}, 150);
}());

function handleResizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
  offsetY = canvas.offsetTop;
}

function handleKeyboardInput(event) {
	const direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}

function handlePadInput(event) {
	const direction = event.target.attributes[1].value;
	snake.changeDirection(direction);
}

window.addEventListener("resize", handleResizeCanvas);
window.addEventListener("keydown", handleKeyboardInput);


Array.from(padKeys).forEach((padKey) => {
	padKey.addEventListener("click", handlePadInput);
});