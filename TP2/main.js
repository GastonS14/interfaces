


document.getElementById("myCanvas").addEventListener('mousedown', mouseIsDown);
document.getElementById("myCanvas").addEventListener('mouseup', mouseIsUp);
document.getElementById("myCanvas").addEventListener('mousemove', mouseIsMoving);
document.getElementById("inputNameP").addEventListener('keyup', setNameP);
document.getElementById("inputNameP2").addEventListener('keyup', setNameP2);


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let p = new jugador ("user1", 7, canvas, 480, 15, "./img/black.png" );
let p1 = new jugador( "user2",7, canvas, 750, 15, "./img/red.png" );
let t = new Tablero ( canvas );
let lastChip = null;
let isMouseDown = false;
let isMouseUp = true;
let timer = null;
let userTime = document.getElementById("userTime").value;

drawBoard();
initPlayers();

function drawBoard() { 
    t.render();
}

function initPlayers () { 
    p.renderFichas();
    p1.renderFichas();
}

function reDraw() {
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.reDraw();
    p.drawFichas();
    p1.drawFichas();
}

function changeSize() { 
    newSize = document.getElementById("boardSize").value;
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.setBoardSize( newSize );
    p.setBoardSize( newSize );
    p1.setBoardSize( newSize );
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
    if ( added ) {
        chronometer();
        dontShowHeader();
        p.removeFicha( lastChip );
        p1.removeFicha( lastChip );
    } else 
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
        return t.addFicha( Math.floor(posX/ 50) - 1, lastChip ); 
    }
    return false;
}

function changeChipP2( ) { 
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.reDraw();
    p.drawFichas();
    p1.setImage( event.currentTarget.value );
}

function changeChipP1() { 
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0); 
    t.reDraw();
    p.setImage( event.currentTarget.value );
    p1.drawFichas();
}

function setNameP() {
    let newName = document.getElementById("inputNameP").value;
    if ( p1.getName() === newName )
        newName += '1';
    p.setName( newName );
}

function setNameP2() {
    let newName = document.getElementById("inputNameP2").value;
    if ( p.getName() === newName )
        newName+='1';
    p1.setName( newName );
}

function dontShowHeader () {
    document.getElementById("customize").classList.add("dontShow");
}

function showGame() {
    document.getElementById("customize").classList.remove("dontShow");
    document.getElementById("game").classList.remove("dontShow");
}

function restartGame() {    
    ctx.putImageData(new ImageData( canvas.width, canvas.height ), 0 , 0);    
    t.forChangingBoardSize();
    p.renderWithoutLoad(); 
    p1.renderWithoutLoad(); 
    dontShowTemplates();
    showGame();
    dropTimer ();
}

function setDifficulty() {
    userTime = document.getElementById("userTime").value;
    document.getElementById("time").innerHTML = userTime;
}

function chronometer () { 
    if ( timer == null ) {
        let time = document.getElementById("time").innerHTML;
        timer = setInterval( function () { setTime( time-- ) }, 1000 );
    }
}

function setTime( value ) {
    document.getElementById("time").innerHTML = value;
    if ( value === 0 ) 
        timeOut();
}

function dropTimer () { 
    if ( timer != null ) {
        clearInterval( timer );
        clearInterval( timer );
        timer = null;
        document.getElementById("time").innerHTML = userTime;
    }
}

function setWinner ( winnerName ) { 
    document.getElementById("winnerName").innerHTML = winnerName;
    showTemplate('winner');
}

function timeOut () { 
    showTemplate('timeOut');
}

function showTemplate ( templateName ) { 
    document.getElementById("game").classList.add("dontShow");
    dontShowHeader();
    switch (templateName) {
        case 'winner':
            document.getElementById("winner").classList.remove("dontShow");
            break;
        case 'timeOut':
            document.getElementById("timeOut").classList.remove("dontShow");
            break;
    }
}

function dontShowTemplates () {
    document.getElementById("winner").classList.add("dontShow");
    document.getElementById("timeOut").classList.add("dontShow");
}

