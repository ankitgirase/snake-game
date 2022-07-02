
//Game Constants and variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio('Snake.mp3');
const gameOverSound = new Audio('GameOver.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime=0;
let snakeArr = [
    {x:10, y:15}
];
let score = 0;

food = {x:13, y:15};

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    // console.log(ctime);
    gameEngine();
}

function isCollide(snake){
    //if snake bumps into itself
    for(let i=1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x===19 || snake[0].x<1 || snake[0].y===19|| snake[0].y<1){
        return true;
    }
    return false;
}

function gameEngine(){
    //part 1 : updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Oops!! Game over.Press any key to play again :)")
        scoreBox.innerHTML ='Score: '+0;
        snakeArr = [
            {x:12, y:15}
        ];
        musicSound.play();
        score = 0;
    }

    // what if snake its the food succesfully?
    // then increament the score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score +=1;
        scoreBox.innerHTML='score: ' + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())} // generates a random location for food between (2,2) to (16,16)
        //Math.round(a+(b-a)*Math.random()) --> generates a random number between a to b
    }

    //Moving the snake
    for (let i = snakeArr.length-2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    //Display the Food
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}


//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}; // start the Game
    musicSound.play();
    moveSound.play();

    switch (e.key) {
        
        case "ArrowUp":
        console.log('ArrowUp');
        inputDir.x = 0;    
        inputDir.y = -1;    
        break;
        
        
        case "ArrowDown":
            console.log('ArrowDown');    
            inputDir.x = 0;     
            inputDir.y = 1;    
            break;
            
            
            case "ArrowLeft":
                console.log('ArrowLeft');    
                inputDir.x = -1;     
                inputDir.y = 0;    
                break;
                
                
                case "ArrowRight":
                    //  case "D":
                    console.log('ArrowRight');    
                    inputDir.x = 1;    
                    inputDir.y = 0;    
        break;
    
        default:
         break;
    }
});
