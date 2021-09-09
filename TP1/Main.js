
    // Necesito una var global para guardar la imagen original para restablecer el canvas xD
    
    function saveImg () { 
        let img = document.getElementById("inputImg").files[0];
        dibujar( img );
    }

    function dibujar ( img ) {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
 
        let image = new Image();
        image.src = "img/anashei.png"; // no funciona desde un input, tengo que descargar la img y guardarla en img/
        
        image.onload = function () { 
            ctx.drawImage( image, 0,0, canvas.width,canvas.height );
        }
       
    }

    function fBlur () { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
        let filtro = new filtroBlur( imageData, canvas );
        filtro.setFiltro();
    }

    function fSobel () {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let imageData = ctx.getImageData ( 0,0, canvas.width, canvas.height );
        let filtro = new filtroSobel( imageData, canvas );
        filtro.setFiltro();
        // No anda, mal planteada la multiplicacion de matriz, consultar!

    }

    // filtro blanco y negro
    function filtroBN () {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
        let filtro = new FiltroBW ( imageData, canvas );
        filtro.setFiltro();
    } 

    function fSepia() { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
        let filtro = new filtroSepia ( imageData, canvas );
        filtro.setFiltro();
    }

    function fInverso() { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
        let filtro = new filtroInverso ( imageData, canvas );
        filtro.setFiltro();
    }

    function fContraste() { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        // let contraste = document.getElementById("contraste").value; -> seria algo asi ( ver FiltroContraste.js )
        let imageData = ctx.getImageData( 0,0, canvas.width, canvas.height)
        let filtro = new filtroContraste ( imageData, canvas, 100 );
        filtro.setFiltro();
    }

    // canvas blanco
    function restart() { 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d"); 
        ctx.putImageData( new ImageData( canvas.width, canvas.height ), 0, 0 );
    }
    
 




 