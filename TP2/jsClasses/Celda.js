class celda { 

    constructor ( posX, posY, ctx ) { 
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.width = 50;
        this.height = 48;
        this.img = new Image(); 
        this.hasFicha = null;
    }

    setImg ( img ) { 
        this.img = img;
    }

    setFicha ( ficha ) {
        this.hasFicha = ficha; 
    }

    draw () { 
        this.ctx.drawImage( this.img, this.posX, this.posY );
        if ( this.hasFicha ) 
            this.ctx.drawImage( this.hasFicha, this.posX+10, this.posY+10 );
    }

    addFicha ( ficha ) { 
        this.hasFicha = ficha;
        this.setFicha( ficha.getImg() );
        this.draw();
    }

    getFicha ( ) { 
        return this.hasFicha;
    }


}