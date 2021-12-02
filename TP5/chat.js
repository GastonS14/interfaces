document.addEventListener("DOMContentLoaded", () => { 
    document.getElementById("sendMessage").addEventListener("click", sendMessage );
    updateScroll();
});


function sendMessage() { 
    let inputMessage = document.getElementById("addMessage");
    let date = new Date ();
    let newMessage = inputMessage.value;
    if ( newMessage != "" ) {
        inputMessage.value = "";
        createMessage( newMessage, date.getHours(), date.getMinutes() );
    }
}

function createMessage ( message, hour, minutes ) { 
    if ( minutes < 10 )
        minutes = "0" + minutes;
    const containerChat = document.getElementById("chatP2P");
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.classList.add("flex-row", "borderRadius", "bg-myMessage","font-size-13", "p-2","ps-2", "pe-3","mb-1");
    div.classList.add( "d-flex" ,"flex-row-reverse" ,"ms-5");
    p.innerHTML = message;
    let span = document.createElement("span");
    console.log(minutes);
    span.innerHTML = hour + ":" + minutes; 
    p.appendChild( span );
    div.appendChild( p );
    containerChat.appendChild( div );
    updateScroll();
}

function updateScroll(){
    let containerChat = document.getElementById("chatP2P");
    containerChat.scrollTop = containerChat.scrollHeight;
}