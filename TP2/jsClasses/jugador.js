class jugador { 
    
    constructor ( name, boarSize, canvas, posXchips, posYchips, imgSrc) {
        this.canvas = canvas;
        this.boarSize = parseInt(boarSize); 
        this.name = name;
        this.img = new Image();
        this.img.src = imgSrc;
        this.posXchips = posXchips; 
        this.posYchips = posYchips;
        this.fichas = new Array();
        this.cantMaxFichas = boarSize*(boarSize+1)/2;
    }

    getName() { 
        return this.name;
    }

    renderFichas() { 
        let amountFichas = Math.round( this.cantMaxFichas );
        let count = 0; 
        this.fichas = new Array();
        let fichas = this.fichas;
        let initX = this.posXchips;
        let initY = this.posYchips;
        this.img.onload = function () {
            for (let x = initX; x < canvas.width; x+=50 ) {
                for (let y = initY; y < canvas.height-48; y+=48) {
                    if ( count < amountFichas ) {
                        const f = new ficha( x, y, this); 
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

    renderWithoutLoad () {
        let amountFichas = Math.round( this.cantMaxFichas );
        let count = 0; 
        this.fichas = new Array();
        let fichas = this.fichas;
        let initX = this.posXchips;
        let initY = this.posYchips;
        for (let x = initX; x < canvas.width; x+=50 ) {
            for (let y = initY; y < canvas.height-48; y+=48) {
                if ( count < amountFichas ) {
                    const f = new ficha( x, y, this.img ); 
                    f.setPosition( x, y, this.img);      
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
        this.renderWithoutLoad();
    }

    setBoardSize ( newSize ) { 
        this.boarSize = newSize;
        this.setCantMaxFichas( newSize * (newSize + 1 ) / 2 );
    }

    setImage( img ) { 
        this.img.src = img;
        this.drawFichas();
    }

    mouseIsDown ( posX, posY ) { 
        for (let i = 0; i < this.fichas.length; i++) {
            const ficha = this.fichas[i]; 
            if ( ficha.isInside( posX, posY ) ) { 
                return ficha;
            }
        }
        return null;
    }

    removeFicha ( ficha ) { 
        for (let i = 0; i < this.fichas.length; i++) {
            if ( this.fichas[i].getPosX() === ficha.getPosX() && this.fichas[i].getPosY() === ficha.getPosY())
                this.fichas.splice(i,1);
        }
    }

    setName( newName ) { 
        this.name = newName;
    }

}


