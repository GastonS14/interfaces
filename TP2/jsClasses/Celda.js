class celda { 

    constructor ( posX, posY ) { 
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

    setFicha ( ) { 
    }

    draw () { 
        let canvas = document.getElementById("myCanvas"); 
        let ctx = canvas.getContext("2d");
        ctx.drawImage( this.img, this.posX, this.posY );
    }

    // esto no funciona, una cosa de locos 
    hasFicha() { 
        return this.hasFicha != null;
    }

    addFicha ( ficha ) { 
        this.hasFicha = ficha;
        this.setImg( ficha.getImg() );
        this.draw();
    }



}