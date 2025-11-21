
let canvas = document.getElementById("gameCanvas");
let score = 0;
let dx = 10;
let dy =0;
let foodX;
let foodY;

//getting canvas 2d context
ctx = canvas.getContext("2d")

//snake is array of coordinates
let snake = [{x:150,y:150},{x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150}];

main();
createFood();

function makeSnake(snakeBody){
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakeBody.x,snakeBody.y,10,10);
    ctx.strokeRect(snakeBody.x,snakeBody.y,10,10);
}

function drawSnake()
{
    snake.forEach(makeSnake);
}

function advanceSnake()
{
    const head = { x: snake[0].x + dx , y : snake[0].y + dy}

    snake.unshift(head); // add at beginning of array 

    const didEatFood = snake[0].x === foodX && snake[0].y ===foodY;
    if(didEatFood)
    {
        score +=10;
        document.getElementById('score').innerHTML = score;
        createFood();
    }
    else
    {
        snake.pop(); //pop the last element so lenght remains same
    }

}


function clearCanvas()
{
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}



//change the snake direction

//when arrow keys are pressed

function changeDirection(event)
{
    //key codes
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
    const keyPressed = event.keyCode;

    //directions
    const goingUp = dy === -10; 
    const goingDown = dy === 10; 
    const goingRight = dx === 10; 
    const goingLeft = dx === -10; 
    
    //to prevent snake reversing
    if(keyPressed === LEFT_KEY && !goingRight)
        {
        dx = -10;
        dy = 0; 
    }
    
    if(keyPressed === RIGHT_KEY && !goingLeft)
        {
            dx = 10;
            dy = 0; 
        }
        
        if(keyPressed === DOWN_KEY && !goingUp)
            {
                dx = 0;
                dy = 10; 
            }
            
    if(keyPressed === UP_KEY && !goingDown)
    {
        dx = 0;
        dy = -10; 
    }
    
}

document.addEventListener("keydown",changeDirection);

//snake food

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}


function createFood ()
{
    foodX = randomTen(0,gameCanvas.width-10);
    foodY = randomTen(0,gameCanvas.height -10);
    
    snake.forEach(
        function isFoodOnSnake(part)
        {
            const foodIsOnSnake = part.x === foodX && part.y === foodY ;
            if(foodIsOnSnake)
            {
                createFood();
            }
        }
    );
}

function drawFood()
{
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX,foodY,10,10);
    ctx.strokeRect(foodX,foodY,10,10);
}


//we are in endgame now

function didGameEnd(){

    //snake collide
    for(let i = 4; i <snake.length; i++)
    {
         const didCollide = snake[i].x === snake[0].x   &&   snake[i].y === snake[0].y;
         if(didCollide) return true;
    }

    //snake hitLeftWall
    const hitLeftWall = snake[0].x < 0;

    //snake hitRightWall
    const hitRightWall = snake[0].x > gameCanvas.width -10;

    //snake hitTopWall
    const hitTopWall = snake[0].y < 0;

    //snake hitBottomWall
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall ||hitTopWall || hitBottomWall;

    
}


function main() {

    if(didGameEnd())
    {
        return;
    }

    setTimeout(function onTick()
    {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        main();
    
    }, 100);
}


