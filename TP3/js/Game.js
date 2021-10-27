let agachado = false;
let currentTime = parseInt( userTime.value ); 
let timer = 0;
var start = 0;
let amountOfDollars = document.getElementById("amountDollars");

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
        this.obstacles = [];
        let dolarObstacle = new Obstacle(dolar, "900px", "76%", "50px", "38px", 200, false);
        this.obstacles.push(dolarObstacle);
        this.obstacles.push(new Obstacle(dolarJoker, "40%", "68%", dolarObstacle.getWidth(), dolarObstacle.getHeight(),-100, false));
        this.obstacles.push(new Obstacle(joker, "1150px", "67.5%", "70px", "120px", 0, true ));
    }

    // Events => Actions
    jump() {
        setTimeout( () => {
            batman.classList.remove("jump");
        }, 1500);
        batman.classList.add("jump");
    }

    play() {
        /*
            batman.x + batman.width = 316
        */
        this.chrometer();
        let element = 0, elementX = 0, elementY = 0, batmanPos = 0;
        let obstacles = this.obstacles;
        let gOver = this.gameOver;
        let interval = setInterval( () => {
            obstacles.forEach( obstacle => {
                obstacle.restartPosX();
                element = obstacle.name.getBoundingClientRect();
                elementX = parseInt( element.x );
                elementY = parseInt( element.y );
                batmanPos = batman.getBoundingClientRect();
                let batmanPosY0 = parseInt ( batmanPos.y );
                let batmanPosY1 = parseInt (batmanPosY0 )+ 160; // 160 = height de batman
                if ( elementX >= 280 &&  elementX <= 320 && elementY >= batmanPosY0 && elementY <= batmanPosY1  ){ 
                    if ( obstacle.isKiller ) {
                        gOver();
                        obstacle.name.style.left = elementX + parseInt(obstacle.width) + 'px';               
                        clearInterval( interval );
                    } else {
                        let currentDollars = parseInt( amountOfDollars.innerHTML );
                        if ( currentDollars === 0 && obstacle.value < 0 )
                            return;
                        else {
                            amountOfDollars.innerHTML = currentDollars + obstacle.value;
                        }
                        obstacle.setPositionX( "200px" )
                    }
                } 
            })
        }, 200)
    }   

    isCrashed( ) {
       return;
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
        this.startMovement();
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
        document.getElementById("divChrometer").classList.add("dontShow");
        document.getElementById("divDollars").classList.add("dontShow");
    }

    showWinner () { 
        document.getElementById("winner").classList.remove("dontShow");
    }

    restart () { 
        this.showMenu();
        this.setDifficulty();
        amountOfDollars.innerHTML = 0;
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
        joker.classList.remove("move");
        dolar.classList.remove("move");
        dolarJoker.classList.remove("move");
    }

    startMovement() { 
        joker.classList.add("move");
        dolar.classList.add("move");
        dolarJoker.classList.add("move");
    }
}

