
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
        console.log ( " goma : " + goma );
        console.log ( " lapiz : " + lapiz );
    }

    function paint () { 
        goma = false;
        lapiz = true;
        console.log ( " goma : " + goma );
        console.log ( " lapiz : " + lapiz );
    }

    document.getElementById("myCanvas").addEventListener("mouseup", function () {
        isMouseDown = false; 
        console.log ( "mouse is up ");
        x = 0;
        y = 0;
        paint();
    });

    document.getElementById("myCanvas").addEventListener("mousedown", function ( event ) {
        isMouseDown = true;
        console.log ( "mouse is down" );
        x = event.offsetX;
        y = event.offsetY;
    });
    
    document.getElementById("myCanvas").addEventListener( "mousemove", function ( event ) { 
        if ( isMouseDown ) {
            console.log( "mouse is down/hold and move ");
            ctx.beginPath();
            let color =  document.getElementById("color").value;
            ctx.strokeStyle = color;
            console.log( color );
            console.log( typeof color );
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
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
 
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
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
            let filtro = new filtroBlur( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    }

    function fSobel () {
        if ( isImage ) { 
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
            let filtro = new filtroSobel( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError ();
        }
    }

    // filtro blanco y negro
    function filtroBN () {
        if ( isImage ) { 
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new FiltroBW ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    } 

    function fSepia() { 
        if ( isImage ) {
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroSepia ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError()
        }
    }

    function fInverso() { 
        if ( isImage ) { 
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroInverso ( imageData, canvas );
            filtro.setFiltro();
        } else { 
            this.showError();
        }
    }

    function fContraste() { 
        if ( isImage ) { 
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d"); 
            // let contraste = document.getElementById("contraste").value; -> seria algo asi ( ver FiltroContraste.js )
            let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
            let filtro = new filtroContraste ( imageData, canvas, 100 );
            filtro.setFiltro();
        } else { 
           this.showError();
        }
    }

    // canvas blanco
    function restart() { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
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

    



 