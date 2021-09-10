class Filtro { 
    constructor( imageData, canvas ) { 
        this.imageData = imageData;
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext ("2d");
        this.color = new Color(0,0,0);
    }

    setFiltro() {};

    getR ( x, y ) {
        let index = ( x + y * this.width ) * 4;
        return this.imageData.data[ index + 0];
    }

    getG ( x, y ) {
        let index = ( x + y * this.width ) * 4;
        return this.imageData.data[ index + 1];
    }

    getB ( x, y ) {
        let index = ( x + y * this.width ) * 4;
        return this.imageData.data[ index + 2];
    }

    getAverage ( x, y ) { 
        return ( this.getR( x, y ) + this.getG( x, y ) + this.getB ( x, y ) ) / 3;
    }
    
    // Dado una imagen le setea el nuevo color a un pixel determinado por index
    setData ( imgData, color, index ) { 
        imgData.data[ index + 0 ] = color;
        imgData.data[ index + 1 ] = color;
        imgData.data[ index + 2 ] = color;
        imgData.data[ index + 3 ] = 255; // ojo con esto xD
    }

    setR ( x, y, color ) { 
        let index = ( x + y * this.width ) * 4;
        this.imageData.data [ index + 0 ] = color;
    }
    
    setG ( x, y, color ) { 
        let index = ( x + y * this.width ) * 4;
        this.imageData.data [ index + 1 ] = color;
    }

    setB ( x, y, color ) { 
        let index = ( x + y * this.width ) * 4;
        this.imageData.data [ index + 2 ] = color;
    }

}