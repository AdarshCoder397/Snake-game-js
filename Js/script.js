// Game constants and Variables
let inp_dir = {x:0,y:0};
let score = 0;
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const gameSound = new Audio('../music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
food = {x: 6, y: 7};
//Game functions

const main = (ctime) => {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
};
const isCollapse = (snake) => {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

const gameEngine = () => {
    //pt.1 - Updating the snake array
    if (isCollapse(snakeArr)){
        gameSound.pause();
        gameOverSound.play();
        inp_dir = {x:0,y:0};
        alert("Game Over! Press any key to play again!")
        snakeArr = [{x:13,y: 15}];
        score = 0;
        scoreBox.innerHTML = "Score: 0" ;
    }
    // Incrementing the score and food after eating!
    if (snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x+inp_dir.x,y:snakeArr[0].y+inp_dir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >=  0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inp_dir.x;
    snakeArr[0].y += inp_dir.y;

    //pt.2 - Render the snake and the food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        } 
        else{
            snakeElement.classList.add('snake');    
        }
        board.appendChild(snakeElement);
    });
    //Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food'); 
        board.appendChild(foodElement);
};
//Main logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
    let hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi-score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    gameSound.play();    
    moveSound.play();
    inp_dir = {x:0, y: 1} //Start the Game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inp_dir.x = 0;
            inp_dir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inp_dir.x = 0;
            inp_dir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inp_dir.x = -1;
            inp_dir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inp_dir.x = 1;
            inp_dir.y = 0;
            break;
        default:
            break;
    }
});