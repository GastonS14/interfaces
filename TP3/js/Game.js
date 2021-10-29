let currentTime = parseInt( userTime.value ); 
let timer = 0;
let amountOfDollars = document.getElementById("amountDollars");
let gameLoop = 0;

class Game {
    constructor() {
        this.obstacles = [];
        this.frameRate = 500;
    }

    // Set up
    init() {
        this.generateObstacles();
        this.play();
    }

    // positionX original = 900px , 40%,  1150px
    generateObstacles() {
        this.obstacles = [];
        let dolarObstacle = new Obstacle(dolar, "1500px", "76%", "50px", "38px", 200, false);
        this.obstacles.push(dolarObstacle);
        this.obstacles.push(new Obstacle(dolarJoker, "80%", "68%", dolarObstacle.getWidth(), dolarObstacle.getHeight(),-100, false));
        this.obstacles.push(new Obstacle(joker, "1850px", "67.5%", "70px", "120px", 0, true ));
    }

    // Events => Actions
    jump() {
        console.log( "jump" );
        setTimeout( () => {
            batman.classList.remove("jump");
            isJumping = false;
        }, 1500);
        batman.classList.add("jump");
    }

    play() {
        /*
            batman.x + batman.width = 316
        */
        this.chrometer();
        const frameRate = this.frameRate;
        let element = 0, elementX = 0, elementY = 0, batmanPos = 0;
        let obstacles = this.obstacles;
        let gOver = this.gameOver;
        gameLoop = setInterval( () => { // MATAR ESTE INTERVALO EN GAMEOVER Y EN WON ;
            obstacles.forEach( obstacle => {
                obstacle.restartPosX();
                element = obstacle.name.getBoundingClientRect();
                elementX = parseInt( element.x );
                elementY = parseInt( element.y );
                batmanPos = batman.getBoundingClientRect();
                let batmanPosY0 = parseInt ( batmanPos.y );
                let batmanPosY1 = parseInt (batmanPosY0 )+ 160; // 160 = height de batman
                // 280 y 320 
                if ( elementX >= batmanPos.x &&  elementX <= batmanPos.x + batmanPos.width ) {
                    if ( elementY >= batmanPosY0 && elementY < batmanPosY1 || 
                            elementY+element.height >= batmanPosY0 && elementY+element.height <= batmanPosY1  ) { 
                        if ( obstacle.isKiller ) {
                            gOver();
                            obstacle.name.style.left = elementX + parseInt(obstacle.width) + 'px';               
                            clearInterval( gameLoop );
                        } else {
                            let currentDollars = parseInt( amountOfDollars.innerHTML );
                            if ( !(currentDollars === 0 && obstacle.value < 0) )
                                amountOfDollars.innerHTML = currentDollars + obstacle.value;
                            obstacle.setPositionX( "5000px" )
                        }
                    }
                } 
            })
        }, frameRate)
    }   

    crouch () {
        batman.classList.add ("dodge");
    }

    run () {
        batman.classList.remove("dodge");
    }

    setUpDifficulty () {
        this.setUpTime();
        this.setSpeed();
    }

    setUpTime () { 
        time.innerHTML = userTime.value;
        chrometer.innerHTML = userTime.value;
        currentTime = parseInt( userTime.value );
    }

    setSpeed() { 
        switch ( userTime.value ) {
            case '90':
                this.setCssSpeed( '7s' );
                this.frameRate = 700;
                break;
            case '60':
                this.setCssSpeed( '5s' );
                this.frameRate = 500;
                break;
            case '30':
                this.setCssSpeed( '3s' );
                this.frameRate = 300;
                break;
        }
        Obstacle.setFrameRate( this.frameRate * 3 );
    }

    setCssSpeed ( value ) {
        html.style.setProperty( "--obstacles-velocity", value );
        html.style.setProperty( "--bg-velocity", value );
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
        containerTimer.classList.remove("advice");
        containerChrometer.classList.remove("scale");
    }

    showWinner () { 
        document.getElementById("winner").classList.remove("dontShow");
    }

    restart () { 
        this.showMenu();
        this.setUpDifficulty();
        amountOfDollars.innerHTML = 0;
        document.getElementById("winner").classList.add("dontShow");
        document.getElementById("gameOver").classList.add("dontShow");
    }

    chrometer () { 
        let setTimee = this.setTime;
        let hasWon = this.won;
        timer = setInterval ( function() { setTimee ( currentTime--, hasWon ) }, 1000 );
    }

    setTime ( value, func ) { 
        if ( value == userTime.value/2 ) {
            containerTimer.classList.add("advice");
            containerChrometer.classList.add("scale");
        }
        if ( value === 0 ) 
            func();
        chrometer.innerHTML = value;
    }

    won () { 
        document.getElementById("winnerName").innerHTML = userName;
        document.getElementById("winner").classList.remove("dontShow");
        clearInterval( timer );
        clearInterval( gameLoop );
        joker.classList.add("dontShow");
        dolar.classList.add( "dontShow" );
        dolarJoker.classList.add("dontShow");
    }

    gameOver () { 
        document.getElementById("gameOver").classList.remove("dontShow");
        clearInterval( timer );
        clearInterval( gameLoop );
        joker.classList.remove("move");
        dolar.classList.add( "dontShow" );
        dolarJoker.classList.add( "dontShow" );
    }

    startMovement() { 
        joker.classList.add("move");
        dolar.classList.add("move");
        dolarJoker.classList.add("move");
    }
}

