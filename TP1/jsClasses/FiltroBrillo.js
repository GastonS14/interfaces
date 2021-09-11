class filtroBrillo extends Filtro { 

    constructor ( imgData, canvas, aumentoBrillo ) { 
        super ( imgData, canvas );
        this.aumentoBrillo = aumentoBrillo;
    }

    setFiltro () { 
        let index = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                retorno.data[ index ] = this.getRed(x,y) + this.aumentoBrillo;
                retorno.data[ index + 1 ] = this.getGreen(x,y) + this.aumentoBrillo;
                retorno.data[ index + 2 ] = this.getBlue(x,y) + this.aumentoBrillo;
                retorno.data[ index + 3 ] = 255;
            }
        }
        this.context.putImageData( retorno, 0, 0);
    }
 }
