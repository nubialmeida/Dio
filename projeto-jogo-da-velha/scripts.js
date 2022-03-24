var jogador,
    vencedor = null;
var jogadorSelecionado = document.getElementById("jogador-selecionado");
var vencedorSelecionado = document.getElementById("vencedor-selecionado");
var quadrados = document.getElementsByClassName("quadrado");
mudarJogador((valor = "X"));

function escolherQuadrado(id) {

    if(vencedor !== null) {
        return;
    }
    var quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== "-") {
        return;
    }

    quadrado.innerHTML = jogador;
    quadrado.style.color = "#000";

    if (jogador === "X") {
        jogador = "O";
    } else {
        jogador = "X";
    }

    mudarJogador(jogador);
    checaEmpate();
    checaVencedor();
}

function mudarJogador(valor) {
    jogador = valor;
    jogadorSelecionado.innerHTML = valor;
    if(valor == "O" ){
        jogadorSelecionado.style.color = "#26d8dd";
    } else {
        jogadorSelecionado.style.color = "#26d8dd";
    }
}

function checaVencedor() {
    var quadrado1 = document.getElementById(1);
    var quadrado2 = document.getElementById(2);
    var quadrado3 = document.getElementById(3);
    var quadrado4 = document.getElementById(4);
    var quadrado5 = document.getElementById(5);
    var quadrado6 = document.getElementById(6);
    var quadrado7 = document.getElementById(7);
    var quadrado8 = document.getElementById(8);
    var quadrado9 = document.getElementById(9);

    if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
        mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado4, quadrado5, quadrado6)) {
        mudaCorQuadrado(quadrado4, quadrado5, quadrado6);
        mudarVencedor(quadrado4);
        return;
    }

    if (checaSequencia(quadrado7, quadrado8, quadrado9)) {
        mudaCorQuadrado(quadrado7, quadrado8, quadrado9);
        mudarVencedor(quadrado7);
        return;
    }

    if (checaSequencia(quadrado1, quadrado4, quadrado7)) {
        mudaCorQuadrado(quadrado1, quadrado4, quadrado7);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado2, quadrado5, quadrado8)) {
        mudaCorQuadrado(quadrado2, quadrado5, quadrado8);
        mudarVencedor(quadrado2);
        return;
    }

    if (checaSequencia(quadrado3, quadrado6, quadrado9)) {
        mudaCorQuadrado(quadrado3, quadrado6, quadrado9);
        mudarVencedor(quadrado3);
        return;
    }

    if (checaSequencia(quadrado1, quadrado5, quadrado9)) {
        mudaCorQuadrado(quadrado1, quadrado5, quadrado9);
        mudarVencedor(quadrado1);
        return;
    }

    if (checaSequencia(quadrado3, quadrado5, quadrado7)) {
        mudaCorQuadrado(quadrado3, quadrado5, quadrado7);
        mudarVencedor(quadrado3);
    }
} 

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
    let corDeFundo;
    if(quadrado1.innerHTML == "O") {
        corDeFundo = "#26d8dd";
    } else {
        corDeFundo = "#f43c81"
    }
    quadrado1.style.backgroundColor = corDeFundo;
    quadrado2.style.backgroundColor = corDeFundo;
    quadrado3.style.backgroundColor = corDeFundo;
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
    var eigual = false;

    if (
        quadrado1.innerHTML !== "-" &&
        quadrado1.innerHTML === quadrado2.innerHTML &&
        quadrado2.innerHTML === quadrado3.innerHTML
    )
        eigual = true;

    return eigual;
}

function reiniciar() {
    vencedor = null ;
    vencedorSelecionado.innerHTML = '';

    for(var i = 1; i <= 9; i++) {
        var quadrado = document.getElementById(i);
        quadrado.style.backgroundColor = '#eee';
        quadrado.style.color = '#eee';
        quadrado.innerHTML ='-';
    }
    mudarJogador(valor= 'X');
}

function checaEmpate() {
    let tudoEstaMarcado = true;
    for(var i = 1; i <= 9; i++) {
        var quadrado = document.getElementById(i);
        if(quadrado.innerHTML == "-") {
            tudoEstaMarcado = false;
        }
    }
    if(tudoEstaMarcado == true) vencedorSelecionado.innerHTML = "Empate";
}