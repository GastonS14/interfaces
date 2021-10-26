const batman = document.querySelector(".batman");
const dolar = document.querySelector(".dolar");
const dolarJoker = document.querySelector(".dolar-joker");
const joker = document.querySelector(".joker");

let game = new Game();
batman.addEventListener("click", game.jump);
document.addEventListener("keydown", game.agachate );
document.addEventListener("keyup", game.run );

game.init();


