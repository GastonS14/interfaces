class FiltroBW extends Filtro {
    
    constructor ( imgData, canvas ) { 
        super( imgData, canvas );
    }

    setFiltro() {
        let index = 0;
        //let color = new Color(9,9,9); // subirlo a clase Filtro
        let gray = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = this.calculateIndex(x, y, this.width);
                this.color.setColors( this.getR(x,y), this.getG(x,y), this.getB( x,y ) );
                gray = this.getAverageGrey( this.color.getR(), this.color.getG(), this.color.getB() );
                this.setData ( retorno, gray, index );
            }
        }
        this.context.putImageData( retorno, 0, 0);
    }

    getAverageGrey( r, g, b) {
        return ( r + g + b ) / 3;
    }

    getFiltro () { 
        let index = 0;
        //let color = new Color(9,9,9); // subirlo a clase Filtro
        let gray = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = this.calculateIndex(x, y, this.width);
                this.color.setColors( this.getR(x,y), this.getG(x,y), this.getB( x,y ) );
                gray = this.getAverageGrey( this.color.getR(), this.color.getG(), this.color.getB() );
                this.setData ( retorno, gray, index );
            }
        }
        return retorno;
    }
}
