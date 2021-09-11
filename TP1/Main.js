
    // Necesito una var global para guardar la imagen original para restablecer el canvas
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let isMouseDown = false;
    let x = 0;
    let y = 0;
    let goma = false;
    let lapiz = true;
    let isImage = false;
    // array to save images
    let images = []

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
            ctx.lineWidth = 1;//document.getElementById("grosor").value;
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

    function clearError() { 
        document.getElementById("NoImageError").classList.add("dontShow");
    }

    function showError () { 
        document.getElementById("NoImageError").classList.remove("dontShow");
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
        ctx.putImageData( new ImageData( canvas.width, canvas.height ), 0, 0 );
        isImage = false;
        clearError();
    }

    // Original canvas
    function restartOriginal() {
        let img = getLastImage();
        if(img !== null) {
            dibujar(img);
        }
    }

    function getLastImage() {
        if(images.length === 0) return null;
        return images[images.length-1];
    }

    function loadImage () {
        let img = document.getElementById("inputImg").files[0];
        if(validImage(img) && img != undefined) {
            images.push(img);
            dibujar( img );
        }
    }

    // validate if the img already exists in the array by name
    function validImage(image) {
        for (let i = 0; i < images.length; i++) {
            if(images[i].name === image.name) {
                return false;
            }
        }
        return true;
    }

    // We only call this function with a valid image
    function dibujar ( img ) {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let image = new Image();

        image.src = `img/${img.name}`;
        image.onload = function () {
            ctx.drawImage( image, 0, 0, canvas.width, canvas.height );
            isImage = true;
            clearError();
        }
    }

    



