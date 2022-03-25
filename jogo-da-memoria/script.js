let order =[];
let clickedOrder = [];
let score = -1;

const points = document.getElementById('points');
const level = document.getElementById('level');
const moves = document.getElementById('moves');

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
 
let lightColor = (element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
    }, number);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number*1.5);
}

let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break; 
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível...`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },500);
}
  
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    }else if(color == 2) {
        return yellow;
    }else if(color == 3) {
        return blue;
    }
}

let nextLevel = () => {
    score++;
    shuffleOrder();
    points.innerHTML = "pontos: " + score;
    level.innerHTML = "nivel: " + score;
    moves.innerHTML = "movimentos: " + order.length;
}

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo! :(\nClique em OK para inicar um novo  jogo`);
    order = [];
    clickedOrder = [];
    
    playGame();
}

let playGame = () => {
    alert('Bem vindo(a) ao jogo da memória! Iniciando novo jogo...');
    score = -1;

    nextLevel();
}


green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();