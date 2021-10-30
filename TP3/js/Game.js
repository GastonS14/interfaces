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

    generateObstacles() {
        this.obstacles = [];
        let topJoker = "67.5%", topDolar = "76%", topDolarJoker = "68%";
        if ( background === 'city' ){
            topJoker = "78%"
            topDolar = "87%"
            topDolarJoker = "78%";
        }
        let dolarObstacle = new Obstacle(dolar, "1500px", topDolar, "50px", "38px", 200, false);
        this.obstacles.push(dolarObstacle);
        this.obstacles.push(new Obstacle(dolarJoker, "80%", topDolarJoker, dolarObstacle.getWidth(), dolarObstacle.getHeight(),-100, false));
        this.obstacles.push(new Obstacle(joker, "1850px", topJoker, "70px", "120px", 0, true ));
    }

    // Events => Actions
    jump() {
        setTimeout( () => {
            batman.classList.remove("jump");
            isJumping = false;
        }, 1500);
        batman.classList.add("jump");
    }

    /**
     * Meneja el gameLoop y la logica general del juego.
     */
    play() {
        this.chrometer();
        const frameRate = this.frameRate;
        let element = 0, elementX = 0, elementY = 0, batmanPos = 0;
        let obstacles = this.obstacles;
        let gOver = this.gameOver;
        gameLoop = setInterval( () => {
            obstacles.forEach( obstacle => {
                obstacle.restartPosX();
                element = obstacle.name.getBoundingClientRect();
                elementX = parseInt( element.x );
                elementY = parseInt( element.y );
                batmanPos = batman.getBoundingClientRect();
                let batmanPosY0 = parseInt ( batmanPos.y );
                let batmanPosY1 = parseInt (batmanPosY0 )+ 160;
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

    /**
     * Agachado
     */
    crouch () {
        batman.classList.add ("dodge");
        if ( background === 'city' ) 
            batman.classList.add("dodgeInCity");
    }

    run () {
        batman.classList.remove("dodge");
        batman.classList.remove("dodgeInCity");
    }

    /**
     * Configura la velocidad y el tiempo del juego.
     */
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

    /**
     * Prepara todo para iniciar el juego, saca clases que no se deben mostrar y agrega clases que se deben mostrar.
     */
    beforePlay () {
        document.getElementById("customize").classList.add("dontShow");
        let aux = Array();
        aux.push( batman );
        aux.push( joker );
        aux.push( dolarJoker );
        aux.push( dolar );
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
        batman.classList.remove("die");
        batman.classList.remove("dieInCity");
        batman.classList.remove("won");
        batman.classList.remove("wonInCity");
        Game.startParallax();
    }

    showWinner () { 
        document.getElementById("winner").classList.remove("dontShow");
    }

    /**
     * Vuelve al menu principal
     */
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
            containerChrometer.classList.add("scale");
            if ( background === 'city' )
                containerTimer.classList.add("adviceInCity");
            else
                containerTimer.classList.add("advice");
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
        batman.classList.add("won");
        if ( background === 'city')
            batman.classList.add( "wonInCity");
        Game.stopParallax();
    }

    gameOver () { 
        document.getElementById("gameOver").classList.remove("dontShow");
        clearInterval( timer );
        clearInterval( gameLoop );
        joker.classList.remove("move");
        dolar.classList.add( "dontShow" );
        dolarJoker.classList.add( "dontShow" );
        batman.classList.add("die");
        if ( background === 'city' )
            batman.classList.add("dieInCity");
        Game.stopParallax();
    }

    startMovement() { 
        joker.classList.add("move");
        dolar.classList.add("move");
        dolarJoker.classList.add("move");
    }

    static stopParallax () { 
        let layers = document.querySelectorAll(".layer");
        layers.forEach( layer => { 
            layer.style.animationPlayState = 'paused';
        });
    }

    static startParallax () { 
        let layers = document.querySelectorAll(".layer");
        layers.forEach( layer => { 
            layer.style.animationPlayState = 'running';
        });
    }
}

