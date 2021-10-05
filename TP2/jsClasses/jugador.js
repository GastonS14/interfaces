class jugador { 
    
    constructor ( name, boarSize, canvas ) {
        this.canvas = canvas;
        this.boarSize = boarSize; 
        this.name = name;
        this.fichas = [];
        //this.ficha = new ficha(0,0);
        const cantMaxFichas = boarSize*boarSize/2;
        //let cantFichas = cantMaxFichas; 
    }

    renderFichas() { 
        let amountFichas = this.boarSize * this.boarSize / 2;
        let count = 0; 
        let fichas = this.fichas;
        // Para tablero de 6x6 -> can.height/6, x=500, y= 18
        // Para tablero de 7x7 -> can.height/4, x=550, y=18  
  
        let img = new Image();
        img.src = 'img/fichaNegra.png';
        
        img.onload = function () {
            for (let x = 550; x < canvas.width; x+=50 ) {
                for (let y = 18; y < canvas.height/4; y+=48) {
                    if ( count < amountFichas ) {
                        const f = new ficha( x, y); 
                        f.setPosition( x, y);      
                        f.draw( x, y, img);
                        fichas.push( f );  
                        count++;
                    } else 
                        break;
                }  
            } 
        }
    }

    drawFichas () { 
        let img = new Image();
        img.src = 'img/fichaNegra.png';
        const fichas = this.fichas;
        img.onload = function () {
            fichas.forEach( ficha => {
                ficha.draw( ficha.getPosX(), ficha.getPosY(), img );
            });
        }
    }

    setCantMaxFichas ( newCantidad ) { 
        this.cantMaxFichas = newCantidad;
        this.renderFichas();
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

}


