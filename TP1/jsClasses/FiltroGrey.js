class FiltroGrey extends Filtro {
    
    constructor ( imgData, canvas ) { 
        super( imgData, canvas );
        this.imgDataGris = new ImageData( this.width, this.height );
    }

    /* 
        Iguala los valores del pixel, seteando sus valores por el promedio de los tres ( r,g,b ), generando asi una escala de grises.
    */
    setFiltro() {
        let index = 0, gray = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = this.calculateIndex(x, y, this.width);
                gray = this.getAverage( x , y );
                this.setData ( retorno, gray, index );
            }
        }
        this.imgDataGris = retorno;
        this.context.putImageData( retorno, 0, 0);
    }

    getFiltro () { 

        return this.imgDataGris;

    }
}
