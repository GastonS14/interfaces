class jugador { 
    
    constructor ( name, boarSize, canvas ) {
        this.canvas = canvas;
        this.boarSize = boarSize; 
        this.name = name;
        this.fichas = new Array();
        const cantMaxFichas = boarSize*boarSize/2;
    }

    renderFichas() { 
        let amountFichas = Math.round(this.boarSize * this.boarSize / 2);
        let count = 0; 
        this.fichas = new Array();
        let fichas = this.fichas;
        
        // El jugador dos, va a empezar la renderizacion en y = 220 
        // Para ello, en cada instancia de jugador deberiamos pasarle esa posicion 
        let img = new Image();
        img.src = 'img/fichaNegra.png';
        
        img.onload = function () {
            for (let x = 550; x < canvas.width; x+=50 ) {
                for (let y = 18; y < canvas.height/3; y+=48) {
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

    drawFichas () { 
        const fichas = this.fichas;
            fichas.forEach( ficha => {
                ficha.draw( ficha.getPosX(), ficha.getPosY() );
            });
    }

    setCantMaxFichas ( newCantidad ) { 
        this.cantMaxFichas = newCantidad;
        this.renderFichas();
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

}


