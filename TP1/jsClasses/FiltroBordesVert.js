class filtroBordesVert extends filtroSobel { 

    constructor ( imgData, canvas ) { 
        super ( imgData, canvas );
        this.cargarMatrizSobelVertical();
        this.matrizSobel = this.findMatrizSobel(); // aca esta el problema. no me conoce esta matriz
        // da igual si le pongo super o this cuando hace setFiltro() no la conoce. 
    }

    setFiltro () { 
        super.setFiltro();
    }

    cargarMatrizSobelVertical (  ) {
        for (let i = 0; i < 3; i++) {
            this.matrizSobel[i] = [];
        }
        this.matrizSobel[ 0 ] [ 0 ] = -1;
        this.matrizSobel[ 0 ] [ 1 ] = 0;
        this.matrizSobel[ 0 ] [ 2 ] = 1;
        this.matrizSobel[ 1 ] [ 0 ] = -2;
        this.matrizSobel[ 1 ] [ 1 ] = 0;
        this.matrizSobel[ 1 ] [ 2 ] = 2;
        this.matrizSobel[ 2 ] [ 0 ] = -1;
        this.matrizSobel[ 2 ] [ 1 ] = 0;
        this.matrizSobel[ 2 ] [ 2 ] = 1;
    }

    findMatrizSobel() {
        return this.matrizSobel;
    }


}
