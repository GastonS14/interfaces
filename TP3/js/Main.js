const batman = document.querySelector(".batman");
const dolar = document.querySelector(".dolar");
const dolarJoker = document.querySelector(".dolar-joker");
const joker = document.querySelector(".joker");

let game = new Game();
batman.addEventListener("click", game.jump);

game.init();
