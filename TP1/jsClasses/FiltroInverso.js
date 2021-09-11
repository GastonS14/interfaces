class filtroInverso extends Filtro { 

    constructor ( imgData, canvas ) { 
        super ( imgData, canvas );
    }

    setFiltro () { 
        let imgInversa = new ImageData( this.width, this.height );
        let index = 0; 
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                imgInversa.data[ index ] = 255 - this.getRed( x, y ) ;
                imgInversa.data[ index + 1 ] = 255 - this.getGreen( x, y ) ;
                imgInversa.data[ index + 2 ] = 255 - this.getBlue( x, y ) ;
                imgInversa.data[ index + 3 ] = 255;
            }
        } 
        this.context.putImageData ( imgInversa, 0, 0);
    }
}
