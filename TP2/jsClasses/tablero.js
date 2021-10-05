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
        this.board = Array(this.boardSize);
        this.generateBoard();
    }

    generateBoard () { 
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
        }
    }

    render () { 
        //this.ctx.putImageData( new ImageData(this.canvas.width, this.canvas.height), 0, 0)
        let userSize = this.boardSize
        let boardWidth = this.img.width * userSize;
        let boardHeight = this.img.height * userSize;
        //this.canvas.width = boardWidth;
        //this.canvas.height = boardHeight;
        let ctx = this.ctx;
        let board = this.board;
        let i=0, j=0;
        this.img.onload = function () { 
            for (let x = 50; x < boardWidth+50; x+= this.width ) {
                j = 0;
                for (let y = 50; y < boardHeight+50; y+= this.height ) {
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

    reDraw () { 
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const c = this.board[i][j];
                c.draw();
            }
        }
    }
    
}
