/* Please See: https://developer.mozilla.org/ko/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript */

// 자바스크립트에서는 function을 class로서 사용한다. 
function Snake() { 
	this.x = 0; // property ( 클래스 안에 있는 변수)
	this.y = 0; // property
	this.xSpeed = scale * 1;
	this.ySpeed = 0;
	this.total = 0;
	this.tail = [];

	// 메서드
	this.update = function() {
		for (let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}

		this.tail[this.total - 1] = { x: this.x, y: this.y};

		this.x += this.xSpeed;
		this.y += this.ySpeed;

		// boundary check
		if (this.x > canvas.width) {
			this.x = 0;
		}
		if (this.y > canvas.height) {
			this.y = 0;
		}
		if (this.x < 0) {
			this.x = canvas.width;
		}
		if (this.y < 0) {
			this.y = canvas.height;
		}
	}

	this.draw = function() {
		ctx.fillStyle = "#ffffff";

		for (let i = 0; i < this.tail.length; i++) {
			ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
		}

		ctx.fillRect(this.x, this.y, scale, scale);
	}

	this.changeDirection = function(direction) {
		switch (direction) {
			case 'Up':
				this.xSpeed = 0;
				this.ySpeed = -scale * 1;
				break;
			case 'Down':
				this.xSpeed = 0;
				this.ySpeed = scale * 1;
				break;
			case 'Left':
				this.xSpeed = -scale * 1;
				this.ySpeed = 0;
				break;
			case 'Right':
				this.xSpeed = scale * 1;
				this.ySpeed = 0;
				break;
		}
	}

	this.eat = function(item) {
		if (this.x === fruit.x && this.y === fruit.y) {
			this.total++;
			return true;
		}
		return false;
	}

	this.checkCollision = function() {
		for (let i = 0; i < this.tail.length; i++) {
			if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
				this.total = 0;
				this.tail = [];
				return -1;
			}
		}
	}
}