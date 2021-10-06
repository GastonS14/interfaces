


document.getElementById("myCanvas").addEventListener('mousedown', mouseIsDown);
document.getElementById("myCanvas").addEventListener('mouseup', mouseIsUp);
document.getElementById("myCanvas").addEventListener('mousemove', mouseIsMoving);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let p = new jugador ("juan", 7, canvas);
let p1 = new jugador( "gaston",7, canvas);
let t = new Tablero ( canvas );
let lastFigure = null;
let isMouseDown = false;
let isMouseUp = true;

drawBoard();
initPlayers();

function drawBoard() { 
    t.render();
}

function initPlayers () { 
    p.renderFichas();
    //p1.renderFichas();
}

function reDrawFichas() {
    p.drawFichas();
    //p1.drawFichas();
}

function changeSize() { 
    newSize = document.getElementById("boardSize").value;
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.setBoardSize( newSize );
    p.setBoardSize( newSize );
}

function mouseIsDown ( e ) {
    isMouseDown = true;
    isMouseUp = false;
    if ( lastFigure != null )
        lastFigure = null
    const elem = p.mouseIsDown( e.layerX, e.layerY );
    if ( elem != null ) {
        lastFigure = elem;
    } else { 
        lastFigure = p1.mouseIsDown( e.layerX, e.layerY )
    }
}

function mouseIsUp ( e ) { 
    isMouseUp = true;
    isMouseDown = false;
    added = controlChip( e.layerX, e.layerY );
    if ( added ) {
        p.removeFicha( lastFigure );
        lastFigure = null;
        ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
        t.reDraw();
        reDrawFichas();
    }
}

function mouseIsMoving ( e ) { 
    if ( lastFigure != null && isMouseDown ) { 
        lastFigure.setPosition ( e.layerX, e.layerY );
        ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
        t.reDraw();
        reDrawFichas();
    }
}

function controlChip( posX, posY ) { 
    const rangeX = t.getRangeX();
    const rangeY = t.getRangeY();
    if ( ( posX > rangeX.x0 && posX < rangeX.x1 ) && ( posY < rangeY.y0 && posY < rangeY.y1 )  ) {
        console.log( "pos x :" );
        console.log( posX ); 
        console.log( "celda :" );   
        console.log(  Math.floor(posX / 50)  - 1 ); // 50 es el width de la celda xD
        return t.addFicha( Math.floor(posX/ 50) - 1, lastFigure ); 
    }
}
