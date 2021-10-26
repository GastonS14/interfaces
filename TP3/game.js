let batman = document.querySelector(".batman");
batman.addEventListener("click", jump);

let agachado = false;

function jump() {
    setTimeout( () => {
        batman.classList.remove("jumper");
    }, 1500)

    batman.classList.add("jumper");
}

document.addEventListener("keydown", agachate ); 
document.addEventListener("keyup", run );

function agachate () { 
    if ( event.key === 's' ) {
        if ( !agachado ){  
            agachado = true;
            batman.classList.add ("dodge");
        }
    }
}

function run () { 
    if ( agachado ) { 
        agachado= false;
        batman.classList.remove("dodge");    
    }
}