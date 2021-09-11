
    // Necesito una var global para guardar la imagen original para restablecer el canvas xD
    var isMouseDown = false;
    var canvas = document.getElementById("myCanvas"); 
    var ctx = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    var goma = false;
    var lapiz = true;
    var isImage = false;

    function borrar() { 
        goma = true;
        lapiz = false;
    }

    function paint () { 
        goma = false;
        lapiz = true;
    }

    document.getElementById("myCanvas").addEventListener("mouseup", function () {
        isMouseDown = false; 
        x = 0;
        y = 0;
        paint();
    });

    document.getElementById("myCanvas").addEventListener("mousedown", function ( event ) {
        isMouseDown = true;
        x = event.offsetX;
        y = event.offsetY;
    });
    
    document.getElementById("myCanvas").addEventListener( "mousemove", function ( event ) { 
        if ( isMouseDown ) {
            ctx.beginPath();
            ctx.strokeStyle = document.getElementById("color").value;
            ctx.lineWidth = 1;//document.getElementById("grosor").value;
            ctx.moveTo( x, y );
            if ( goma ) { 
                console.log( goma );
                ctx.strokeStyle = "white";
                ctx.lineWidth = 10;
            }
            ctx.lineTo( event.offsetX, event.offsetY );
            ctx.stroke();
            x = event.offsetX;
            y = event.offsetY;
        }
    });


    function saveImg () { 
        let img = document.getElementById("inputImg").files[0];
        dibujar( img );
    }

    function dibujar ( img ) {
        
 
        let image = new Image();
        image.src = "img/github.png"; // no funciona desde un input, tengo que descargar la img y guardarla en img/
        
        image.onload = function () { 
            ctx.drawImage( image, 0,0, canvas.width,canvas.height );
            isImage = true;
            clearError();
        }
    }

    function fBlur () { 
        if ( isImage ) {
            let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
            let filtro = new filtroBlur( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    }

    function fSobel () {
        if ( isImage ) { 
            let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
            let filtro = new filtroBordeHorizontal( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError ();
        }
    }

    function fBordesVert() { 
        if ( isImage ) { 
            let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
            let filtro = new filtroBordeVertical( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError ();
        }
    }

    // filtro blanco y negro
    function filtroBN () {
        if ( isImage ) { 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new FiltroGrey ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    } 

    function fSepia() { 
        if ( isImage ) {
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroSepia ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError()
        }
    }

    function fInverso() { 
        if ( isImage ) { 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroInverso ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    }

    function fContraste() { 
        if ( isImage ) {  
            // let contraste = document.getElementById("contraste").value; -> seria algo asi ( ver FiltroContraste.js )
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroContraste ( imageData, canvas, 100 );
            filtro.setFiltro();
        } else { 
           this.showError();
        }
    }

    function fBrillo () { 
        if ( isImage ) { 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroBrillo ( imageData, canvas, 15 );
            filtro.setFiltro();
        } else { 
           this.showError();
        }
    }

    function fBinarizacion () { 
        if ( isImage ) { 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroBinario ( imageData, canvas );
            filtro.setFiltro();
        } else { 
           this.showError();
        }
    }

    // canvas blanco
    function restart() { 
        ctx.putImageData( new ImageData( canvas.width, canvas.height ), 0, 0 );
        isImage = false;
        clearError();
    }

    function clearError() { 
        document.getElementById("NoImageError").classList.add("dontShow");
    }

    function showError () { 
        document.getElementById("NoImageError").classList.remove("dontShow");
    }

    



