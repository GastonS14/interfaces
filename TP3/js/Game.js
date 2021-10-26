let agachado = false;
let currentTime = parseInt( userTime.value ); 
let timer = 0;
var start = 0;

class Game {

    constructor() {
        this.obstacles = [];
    }

    // Set up
    init() {
        this.generateObstacles();
        this.play();
    }

    generateObstacles() {
        let dolarObstacle = new Obstacle(dolar, "900px", "71%", "50px", "38px");
        this.obstacles.push(dolarObstacle);
        this.obstacles.push(new Obstacle(dolarJoker, "40%", "63%", dolarObstacle.getWidth(), dolarObstacle.getHeight()));
        this.obstacles.push(new Obstacle(joker, "1150px", "63%", "70px", "120px"));
    }

    // Events => Actions
    jump() {
        setTimeout( () => {
            batman.classList.remove("jump");
        }, 1500);

        batman.classList.add("jump");
    }

    play() {
        this.chrometer();
        // if it crashes, it loses
        /*
        setInterval( () => {
            if(this.isCrashed() || this.hasWinner()) {
                document.getElementById("winner").classList.remove("dontShow");
                document.getElementById("gameOver").classList.remove("dontShow");
                clearInterval();
            }
        }, 1000)
        */
    }   

    isCrashed() {
        return false;
    }

    hasWinner() {
        return false;
    }

    crouch () {
        if ( event.key === 's' ) {
            if ( !agachado ){
                agachado = true;
                batman.classList.add ("dodge");
            }
        }
    }

    run () {
        if ( agachado ) {
            agachado = false;
            batman.classList.remove("dodge");
        }
    }

    setDifficulty () {
        time.innerHTML = userTime.value;
        chrometer.innerHTML = userTime.value;
        currentTime = parseInt( userTime.value );
    }

    beforePlay () {
        document.getElementById("customize").classList.add("dontShow");
        let aux = Array();
        aux.push( document.getElementById("character") );
        aux.push( document.getElementById("joker") );
        aux.push( document.getElementById("dolarJoker") );
        aux.push( document.getElementById("dolar") );
        aux.forEach( e => {
            e.classList.remove("dontShow");
        });
        document.getElementById("divChrometer").classList.remove("dontShow");
        document.getElementById("divDollars").classList.remove("dontShow");
        //document.getElementById("gameOver").classList.remove("dontShow");
    }

    showMenu () { 
        document.getElementById("customize").classList.remove("dontShow");
        let aux = Array();
        aux.push( document.getElementById("character") );
        aux.push( document.getElementById("joker") );
        aux.push( document.getElementById("dolarJoker") );
        aux.push( document.getElementById("dolar") );
        aux.forEach( e => {
            e.classList.add("dontShow");
        });
    }

    showWinner () { 
        document.getElementById("winner").classList.remove("dontShow");
    }

    restart () { 
        this.showMenu();
        document.getElementById("winner").classList.add("dontShow");
        document.getElementById("gameOver").classList.add("dontShow");
    }

    chrometer () { 
        let setTimee = this.setTime;
        let gameOverr = this.gameOver;
        timer = setInterval ( function() { setTimee ( currentTime--, gameOverr ) }, 1000 );
    }

    setTime ( value, func ) { 
        if ( value === 0 ) 
            func();
        chrometer.innerHTML = value;
    }

    gameOver () { 
        document.getElementById("gameOver").classList.remove("dontShow");
        clearInterval( timer );
    }
}

