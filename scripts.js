let userName;

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
    
