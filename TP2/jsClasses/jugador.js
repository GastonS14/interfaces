class jugador { 
    
    constructor ( name, boarSize, canvas, posXchips, posYchips) {
        this.canvas = canvas;
        this.boarSize = boarSize; 
        this.name = name;
        this.img = new Image();
        this.img.src = './img/fichaNegra.png';
        this.posXchips = posXchips; 
        this.posYchips = posYchips;
        this.fichas = new Array();
        this.cantMaxFichas = boarSize*boarSize/2;
    }

    renderFichas() { 
        let amountFichas = Math.round( this.cantMaxFichas );
        let count = 0; 
        this.fichas = new Array();
        let fichas = this.fichas;
        let initX = this.posXchips;
        let initY = this.posYchips;
        
        // El jugador dos, va a empezar la renderizacion en y = 220 
        // Para ello, en cada instancia de jugador deberiamos pasarle esa posicion 
        
        this.img.onload = function () {
            for (let x = initX; x < canvas.width; x+=50 ) {
                for (let y = initY; y < canvas.height-48; y+=48) {
                    if ( count < amountFichas ) {
                        const f = new ficha( x, y); 
                        f.setPosition( x, y);      
                        f.draw( x, y);
                        fichas.push( f );  
                        count++;
                    } else {

                        break;
                    }
                }  
            } 
        }
    }
    jaja () {
        let amountFichas = Math.round( this.cantMaxFichas );
        let count = 0; 
        this.fichas = new Array();
        let fichas = this.fichas;
        let initX = this.posXchips;
        let initY = this.posYchips;
        
        // El jugador dos, va a empezar la renderizacion en y = 220 
        // Para ello, en cada instancia de jugador deberiamos pasarle esa posicion 
        
        for (let x = initX; x < canvas.width; x+=50 ) {
            for (let y = initY; y < canvas.height-48; y+=48) {
                if ( count < amountFichas ) {
                    const f = new ficha( x, y); 
                    f.setPosition( x, y);      
                    f.draw( x, y);
                    fichas.push( f );  
                    count++;
                } else {

                    break;
                }
            }
        }
    }

    drawFichas () { 
        const fichas = this.fichas;
            fichas.forEach( ficha => {
                ficha.draw( ficha.getPosX(), ficha.getPosY() );
            });
    }

    setCantMaxFichas ( newCantidad ) { 
        this.cantMaxFichas = newCantidad;
        this.jaja();
    }

    setBoardSize ( newSize ) { 
        this.boarSize = newSize;
        this.setCantMaxFichas( newSize * newSize / 2 );
    }


    mouseIsDown ( posX, posY ) { 
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i]; 
            if ( ficha.isInside( posX, posY ) ) { 
                ficha.resaltar();
                return ficha;
            }
        }
        return null;
    }

    mouseIsUp () { 
        console.log("jha")
    }

    mouseIsMoving () { 
        console.log("AJjaj")
    }

    removeFicha ( ficha ) { 
        for (let i = 0; i < this.fichas.length; i++) {
            if ( this.fichas[i].getPosX() === ficha.getPosX() && this.fichas[i].getPosY() === ficha.getPosY())
                this.fichas.splice(i,1);
        }
    }

    changeChipColor() { 
       
    }

}


