let isCrouched = false;

class Game {

    constructor() {
        this.obstacles = [];
        this.userName = "User" // Default user name
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
        if(event.key === 'w') {
            setTimeout( () => {
                batman.classList.remove("jump");
            }, 1500);

            batman.classList.add("jump");
        }
    }

    play() {
        // if it crashes, it loses
        let intervalId;
        intervalId = setInterval( () => {
            if(this.isCrashed() || this.hasWinner()) {
                // Can we clean all the calls or the last?
                // Since we don't have the id that returned by the SetInterval function at this point
                clearInterval(intervalId);
            }
        }, 1000)
    }   

    isCrashed() {
        return false;
    }

    hasWinner() {
        return false;
    }

    crouch () {
        if ( event.key === 's' ) {
            if ( !isCrouched ){
                isCrouched = true;
                batman.classList.add ("dodge");
            }
        }
    }

    run() {
        if ( isCrouched ) {
            isCrouched = false;
            batman.classList.remove("dodge");
        }
    }

    setDifficulty () {
        time.innerHTML = userTime.value;
    }

    setUserName() {
        this.userName = user.value;
    }

    getUserName() {
        return this.userName;
    }

    /**
     * saca el dont show
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
    }
}

