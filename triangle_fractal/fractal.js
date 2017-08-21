var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const triangleVertexRadius = 7;
const triangleVertexOffset = 10;
const triangleVertexColor = "#C82124";
const triangleEdgeLength = Math.max(canvas.width / 2, canvas.height);

const a = new Point(canvas.width / 2, triangleVertexOffset);
const b = new Point(a.x - triangleEdgeLength / 2, a.y + triangleEdgeLength * Math.sqrt(3)/2);
const c = new Point(a.x + triangleEdgeLength / 2, a.y + triangleEdgeLength * Math.sqrt(3)/2);

const intervalStepMs = 80;
var intervalMs = 300;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function drawDot(p, r, c) {
    context.beginPath();
    context.arc(p.x, p.y, r, 0, 2 * Math.PI);
    context.fillStyle = c;
    context.fill();
    context.stroke();
}

function drawTriangle() {
    drawDot(a, triangleVertexRadius, triangleVertexColor);
    drawDot(b, triangleVertexRadius, triangleVertexColor);
    drawDot(c, triangleVertexRadius, triangleVertexColor);
}

function dice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getNextDirection() {
    const roll = dice();
    if(roll <= 2)
        return a;
    else if(roll <=4)
        return b;

    return c;
}

function printIter() {
    const iterOffset = new Point(500, 40);
    context.font = "20px Georgia";
    context.fillStyle = "#000000";
    context.clearRect(0, 0, iterOffset.x + 200, iterOffset.y + 10);
    context.fillText("Iteration: " + iter, iterOffset.x, iterOffset.y);
}

var isRestarted = true;
var iter = 0;
var currentPoint = new Point(canvas.width / 2, canvas.height / 4);
var draw = function() {
   if(isRestarted) {
        isRestarted = false;

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawTriangle();

        iter = 0;
    }

    drawDot(currentPoint, triangleVertexRadius - 4, "#00FF00");

    const next = getNextDirection();
    currentPoint = new Point((currentPoint.x + next.x) / 2, (currentPoint.y + next.y) / 2);

    printIter();

    iter++;
}

var intervalId = setInterval(draw, intervalMs);

function restart() {
    isRestarted = true;
    stop();
    start();
}

function start() {
    if(intervalId == 0 )
        intervalId = setInterval(draw, intervalMs);
}

function stop() {
    clearInterval(intervalId);
    intervalId = 0;
}

function increaseSpeed() {
    if(intervalMs > intervalStepMs)
        intervalMs -= intervalStepMs;
    else if(intervalMs > 1)
        intervalMs -= 1;

    stop();
    start();
}

function decreaseSpeed() {
    intervalMs += intervalStepMs;
    stop();
    start();
}
