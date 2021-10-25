let batman = document.querySelector(".batman");
batman.addEventListener("click", jump);

function jump() {
    setTimeout( () => {
        batman.classList.remove("jumper");
    }, 1500)

    batman.classList.add("jumper");
}
