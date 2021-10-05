


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

function mouseIsUp () { 
    isMouseUp = true;
    isMouseDown = false;
}

function mouseIsMoving ( e ) { 
    if ( lastFigure != null && isMouseDown ) { 
        lastFigure.setPosition ( e.layerX, e.layerY );
        ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
        t.reDraw();
        reDrawFichas();
    }
}
