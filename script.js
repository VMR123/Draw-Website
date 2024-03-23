const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    ctx = canvas.getContext("2d");

// Global variables with default value
let selectedTool = "rectangle",
    selectedColor = "#fff", // Default color of the canvas
    shapes = []; // Array to store shapes

// Function to set canvas background
const setCanvasBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Event listener for loading the window
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

// Function to draw shapes
const drawShape = (tool, x, y) => {
    ctx.beginPath();
    switch (tool) {
        case "rectangle":
            // Drawing a rectangle
            ctx.rect(x - 75, y - 50, 150, 100); // Adjusted the horizontal length
            break;
        case "circle":
            // Drawing a circle
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            break;
        case "triangle":
            // Drawing a triangle
            ctx.moveTo(x, y - 50);
            ctx.lineTo(x - 50, y + 50);
            ctx.lineTo(x + 50, y + 50);
            ctx.closePath();
            break;
        case "diamond":
            // Drawing a diamond
            ctx.moveTo(x, y - 50);
            ctx.lineTo(x - 50, y);
            ctx.lineTo(x, y + 50);
            ctx.lineTo(x + 50, y);
            ctx.closePath();
            break;
        case "octagon":
            // Drawing an octagon
            ctx.moveTo(x + 40, y - 20);
            ctx.lineTo(x + 20, y - 40);
            ctx.lineTo(x - 20, y - 40);
            ctx.lineTo(x - 40, y - 20);
            ctx.lineTo(x - 40, y + 20);
            ctx.lineTo(x - 20, y + 40);
            ctx.lineTo(x + 20, y + 40);
            ctx.lineTo(x + 40, y + 20);
            ctx.closePath();
            break;
    }
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = selectedColor;
    ctx.fill();
}

// Function to clear canvas and redraw shapes
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
    shapes.forEach(shape => {
        drawShape(shape.tool, shape.x, shape.y);
    });
}

// Event listener for tool buttons
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedTool = btn.id;
        // Draw shape at the center of the canvas and add it to the shapes array
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        drawShape(selectedTool, centerX, centerY);
        shapes.push({
            tool: selectedTool,
            x: centerX,
            y: centerY
        });
    });
});

let selectedShape = null;

// Event listeners for mouse actions
canvas.addEventListener("mousedown", (e) => {
    // Check if the mouse click is inside any of the shapes
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        drawShape(shape.tool, shape.x, shape.y);
        if (ctx.isPointInPath(e.offsetX, e.offsetY)) {
            selectedShape = shape;
            return;
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (selectedShape) {
        clearCanvas();
        selectedShape.x = e.offsetX;
        selectedShape.y = e.offsetY;
        shapes.forEach(shape => {
            drawShape(shape.tool, shape.x, shape.y);
        });
    }
});

canvas.addEventListener("mouseup", () => {
    selectedShape = null;
});
const clearCanvasBtn = document.querySelector(".clear-canvas");

clearCanvasBtn.addEventListener("click", clearCanvas);

