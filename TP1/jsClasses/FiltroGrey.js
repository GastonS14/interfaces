class FiltroGrey extends Filtro {
    
    constructor ( imgData, canvas ) { 
        super( imgData, canvas );
        this.imageDataGris = this.getFiltro();
    }

    /*
        El valor de cada pixel sera seteado por el promedio de los colores, generando asi una escala de grises. 
    */
    setFiltro() {
        this.context.putImageData( this.imageDataGris, 0, 0);
    }

    getFiltro () { 
        let index = 0, gray = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = this.calculateIndex(x, y, this.width);
                gray = this.getAverage( x, y);
                this.setData ( retorno, gray, index );
            }
        }
        return retorno;
    }
}
