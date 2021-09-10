class filtroBinario extends Filtro { 

    constructor ( imgData, canvas ) { 
        super( imgData, canvas);
    }

    setFiltro () { 
        let color = 0,index = 0;
        let retorno = new ImageData( this.width, this.height );
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                if ( this.compareTo( this.getAverage ( x, y ) ) > 0 )  
                    color = 0;
                else 
                    color = 225;
                this.setData ( retorno, color, index );
            }
        }
        this.context.putImageData( retorno, 0, 0);
    }

    compareTo ( value ) {
        let half = 255/2;
        if ( value > half ) 
            return 11;
        else 
            return 0; 

    }





}