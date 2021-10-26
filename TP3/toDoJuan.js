
document.getElementById("playerName").addEventListener('keyup', setName );
const time = document.getElementById("time");
const userTime = document.getElementById("userTime");
const lastLayer = document.getElementById("layer6");

function setDifficulty () { 
    time.innerHTML = userTime.value;
}


function play () {
    document.getElementById("customize").classList.add("dontShow"); 
    let aux = Array();
    aux.push( document.getElementById("character") );
    aux.push( document.getElementById("joker") );
    aux.push( document.getElementById("dolarJoker") );
    aux.push( document.getElementById("dolar") );
    aux.forEach( e => {
        e.classList.remove("dontShow");
    });
    
}

function setName () { 
    let newName = document.getElementById("inputNameP").value;
    p.setName( newName ); // p = player 
}

function changeBackground() { 
    let layer7, layer8;
    if ( event.currentTarget.value === 'city' ) {
        removeNightClasses (); 
        layer7 = document.createElement("div");
        layer7.classList.add( "layer", "layer-7");
        layer7.id = "layer7";
        layer8 = document.createElement("div");
        layer8.classList.add( "layer", "layer-6");
        layer8.id = "layer8";
        lastLayer.insertAdjacentElement('afterend', layer8 );
        lastLayer.insertAdjacentElement('afterend', layer7 );
        addCityClasses();
    } else { 
        layer7 = document.getElementById("layer7");
        if ( layer7 )
            layer7.remove();
        layer8 = document.getElementById("layer8")
        if ( layer8) 
            layer8.remove();
        removeCityClasses();
        addNightClasses();
    }
}

function addNightClasses ( ) { 
    document.getElementById("layer1").classList.add("layer-5");
    document.getElementById("layer2").classList.add("layer-4");
    document.getElementById("layer3").classList.add("layer-3");
    document.getElementById("layer4").classList.add("layer-2");
    document.getElementById("layer5").classList.add("layer-1");
    document.getElementById("layer6").classList.add("layer-0");
    let layer7 = document.getElementById("layer7");
    if ( layer7 )
        layer7.remove();
    let layer8 = document.getElementById("layer8")
    if ( layer8 )
        layer8.remove();
}

function addCityClasses() { 
    document.getElementById("layer1").classList.add("layer-13");
    document.getElementById("layer2").classList.add("layer-12");
    document.getElementById("layer3").classList.add("layer-11");
    document.getElementById("layer4").classList.add("layer-10");
    document.getElementById("layer5").classList.add("layer-9");
    document.getElementById("layer6").classList.add("layer-8");
}

function removeNightClasses () { 
    document.getElementById("layer1").classList.remove("layer-5");
    document.getElementById("layer2").classList.remove("layer-4");
    document.getElementById("layer3").classList.remove("layer-3");
    document.getElementById("layer4").classList.remove("layer-2");
    document.getElementById("layer5").classList.remove("layer-1");
    document.getElementById("layer6").classList.remove("layer-0");
}

function removeCityClasses () { 
    document.getElementById("layer1").classList.remove("layer-13");
    document.getElementById("layer2").classList.remove("layer-12");
    document.getElementById("layer3").classList.remove("layer-11");
    document.getElementById("layer4").classList.remove("layer-10");
    document.getElementById("layer5").classList.remove("layer-9");
    document.getElementById("layer6").classList.remove("layer-8");
}
