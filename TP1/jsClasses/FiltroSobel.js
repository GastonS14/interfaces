class filtroSobel extends Filtro { 

    constructor( imgData, canvas) { 
        super( imgData, canvas );
        this.matrizSobel = new Array();
        this.matrizAux = [];
        this.cargarMatrizSobel();
        this.imgDataGris = new ImageData ( this.width, this.height );
        this.cargarMatriz ();
    }

    cargarMatrizSobel (  ) {
        for (let i = 0; i < 3; i++) {
            this.matrizSobel[i] = [];
        }
        this.matrizSobel[ 0 ] [ 0 ] = -1;
        this.matrizSobel[ 0 ] [ 1 ] = -2;
        this.matrizSobel[ 0 ] [ 2 ] = -1;
        this.matrizSobel[ 1 ] [ 0 ] = 0;
        this.matrizSobel[ 1 ] [ 1 ] = 0;
        this.matrizSobel[ 1 ] [ 2 ] = 0;
        this.matrizSobel[ 2 ] [ 0 ] = 1;
        this.matrizSobel[ 2 ] [ 1 ] = 2;
        this.matrizSobel[ 2 ] [ 2 ] = 1;
    }

    // carga matriz aux, usada para testear 
    cargarMatriz () { 
        for (let i = 0; i < 6; i++) {
            this.matrizAux[i] = [];
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                this.matrizAux[i][j] = i*j + 1;
            }
        }
    }

    setFiltro ( ) { 
        let imgSobel = new ImageData( this.width, this.height );
        let filtroGris = new FiltroBW( this.imageData, this.canvas );
        this.imgDataGris = filtroGris.getFiltro(); 
        let index = 0;
        let anchorY, anchorX;
        for (let x = 0; x < this.width; x+=3) {
            for (let y = 0; y < this.height; y+=3) {
                anchorX= x+1;
                anchorY= y+1;
                index = ( anchorX + anchorY * this.width ) * 4;
                this.setData( imgSobel, this.multiplicadorMatrizz ( x , y, imgSobel ), index );
                //imgSobel[x+1][y+1] = this.multiplicadorMatrizz ( x , y );
                // con el mod saco el indice correspondiente a Y para saber que celda multiplicar en la matrizSobel ! (Y=3)mod3 = 0 ; (Y=4)mod3 = 1
                //this.setData(imgSobel, this.multripladorMatriz( y%3, index ), index );
            } 
        }
        this.context.putImageData( imgSobel, 0, 0 );
        // this.runTest();
    }
    
    // Multiplica la matriz sobel por una subMatriz de la imagen
    multiplicadorMatrizz ( x, y, imgSobel ) {
        let index, sum = 0;
        let auxY = y;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                index = ( x + y * this.width ) * 4;
                if (! ( i === 1 && j === 1) ) {
                    sum += this.imgDataGris.data[ index ] * this.matrizSobel[ x%3 ] [ y%3 ];  
                    this.setData( imgSobel, 0, index );
                }
                y += 1;
            }
            x += 1; 
            y = auxY;
        }
        return sum;
    }

    imprimirMatriz ( ) { 
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                console.log( this.matrizAux [ i ] [ j ]);
            }
            console.log( "x = " + i );
        }
    }

    // Usado para probar el algoritmo multiplicadorMatrizz
    test ( x, y ) {
        let sum = 0;
        let auxY = y;
        let auxX = x;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //index = ( x + y * this.width ) * 4;
                if (! ( i === 1 && j === 1) )
                   sum += this.matrizAux[ x ] [ y ] * this.matrizSobel[ x%3 ] [ y%3 ];  
                y += 1;
            }
            x += 1;
            y = auxY;
        }
        return sum;
    }

    // Usado para correr el test del algoritmo multiplicadorMatrizz
    runTest () { 
        console.log ( "matriz aux" );
        this.imprimirMatriz();

        for (let x = 0; x < 6; x+=3) {
            for (let y = 0; y < 6; y+=3) {
                this.matrizAux[ x+1][ y+1 ] = this.test( x, y);         
            }
        }
       
        console.log ( "matriz sobel" );
        this.imprimirMatriz();
    }
}