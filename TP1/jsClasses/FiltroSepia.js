class filtroSepia extends Filtro { 

    constructor ( imgData, canvas ) { 
        super ( imgData, canvas );
    }

    setFiltro () { 
        let imgSepia = new ImageData( this.width, this.height );
        let index = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                imgSepia.data[ index ] = Math.round( this.getSepiaRed( x, y ) );
                imgSepia.data[ index + 1 ] = Math.round( this.getSepiaGreen( x, y ));
                imgSepia.data[ index + 2 ] = Math.round( this.getSepiaBlue( x, y ));
                imgSepia.data[ index + 3 ] = 255;
            }
        }
        this.context.putImageData( imgSepia, 0, 0);
    }

    getSepiaRed ( x, y ) { 
        let redSepia = ( this.getRed(x, y) * .393) + ( this.getGreen(x, y) * .769) + ( this.getBlue(x, y) * .189);
        if ( redSepia > 255 ) 
            return 255;
        return redSepia;
    }

    getSepiaGreen ( x, y ) { 
        let greenSepia = (this.getRed(x, y) * .349) + (this.getGreen(x, y) * .686) + (this.getBlue(x, y) * .168);
        if ( greenSepia > 255 ) 
            return 255;
        return greenSepia;
    }

    getSepiaBlue ( x, y ) { 
        let blueSepia = (this.getRed(x, y) * .272) + (this.getGreen(x, y) * .534) + ( this.getBlue(x, y) * .131)
        if ( blueSepia > 255 ) 
            return 255;
        return blueSepia;
    }

}
