class filtroContraste extends Filtro { 

    constructor ( imgData, canvas, contrast ) { 
        super( imgData, canvas );
        this.contrast = contrast; // esto lo voy a hardcodear, deberiamos ponerle un select o dropdown en el html 
    }

    /*
        
    */
    setFiltro () { 
        let imgContrast = new ImageData ( this.width, this.height );
        let index = 0;
        let factor = ( 259 * ( this.contrast + 255 ) ) / ( 255 * ( 259 - this.contrast ) );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                imgContrast.data[ index ] = factor * ( this.getRed( x, y ) - 128 ) + 128;
                imgContrast.data[ index + 1] = factor * ( this.getGreen( x, y ) - 128 ) + 128;
                imgContrast.data[ index + 2] = factor * ( this.getBlue( x, y ) - 128 ) + 128;
                imgContrast.data[ index + 3] = 255;
            }
        }
        this.context.putImageData( imgContrast, 0, 0 );
    }
}
