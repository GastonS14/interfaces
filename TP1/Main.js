
    let canvas = document.getElementById("myCanvas");
    const canvasCopy = document.createElement("canvas");
    canvasCopy.width = canvas.width;
    canvasCopy.height = canvas.height;
    const ctx = canvas.getContext("2d");
    const ctxCopy = canvasCopy.getContext( "2d" );
    let isMouseDown = false;
    let x = 0;
    let y = 0;
    let goma = false;
    let lapiz = true;
    let isImage = false;
    // array to save images
    let images = [];
    let maxWidthCanvas = 700;
    let maxHeightCanvas = 330;

    function borrar() { 
        goma = true;
        lapiz = false;
    }

    function paint () { 
        goma = false;
        lapiz = true;
    }

    canvas.addEventListener("mouseup", function () {
        isMouseDown = false; 
        x = 0;
        y = 0;
        paint();
    });

    canvas.addEventListener("mousedown", function ( event ) {
        isMouseDown = true;
        x = event.offsetX;
        y = event.offsetY;
    });

    canvas.addEventListener( "mousemove", function ( event ) {
        if ( isMouseDown ) {
            ctx.beginPath();
            ctx.strokeStyle = document.getElementById("color").value;
            ctx.lineWidth = 1;
            ctx.moveTo( x, y );
            if ( goma ) { 
                ctx.strokeStyle = "white";
                ctx.lineWidth = 10;
            }
            ctx.lineTo( event.offsetX, event.offsetY );
            ctx.stroke();
            x = event.offsetX;
            y = event.offsetY;
        }
    });

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

    function download() {
        let link = window.document.createElement( 'a' );
        let url = canvas.toDataURL();
        let lastImage = getLastImage();
        if(lastImage !== null) {
            let filename = `edited_${lastImage.name}`;
            link.setAttribute( 'href', url );
            link.setAttribute( 'download', filename );
            link.style.visibility = 'hidden';
            window.document.body.appendChild( link );
            link.click();
            window.document.body.removeChild( link );
        }
    }

    // canvas blanco
    function restart() { 
        restartSize();
        ctx.putImageData( new ImageData( canvas.width, canvas.height ), 0, 0 );
        isImage = false;
        clearError();
    }

    // Original canvas
    function restartOriginal() {
        let img = getLastImage();
        if( img !== null ) 
            ctx.drawImage( img, 0, 0, canvas.width, canvas.height );
    }

    function getLastImage() {
        if(images.length === 0) return null;
        return images[images.length-1];
    }

    /* 
        Carga una imagen desde disco, utiliza un file reader para generar el src de la imagen a dibujar,
        luego la dibuja en el canvas.
    */
    function loadImage () {
        restartSize ();
        let img = document.getElementById("inputImg").files[0];
        if( img != undefined ) {
            const reader = new FileReader();
            reader.onload = function () { 
                                return setImageAndDraw( new Image() );
                            } 
            reader.readAsDataURL(img);
        }
    }

    /*
        Setea las dimensiones del contexto del canvas al valor original 
    */
    function restartSize () { 
        ctx.canvas.width = ctxCopy.canvas.width;
        ctx.canvas.height = ctxCopy.canvas.height;
    }

    function setImageAndDraw ( image ) { 
        image.src = event.target.result; 
        image.alt = "User Image from disk";
        dibujar ( image );
    }

    // We only call this function with a valid image
    function dibujar ( image ) {
        image.onload = function () { 
            calculateCanvasSize( image );
            ctx.drawImage( image, 0, 0, canvas.width, canvas.height );
            isImage = true;
            clearError();
            images.splice( 0,1, image); 
        }
    }

    /*
        Calcula el ratio y dependendiento de su valor se setean las dimensiones del canvas.
    */
    function calculateCanvasSize ( image ) { 
        let aspectRatio = Math.min ( canvas.width / image.width ,  canvas.height / image.height );
        if ( aspectRatio > 1 ){ // canvas mas grande que imagen
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
        } else {    // canvas mas chico que imagen
            ctx.canvas.width = image.width * aspectRatio;
            ctx.canvas.height = image.height * aspectRatio;
        }
    }

    function clearError() { 
        document.getElementById("NoImageError").classList.add("dontShow");
    }

    function showError () { 
        document.getElementById("NoImageError").classList.remove("dontShow");
    }




