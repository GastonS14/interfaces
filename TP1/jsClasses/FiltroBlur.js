class filtroBlur extends Filtro { 


    constructor ( imgData, canvas ) { 
        super( imgData, canvas );
    }

    setFiltro ( ) {
        let retorno = new ImageData( this.width, this.height ); 
        let index = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4; 
                retorno.data[ index ] = this.averagePixel( x,y, this.imageData, 0 );
                retorno.data[ index + 1 ] = this.averagePixel( x,y, this.imageData, 1 );
                retorno.data[ index + 2 ] = this.averagePixel( x,y, this.imageData, 2 );
                retorno.data[ index + 3 ] = this.averagePixel( x,y, this.imageData, 3 );
            }
        }
        this.context.putImageData( retorno, 0, 0 );
    }

    averagePixel ( x , y, imgData, color ) { 
        let top = this.averageTop ( x, y, imgData, color );
        let middle = this.averageMiddle ( x, y, imgData, color );
        let botton = this.averageBotton( x, y, imgData, color );
        return ( top + botton + middle )/3;
    }

    averageTop ( x, y, imgData, color  ) { 
        let promedio = new Promedio();
        promedio.setSuma ( this.getValue ( x, y, imgData, color  ) ); // en el que estoy parado
        if ( y > 0 ) {
            promedio.setSuma( this.getValue( x, y-1, imgData, color  ) );  // arriba

            if ( x > 0 ) 
                promedio.setSuma( this.getValue( x-1, y-1, imgData, color  ) ); // arriba-izq

            if ( x+1 < imgData.width )
                promedio.setSuma( this.getValue( x+1, y-1, imgData, color  ) ); // arriba- derecha
        } 
        return promedio.getPromedio();
    }

    averageMiddle ( x, y, imgData, color  ) { 
        let promedio = new Promedio();
        if ( x > 0 ) 
            promedio.setSuma( this.getValue( x-1, y, imgData, color  )); // medio - izq 
        if ( x+1 < imgData.width )
            promedio.setSuma( this.getValue( x+1, y, imgData, color  )); // medio - derecha
        return promedio.getPromedio();
    } 

    averageBotton( x, y, imgData, color ) { 
        let promedio = new Promedio();
        if ( y+1 < imgData.height ) {
            promedio.setSuma( this.getValue( x, y+1, imgData, color  )); // abajo
            if ( x > 0 && y > 0 ) 
                promedio.setSuma( this.getValue( x-1, y-1, imgData, color  )); // abajo - izq
            if ( x+1 < imgData.width )
                promedio.setSuma( this.getValue( x+1, y+1, imgData, color  )); // abajo - derecha
        } 
        return promedio.getPromedio();
    }

    getValue ( x, y, imgData, color ) { 
        let index = ( x + y * imgData.width ) * 4;
        return imgData.data[ index + color ];
    }
}

class Promedio { 

    constructor ( ){
        this.suma = 0;
        this.cantidad = 0;
        this.promedio = 0;
    }

    getSuma() { 
        return this.suma;
    }

    getCantidad() { 
        return this.cantidad;
    }

    setSuma ( value ) { 
        this.suma += value;
        this.cantidad++;
        this.promedio = this.suma / this.cantidad;
    }

    getPromedio () { 
        return this.promedio;
    }
}