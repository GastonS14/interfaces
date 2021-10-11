class Tablero { 

    constructor ( canvas ) { 
        this.canvas = canvas; 
        this.ctx = canvas.getContext("2d");
        this.boardSize = document.getElementById("boardSize").value;
        this.boardWidth = parseInt(this.boardSize);
        this.boardHeight = parseInt(this.boardSize) + 1;
        this.img = new Image();
        this.img.src = './img/tableDraw.png';
        this.img.height = 48;
        this.img.width = 50;
        this.board = Array();
        this.generateBoard(); 
        this.rangeX = { 
            x0 : 50,
            x1 : this.img.width * this.boardSize + 50
        }
        this.rangeY = { 
            y0 : 50,
            y1 : this.img.height * this.boardHeight + 50
        }
    }

    generateBoard () { 
        for (let i = 0; i < this.boardHeight; i++) {
            this.board[i] = [];
        }
    }

    // primera y unica renderizacion
    render () { 
        let boardWidth = this.img.width * this.boardSize;
        let boardHeight = this.img.height * this.boardHeight;
        const startX = this.rangeX.x0;
        const startY = this.rangeY.y0;
        let ctx = this.ctx;
        let board = this.board;
        let i=0, j=0;
        this.img.onload = function () {
            for (let x = startX; x < boardWidth+50; x+= this.width ) {
                j = 0;
                for (let y = startY; y < boardHeight+50; y+= this.height ) {
                    const c = new celda( x, y, ctx ); 
                    c.setImg( this );
                    board[i][j] = c;
                    ctx.drawImage( this, x, y);
                    j++;
                }
                i++;
            }
        }
    }

    // Esto se usa para redibujar cuando la fichas estan en movimiento
    reDraw () { 
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardHeight; j++) {
                const c = this.board[i][j];
                c.draw();
            }
        }
    } 

    /** 
     *   Esto se usa para el reSize del tablero, notese que es igual a render, solo que no usa el evento onload.
    */
    forChangingBoardSize() {
        let boardWidth = this.img.width * this.boardSize;
        let boardHeight = this.img.height * this.boardHeight;
        const startX = this.rangeX.x0;
        const startY = this.rangeY.y0;
        let i=0, j=0; 
        for (let x = startX; x < boardWidth+50; x+= this.img.width ) {
            j = 0;
            for (let y = startY; y < boardHeight+50; y+= this.img.height ) {
                const c = new celda( x, y, ctx ); 
                c.setImg( this.img );
                this.board[i][j] = c;
                this.ctx.drawImage( this.img, x, y);
                j++;
            }
            i++;
        }
    }

    getRangeX () { 
        return this.rangeX;
    }

    getRangeY () { 
        return this.rangeY;
    }

    setRangeY ( ) { 
        this.rangeY.y1 = this.rangeY.y0 + this.img.height * this.boardHeight;
    }

    setRangeX () { 
        this.rangeX.x1 = this.rangeX.x0 + this.img.width * this.boardSize;
    }

    // llamar este metodo desde juego cuando cambie user cambie la dimension
    setBoardSize( size ) { 
        this.boardSize = parseInt(size);
        this.boardHeight = parseInt(size) + 1;
        this.board = new Array( size );
        this.generateBoard();
        this.setRangeX();
        this.setRangeY();
        this.forChangingBoardSize();
    }

    addFicha ( pos, ficha ) { 
        for (let i = this.boardHeight-1; i >= 0; i--) {
            const celda = this.board[pos][i]; 
            if ( !celda.hasFicha ){ 
                celda.addFicha( ficha );
                return true;
            }
        }
        return false;
    }

    findPosY ( x ) { 
        for (let i = 0; i < this.boardHeight; i++ ) {
            const celda = this.board[x][i]; 
            if ( celda.hasFicha ) 
                return i;
        }
    }

    findWinner ( x, ficha ) {
        let y = this.findPosY( x );
        let count = this.findAbove( x, y-1, ficha, 0 ) + this.findBelow( x, y+1, ficha, 0 );
        if ( count >= 3 )
            return true;
        count = this.findRight( x+1, y, ficha, 0 ) + this.findLeft( x-1, y, ficha, 0 );
        if ( count >= 3 )
            return true;
        count = this.findAcrossDownLeft( x-1, y+1, ficha, 0 ) + this.findAcrossUpRight( x+1, y-1, ficha, 0 );
        if ( count >= 3 ) 
            return true;
        count = this.findAcrossUpLeft( x-1, y-1, ficha, 0 ) + this.findAcrossDownRight( x+1, y+1, ficha, 0 );
        if ( count >= 3 )
            return true;
        return false;
        //return ( this.findAcrossUpLeft( x-1, y-1, ficha, 1 ) + this.findAcrossDownRight( x+1, y+1, ficha, 1 ) === 3 );
    }

    findAbove ( x, y, ficha, iteraciones ) { 
        if ( iteraciones === 3 )
            return 0;
        if ( y >= 0 ) {
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findAbove( x, y-1, ficha, iteraciones+1 ) + 1;
            }
        }   
        return 0;
    }

    findBelow ( x, y, ficha, iteraciones ) { 
        if ( iteraciones === 3 )
            return 0;
        if ( y < this.boardHeight ) { 
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findBelow( x, y+1, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findRight( x, y, ficha, iteraciones) { 
        if ( iteraciones === 3 )
            return 0;
        if ( x < this.boardWidth ) { 
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findRight( x+1, y, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findLeft ( x, y, ficha, iteraciones ) { 
        if ( iteraciones === 3 )
            return 0;
        if ( x >= 0 ) {
            if ( this.board[x][y].hasFicha != null ) {  
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findLeft( x-1, y, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findAcrossUpLeft ( x, y, ficha, iteraciones ){ 
        if ( iteraciones === 3 )
            return 0;
        if ( x >= 0 && y >= 0 ) { 
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findAcrossUpLeft( x-1, y-1, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findAcrossDownRight( x, y, ficha, iteraciones ) {
        if ( iteraciones === 3 )
            return 0;
        if ( x < this.boardWidth && y < this.boardHeight ) { 
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findAcrossDownRight( x+1, y+1, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findAcrossDownLeft( x, y, ficha, iteraciones ){
        if ( iteraciones === 3 )
            return 0;
        if ( x >= 0 && y < this.boardHeight ) {
            if ( this.board[x][y].hasFicha != null ) {  
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findAcrossDownLeft( x-1, y+1, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    findAcrossUpRight( x, y, ficha, iteraciones ){
        if ( iteraciones === 3 )
            return 0;
        if ( x < this.boardWidth && y >= 0 ) { 
            if ( this.board[x][y].hasFicha != null ) { 
                if ( this.board[x][y].hasFicha.src === ficha.getImg().src )
                    return this.findAcrossUpRight( x+1, y-1, ficha, iteraciones+1 ) + 1;
            }
        }
        return 0;
    }

    
}
