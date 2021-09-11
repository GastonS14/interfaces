class Filtro { 
    constructor( imageData, canvas ) { 
        this.imageData = imageData;
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext ("2d");
    }

    setFiltro() {};

    getRed ( x, y ) {
        let index = this.calculateIndex(x, y, this.width);
        return this.imageData.data[ index ];
    }

    getGreen ( x, y ) {
        let index = this.calculateIndex(x, y, this.width);
        return this.imageData.data[ index + 1];
    }

    getBlue ( x, y ) {
        let index = this.calculateIndex(x, y, this.width);
        return this.imageData.data[ index + 2];
    }

    getAverage ( x, y ) { 
        return ( this.getRed( x, y ) + this.getGreen( x, y ) + this.getBlue ( x, y ) ) / 3;
    }
    
    // Dado una imagen le setea el nuevo color a un pixel determinado por index
    setData ( imgData, color, index ) { 
        imgData.data[ index ] = color;
        imgData.data[ index + 1 ] = color;
        imgData.data[ index + 2 ] = color;
        imgData.data[ index + 3 ] = 255; // ojo con esto xD
    }

    setR ( x, y, color ) { 
        let index = this.calculateIndex(x, y, this.width);
        this.imageData.data [ index ] = color;
    }
    
    setG ( x, y, color ) { 
        let index = this.calculateIndex(x, y, this.width);
        this.imageData.data [ index + 1 ] = color;
    }

    setB ( x, y, color ) { 
        let index = this.calculateIndex(x, y, this.width);
        this.imageData.data [ index + 2 ] = color;
    }

    calculateIndex(x, y, width) {
        return  ( x + y * width ) * 4;
    }

}
