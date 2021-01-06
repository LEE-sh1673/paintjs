// const canvas = document.getElementById("jsCanvas");
// const ctx = canvas.getContext("2d"); // this makes us to control the pixels in canvas.
// const colors = document.getElementsByClassName("jsColor");
// const range = document.getElementById("jsRange");
// const mode = document.getElementById("jsMode");
// const saveBtn = document.getElementById("jsSave");
// const clearBtn = document.getElementById("jsClear");

// const INITIAL_COLOR = "#2c2c2c";
// const CANVAS_SIZE = 700;

// const CANVAS_OFFSET_X = (window.innerWidth - canvas.offsetWidth) / 2;
// const CANVAS_OFFSET_Y = canvas.offsetTop;

// // set default context & canvas
// ctx.lineWidth = 2.5;
// ctx.fillStyle = "white";
// ctx.strokeStyle = INITIAL_COLOR;
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// // set canvas size to give size information to pixel modifier.
// canvas.width = canvas.offsetWidth;
// canvas.height = canvas.offsetHeight;

// let painting = false;
// let filling = false;
// let ongoingTouches = [];

// function resizeCanvas() {
//   canvas.width = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;
// }

// function stopPainting() {
//   painting = false;
// }

// function startPainting() {
//   painting = true;
// }

// function onMouseMove(event) {
//   const x = event.offsetX;
//   const y = event.offsetY;

//   //* below the process works the whole time you move the mouse.
//   if (!painting) {
//     // * painting이 true일 때 까지 계속해서 새로운 경로(line)을 만들고 그 위치로 이동한다.
//     ctx.beginPath();
//     ctx.moveTo(x, y); //* path를 만들고 마우스를 그 위치로 이동한다.
//   } else {
//     ctx.lineTo(x, y); // 현재의 sub-path에서 마지막 지점(즉, 이전까지 그린 끝 지점)을 특정 좌표(x2, y2)로 연결한다.
//     ctx.stroke(); // 현재 sub-path에 현재 style을 적용

//     // ctx.closePath(); // 현재 sub-path의 시작점에서부터 직선을 추가함.
//     /* 여기서 closePath를 적용하면 마우스를 누른 상태로 이동할 때마다 이전까지 그린 경로는 닫히게 된다.
//        따라서 그 다음 단계의 lineTo에서는 이전 단계가 처음 시작 지점 밖에 없으므로 시작 지점에서의 직선을 그리게 되고
//        당연히 지금까지 그린 경로는 다시 닫히게 되며 이 과정이 반복된다.
//     */
//   }
// }

// function handleColorClick(event) {
//   const color = event.target.style.backgroundColor;
//   ctx.strokeStyle = color;
//   ctx.fillStyle = color;
// }

// function handleRangeChange(event) {
//   const lineSize = event.target.value;
//   ctx.lineWidth = lineSize;
// }

// function handleModeClick(event) {
//   if (filling === true) {
//     filling = false;
//     mode.innerText = "Fill";
//   } else {
//     filling = true;
//     mode.innerText = "Paint";
//   }
// }

// function handleCanvasClick() {
//   if (filling === true) {
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }
// }

// function handleCM(event) {
//   event.preventDefault();
// }

// function handleSaveClick() {
//   const image = canvas.toDataURL("image/png");
//   const link = document.createElement("a");
//   link.href = image;
//   link.download = "PaintJS[🎨]";
//   link.click();
// }

// /* Below functions are some manipulations of mobile environment. */
// function handleClearClick() {
//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// function handleStart(event) {
//   event.preventDefault();
//   let touches = event.changedTouches;

//   for (let i = 0; i < touches.length; i++) {
//     ongoingTouches.push(copyTouch(touches[i]));
//     ctx.beginPath();
//     ctx.arc(
//       touches[i].pageX - CANVAS_OFFSET_X,
//       touches[i].pageY - CANVAS_OFFSET_Y,
//       1,
//       1,
//       2 * Math.PI,
//       false
//     ); // a circle at the start
//     ctx.fill();

//     if (filling === true) {
//       handleCanvasClick();
//     }
//   }
// }

// function handleMove(evt) {
//   evt.preventDefault();
//   let touches = evt.changedTouches;

//   for (let i = 0; i < touches.length; i++) {
//     let idx = ongoingTouchIndexById(touches[i].identifier);

//     if (idx >= 0) {
//       ctx.beginPath();
//       console.log(ongoingTouches[idx]);
//       console.log(
//         "ctx.moveTo(" +
//           ongoingTouches[idx].pageX -
//           CANVAS_OFFSET_X +
//           ", " +
//           ongoingTouches[idx].pageY -
//           CANVAS_OFFSET_Y +
//           ");"
//       );
//       ctx.moveTo(
//         ongoingTouches[idx].pageX - CANVAS_OFFSET_X,
//         ongoingTouches[idx].pageY - CANVAS_OFFSET_Y
//       );
//       ctx.lineTo(
//         touches[i].pageX - CANVAS_OFFSET_X,
//         touches[i].pageY - CANVAS_OFFSET_Y
//       );
//       ctx.stroke();

