const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const botao = document.getElementById("botao");
// variavel que vai contar a quantidade de cartas viradas
let vitoria = 0;
let parabeniza = document.getElementsByClassName('parabens')[0];
//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        vitoria += 2;
        if(vitoria === 12) {
            parabenizar();
        }
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
     secondCard = null;
}

//função que embaralha as cartas
function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
};

//reseta tudo
function reset() {
    vitoria = 0;
    cards.forEach((card) => {
        card.removeEventListener('click', flipCard);
        card.classList.remove('flip');
    })
    resetBoard();
    setTimeout(() => {
        shuffle();
    cards.forEach((card) => {
        card.addEventListener('click', flipCard)
    })
    }, 1000)
    ;
}
//função que parabeniza o jogador
function parabenizar() {
    parabeniza.classList.toggle("parabenizar")
    setTimeout(() => {
        parabeniza.classList.toggle("parabenizar")
    },4500)
}
//adiciona evento de clique na carta
shuffle()
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
//botao de reset
botao.addEventListener('click', reset);