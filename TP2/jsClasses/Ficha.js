class ficha { 

    constructor( posX, posY ) { 
        this.originalPosX = posX;
        this.originalPosY = posY;
        this.posX = posX;
        this.posY = posY;
        this.img = new Image();
        this.img.src = 'img/fichaNegra.png'
        this.width = 50;
        this.height = 48;
    }

    draw( posX, posY ) { 
        this.posX = posX;
        this.posY = posY;
        let context = document.getElementById("myCanvas").getContext("2d");
        context.drawImage( this.img, posX, posY );
    }

    isInside ( x, y ) { 
        return ( x > this.posX && x < ( this.posX + 50 ) ) && ( y > this.posY && y < ( this.posY + 48 ) ) 
    }

    resaltar () { 
        console.log("#jajajj")
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