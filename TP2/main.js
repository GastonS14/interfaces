


document.getElementById("myCanvas").addEventListener('mousedown', mouseIsDown);
document.getElementById("myCanvas").addEventListener('mouseup', mouseIsUp);
document.getElementById("myCanvas").addEventListener('mousemove', mouseIsMoving);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let p = new jugador ("juan", 7, canvas);
let p1 = new jugador( "gaston",7, canvas);
let t = new Tablero ( canvas );
let lastChip = null;
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

function reDraw() {
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.reDraw();
    p.drawFichas();
    //p1.drawFichas();
}

function changeSize() { 
    newSize = document.getElementById("boardSize").value;
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.setBoardSize( newSize );
    p.setBoardSize( newSize );
    document.getElementById("manyInLine").innerHTML = newSize;
}

function mouseIsDown ( e ) {
    isMouseDown = true;
    isMouseUp = false;
    if ( lastChip != null )
        lastChip = null
    const elem = p.mouseIsDown( e.layerX, e.layerY );
    if ( elem != null ) {
        lastChip = elem;
    } else { 
        lastChip = p1.mouseIsDown( e.layerX, e.layerY )
    }
}

function mouseIsUp ( e ) { 
    isMouseUp = true;
    isMouseDown = false;
    let added = controlChip( e.layerX, e.layerY );
    if ( added ) 
        p.removeFicha( lastChip );
    else 
        lastChip.restorePos();
    lastChip = null;
    reDraw();
}

function mouseIsMoving ( e ) { 
    if ( lastChip != null && isMouseDown ) { 
        lastChip.setPosition ( e.layerX, e.layerY );
        reDraw();
    }
}

function controlChip( posX, posY ) { 
    const rangeX = t.getRangeX();
    const rangeY = t.getRangeY();
    if ( ( posX > rangeX.x0 && posX < rangeX.x1 ) && ( posY < rangeY.y0 && posY < rangeY.y1 )  ) {
        console.log(  Math.floor(posX / 50)  - 1 ); // 50 es el width de la celda xD
        return t.addFicha( Math.floor(posX/ 50) - 1, lastChip ); 
    }
    return false;
}
