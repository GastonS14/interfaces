class filtroSobel extends Filtro { 

    constructor( imgData, canvas) { 
        super( imgData, canvas );
        this.matriz = new Array();
        this.cargarMatriz();
    }

    cargarMatriz (  ) { 
        for (let i = 0; i < 3; i++) {
            this.matriz[i] = [];
        }
        this.matriz[ 0 ] [ 0 ] = -1;
        this.matriz[ 0 ] [ 1 ] = -2;
        this.matriz[ 0 ] [ 2 ] = -1;
        this.matriz[ 1 ] [ 0 ] = 0;
        this.matriz[ 1 ] [ 1 ] = 0;
        this.matriz[ 1 ] [ 2 ] = 0;
        this.matriz[ 2 ] [ 0 ] = 1;
        this.matriz[ 2 ] [ 1 ] = 2;
        this.matriz[ 2 ] [ 2 ] = 1;
    }

    setFiltro ( ) { 
        let imgSobel = new ImageData( this.width, this.height );
        let index = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = ( x + y * this.width ) * 4;
                // con el mod saco el indice correspondiente a y para saber que celda multiplicar en la matrizSobel ! (Y=3)mod3 = 0 ; (Y=4)mod3 = 1
                this.setData(imgSobel, this.multripladorMatriz( y%3, index ), index );
            } 
        }
        this.context.putImageData( imgSobel, 0, 0 );
    }

    multripladorMatriz ( m_indiceX, index ) { 
        //let suma = this.imageData.data[ index ] * this.matriz[ m_indiceX ] [ 0 ] + this.imageData.data[ index + 1] * this.matriz[ m_indiceX ] [ 1 ] +
                    //this.imageData.data[ index + 2] * this.matriz[ m_indiceX ] [ 2 ];
        let sum = 0;
        let value;
        for (let y = 0; y < 3; y++) {
            value = this.imageData.data[ index + y ];
            sum += this.matriz[ m_indiceX ] [ y ] * value; 
        }
        return sum;
    }

}