
document.addEventListener("DOMContentLoaded", cargarPagina); 

function cargarPagina() { 
    document.getElementById("signIn").addEventListener("click", goToHome );
    document.getElementById("signUp").addEventListener("click", signUp );
    document.getElementById("user").addEventListener("click", clearError );
    document.getElementById("pass").addEventListener("click", clearError );
}

function signUp () { 
    window.location.href = getPath() + "home.html";
}

function goToHome() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if ( user === "juanCarlos") {
        if ( pass == 1234 )
            window.location.href = getPath() + "home.html"; 
        else{
            document.getElementById("wrongPass").classList.remove("dontShow");
            document.getElementById("wrongPass").classList.add("show");
        }
    } else {
        document.getElementById("wrongUser").classList.remove("dontShow") 
        document.getElementById("wrongUser").classList.add("show");
    }
}

function getPath (){
    let loc = window.location;
    let pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function clearError () { 
    document.getElementById("wrongPass").classList.add("dontShow");
    document.getElementById("wrongPass").classList.remove("show");
    document.getElementById("wrongUser").classList.add("dontShow");
    document.getElementById("wrongUser").classList.remove("show");
}