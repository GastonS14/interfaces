class celda { 

    constructor ( posX, posY ) { 
        this.posX = posX;
        this.posY = posY;
        this.width = 50;
        this.height = 48;
        this.img = new Image(); 
        this.hasFicha = false;
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


}