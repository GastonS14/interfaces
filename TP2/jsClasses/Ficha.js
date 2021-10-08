class ficha { 

    constructor( posX, posY, img) { 
        this.originalPosX = posX;
        this.originalPosY = posY;
        this.posX = posX;
        this.posY = posY;
        this.img = img;
        this.width = 30;
        this.height = 30;
    }

    draw( posX, posY ) { 
        this.posX = posX;
        this.posY = posY;
        let context = document.getElementById("myCanvas").getContext("2d");
        context.drawImage( this.img, posX, posY );
    }

    isInside ( x, y ) { 
        return ( x > this.posX && x < ( this.posX + this.width ) ) && ( y > this.posY && y < ( this.posY + this.height ) ) 
    }

    restorePos( ) { 
        this.posX = this.originalPosX;
        this.posY = this.originalPosY;
    }

    setPosition ( x, y ) { 
        this.posX = x-this.width/2;
        this.posY = y-this.height/2;
    }

    getPosX () { 
        return this.posX;
    }

    getPosY () { 
        return this.posY;
    }

    getImg () { 
        return this.img;
    }
    
}