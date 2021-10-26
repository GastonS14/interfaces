let agachado = false;
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
        // if it crashes, it loses
        setInterval( () => {
            if(this.isCrashed() || this.hasWinner()) {
                // Can we clean all the calls or the last?
                // Since we don't have the id that returned by the SetInterval function at this point
                clearInterval();
            }
        }, 1000)
    }   

    isCrashed() {
        return false;
    }

    hasWinner() {
        return false;
    }

    agachate () {
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
}