//       ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
//     }
//   }
// }

// function handleEnd(evt) {
//   evt.preventDefault();
//   let touches = evt.changedTouches;

//   for (let i = 0; i < touches.length; i++) {
//     let idx = ongoingTouchIndexById(touches[i].identifier);

//     if (idx >= 0) {
//       ctx.beginPath();
//       ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
//       ctx.lineTo(touches[i].pageX, touches[i].pageY);
//       //   ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 1, 0); // and a square at the end
//       ongoingTouches.splice(idx, 1); // remove it; we're done
//     }
//   }
// }

// function handleCancel(evt) {
//   evt.preventDefault();
//   console.log("touchcancel.");
//   let touches = evt.changedTouches;

//   for (let i = 0; i < touches.length; i++) {
//     let idx = ongoingTouchIndexById(touches[i].identifier);
//     ongoingTouches.splice(idx, 1); // remove it; we're done
//   }
// }

// function copyTouch({ identifier, pageX, pageY }) {
//   return { identifier, pageX, pageY };
// }

// function ongoingTouchIndexById(idToFind) {
//   for (var i = 0; i < ongoingTouches.length; i++) {
//     var id = ongoingTouches[i].identifier;

//     if (id == idToFind) {
//       return i;
//     }
//   }
//   return -1; // not found
// }

// if (canvas) {
//   canvas.addEventListener("mousemove", onMouseMove);
//   canvas.addEventListener("mousedown", startPainting);
//   canvas.addEventListener("mouseup", stopPainting);
//   canvas.addEventListener("mouseleave", stopPainting);
//   canvas.addEventListener("click", handleCanvasClick);
//   canvas.addEventListener("contextmenu", handleCM); // 우클릭 방지

//   // For mobile & etc. (https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
//   canvas.addEventListener("touchstart", handleStart);
//   canvas.addEventListener("touchend", handleEnd);
//   canvas.addEventListener("touchcancel", handleCancel);
//   canvas.addEventListener("touchmove", handleMove);
// }

// if (canvas.getContext) {
//   window.addEventListener("resize", resizeCanvas);
// }

// //* Array.from(object): object로부터 array를 만든다.
// /*
// It's just an easier way of registering an event on each button,
// this is because we want to later get the button that was clicked.
// */
// Array.from(colors).forEach((color) => {
//   color.addEventListener("click", handleColorClick);
// });

// if (range) {
//   range.addEventListener("input", handleRangeChange);
// }

// if (mode) {
//   mode.addEventListener("click", handleModeClick);
// }

// if (saveBtn) {
//   saveBtn.addEventListener("click", handleSaveClick);
// }

// if (saveBtn) {
//   clearBtn.addEventListener("click", handleClearClick);
// }
//! TODO: Compare the code and modified later.

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const lineWidthRange = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const colors = document.getElementsByClassName("jsColor");

// vasic settings
const INIT_COLOR = "#2c2c2c";

// default canvas setting
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// default context setting
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.strokeStyle = INIT_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// flag for painting & filling mode
let painting = false;
let filling = false;

// store the touch coordinates of canvas for mobile.
let ongoingTouches = [];

// mobile layout offset.
let offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
let offsetY = canvas.offsetTop;

function handleResizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
  offsetY = canvas.offsetTop;
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick() {
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

function handleClearClick() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleColorClick(event) {
  const targetColor = event.target.style.backgroundColor;
  ctx.strokeStyle = targetColor;
  ctx.fillStyle = targetColor;
}

function handleCM(event) {
  event.preventDefault();
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function getOffsetCoordinate(coordinate) {
  const x = coordinate.pageX - offsetX;
  const y = coordinate.pageY - offsetY;
  return { x, y };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function handleTouchStart(event) {
  event.preventDefault();
  let touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    ctx.beginPath();
    const lastCoord = getOffsetCoordinate(ongoingTouches[i]);
    ctx.moveTo(lastCoord.x, lastCoord.y);

    if (filling === true) {
      handleCanvasClick();
    }
  }
}

function handleTouchMove(event) {
  event.preventDefault();
  let touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      const currentCoord = getOffsetCoordinate(touches[idx]);
      ctx.lineTo(currentCoord.x, currentCoord.y);
      ctx.stroke();
      ongoingTouches.slice(idx, 1, copyTouch(touches[i]));
    }
  }
}

function handleTouchEnd(event) {
  event.preventDefault();
  let touches = event.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ongoingTouches.splice(idx, 1); // remove it; we're done
    }
  }
}

function handleTouchCancel(event) {
  event.preventDefault();
  let touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

if (canvas) {
  window.addEventListener("resize", handleResizeCanvas);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);

  // for mobile.
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchend", handleTouchEnd);
  canvas.addEventListener("touchcancel", handleTouchCancel);
}

if (lineWidthRange) {
  lineWidthRange.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (clear) {
  clear.addEventListener("click", handleClearClick);
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});
