const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // this makes us to control the pixels in canvas.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// set default context & canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// set canvas size to give size information to pixel modifier.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  //* below the process works the whole time you move the mouse.
  if (!painting) {
    // * painting이 true일 때 까지 계속해서 새로운 경로(line)을 만들고 그 위치로 이동한다.
    ctx.beginPath();
    ctx.moveTo(x, y); //* path를 만들고 마우스를 그 위치로 이동한다.
  } else {
    ctx.lineTo(x, y); // 현재의 sub-path에서 마지막 지점(즉, 이전까지 그린 끝 지점)을 특정 좌표(x2, y2)로 연결한다.
    ctx.stroke(); // 현재 sub-path에 현재 style을 적용

    // ctx.closePath(); // 현재 sub-path의 시작점에서부터 직선을 추가함.
    /* 여기서 closePath를 적용하면 마우스를 누른 상태로 이동할 때마다 이전까지 그린 경로는 닫히게 된다.  
       따라서 그 다음 단계의 lineTo에서는 이전 단계가 처음 시작 지점 밖에 없으므로 시작 지점에서의 직선을 그리게 되고 
       당연히 지금까지 그린 경로는 다시 닫히게 되며 이 과정이 반복된다.
    */
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

function handleStart(evt) {
  evt.preventDefault();
  console.log("touchstart.");
  var el = document.getElementById("canvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    console.log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    console.log("touchstart:" + i + ".");
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementById("canvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      console.log("continuing touch " + idx);
      ctx.beginPath();
      console.log(
        "ctx.moveTo(" +
          ongoingTouches[idx].pageX +
          ", " +
          ongoingTouches[idx].pageY +
          ");"
      );
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      console.log(
        "ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");"
      );
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
      console.log(".");
    } else {
      console.log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log("touchend");
  var el = document.getElementById("canvas");
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
      ongoingTouches.splice(idx, 1); // remove it; we're done
    } else {
      console.log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log("touchcancel.");
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);

  // For mobile environment..
  canvas.addEventListener("touchstart", handleStart);
  canvas.addEventListener("touchend", handleEnd);
  canvas.addEventListener("touchcancel", handleCancel);
  canvas.addEventListener("touchmove", handleMove);
}

//* Array.from(object): object로부터 array를 만든다.
/*
It's just an easier way of registering an event on each button, 
this is because we want to later get the button that was clicked.
*/
Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
