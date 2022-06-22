let userName,sideBar,container;

function getName(){
    userName = document.querySelector(".login-Name").value;
    console.log(userName)
    hideLogin()
    
}

function hideLogin(){
    if (userName === ""){
        alert("Por favor digite um nome")
    }
    else {
        let loginPage = document.querySelector(".login-page");
        loginPage.classList.add("hidden")
        let messagePage = document.querySelector(".container")
        messagePage.classList.remove("hidden")
    }
}

function toggleSideBar(){
    sideBar = document.querySelector(".side-bar")
    sideBar.classList.add("visible")
    container = document.querySelector(".container")
    container.classList.add("opacity")
    console.log("toggled")
}
function unToggleSideBar(){
    if (container.classList.contains("opacity")){
        container.classList.remove("opacity");
        sideBar.classList.remove("visible")
        console.log("untoggled")
    }
    
}
    
