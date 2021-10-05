class ficha { 

    constructor( posX, posY ) { 
        this.posX = posX;
        this.posY = posY;
        this.img = new Image();
        this.img.src = 'img/fichaNegra.png'
    }

    draw( posX, posY ) { 
        this.posX = posX;
        this.posY = posY;
        let context = document.getElementById("myCanvas").getContext("2d");
        context.drawImage( this.img, posX, posY );
    }

    isInside ( x, y ) { 
        // ( x < this.posX >= x && x < ( this.posX+51 ) ) && ( this.posY >= y && y < ( this.posY+49 ) ); // esto no funciona 
        return ( x > this.posX && x < ( this.posX + 50 ) ) && ( y > this.posY && y < ( this.posY + 48 ) ) 
    }

    resaltar () { 
        console.log("#jajajj")
    }

    setPosition ( x, y ) { 
        this.posX = x;
        this.posY = y;
    }

    getPosX () { 
        return this.posX;
    }

    getPosY () { 
        return this.posY;
    }
    
}