class Tablero { 

    constructor ( canvas ) { 
        this.canvas = canvas; 
        this.playingZone = document.getElementById("playingZone");
        this.ctx = canvas.getContext("2d");
        this.boardSize = document.getElementById("boardSize").value;
        this.img = new Image();
        this.img.src = 'img/tableDraw.png';
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
            y1 : this.img.height * this.boardSize + 50
        }
    }

    generateBoard () { 
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
        }
    }

    // primera y unica renderizacion
    render () { 
        let userSize = this.boardSize
        let boardWidth = this.img.width * userSize;
        let boardHeight = this.img.height * userSize;
        const startX = this.rangeX.x0;
        const startY = this.rangeY.y0;
        let ctx = this.ctx;
        let board = this.board;
        let i=0, j=0;
        this.img.onload = function () { 
            for (let x = startX; x < boardWidth+50; x+= this.width ) {
                j = 0;
                for (let y = startY; y < boardHeight+50; y+= this.height ) {
                    const c = new celda( x, y ); 
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
            for (let j = 0; j < this.boardSize; j++) {
                const c = this.board[i][j];
                c.draw();
            }
        }
    } 

    /** 
     *   Esto se usa para el reSize del tablero, notese que es igual a render, solo que no usa el evento onload.
    */
    forChangingBoardSize() {
    let userSize = this.boardSize
    let boardWidth = this.img.width * userSize;
    let boardHeight = this.img.height * userSize;
    const startX = this.rangeX.x0;
    const startY = this.rangeY.y0;
    let ctx = this.ctx;
    let board = this.board;
    let i=0, j=0; 
        for (let x = startX; x < boardWidth+50; x+= this.img.width ) {
            j = 0;
            for (let y = startY; y < boardHeight+50; y+= this.img.height ) {
                const c = new celda( x, y ); 
                c.setImg( this.img );
                board[i][j] = c;
                ctx.drawImage( this.img, x, y);
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
        this.rangeY.y1 = this.rangeY.y0 + this.img.height * this.boardSize
    }

    setRangeX () { 
        this.rangeX.x1 = this.rangeX.x0 + this.img.width * this.boardSize;
    }

    // llamar este metodo desde juego cuando cambie user cambie la dimension
    setBoardSize( size ) { 
        this.boardSize = size;
        this.board = new Array( size );
        this.generateBoard();
        this.setRangeX();
        this.setRangeY();
        this.forChangingBoardSize();
    }

    addFicha ( pos, ficha ) { 
        for (let i = this.boardSize-1; i >= 0; i--) {
            const celda = this.board[pos][i]; 
            if ( !celda.hasFicha ){ 
                celda.addFicha( ficha );
                return true;
            }
        }
        return false;
    }
    
}
