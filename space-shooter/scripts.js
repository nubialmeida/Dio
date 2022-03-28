const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['./img/nave.png', './img/nave2.png'];
const laserImg = ['./img/peixe.png', './img/gelo.png', './img/laser1.png', './img/laser2.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button')

function flyAhip(event){
    console.log(event.key);
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    }else{
        let position = parseInt(topPosition);
        position -=50
        yourShip.style.top = `${position}px`;
    }
}

function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    }else{
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top= `${position}px`;
    }  
}

function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left')); 
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top')); 
    let newLaser = document.createElement('img');
    newLaser.src = laserImg[Math.floor(Math.random()*laserImg.length)];
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition -10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if(checkLaserCollision(laser,alien)) {
                alien.src= './img/explosao.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }    
    }, 10);
}

function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 6.6)*50 + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')){
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }         
    }, 30);
}

function checkLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop -20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(laser.style.left);
    let alienBottom = alienTop -30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        }else {
            return false;
        }
    } else{
        return false;
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame(){
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown',flyAhip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

function gameOver(){
    window.addEventListener('keydown', flyAhip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('GAME OVER!');
        yourShip.style.top="25px";
        startButton.style.display= "block";
        instructionsText.style.display="block";
    });
}