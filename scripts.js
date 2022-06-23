let userName,sideBar,container;
let users = [];
let usersObject ={};
let participant_url = "https://mock-api.driven.com.br/api/v6/uol/participants";
let loginAnswer =[];
let status_url = "https://mock-api.driven.com.br/api/v6/uol/status"



function response (answer){
    loginAnswer.push(answer)
    console.log(loginAnswer)
    hideLogin()
}
function errorHandling(error){
    alert("Por favor digite um nome válido.")
}
function getName(){
    userName = document.querySelector(".login-Name").value;
    usersObject = {name: userName}
    users.push(usersObject)
    console.log(users)
    let promise = axios.post(participant_url,{name:userName});
    promise.then(response);
    promise.catch(errorHandling);
}

function hideLogin(){
        let loginPage = document.querySelector(".login-page");
        loginPage.classList.add("hidden")
        let messagePage = document.querySelector(".container")
        messagePage.classList.remove("hidden")
        console.log(loginAnswer[0].status)
        setInterval(conectionStatus,5000)
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

function addCheckMark(element){
   
   let checkOff = document.querySelector(".contact-container.check")

   if (checkOff !== null){
    checkOff.classList.remove("check")
   }
   element.classList.add("check")
}

function addCheckMarkVisibility(element){
    let checkOff = document.querySelector(".visibility-container.check")
    if (checkOff !== null){
        checkOff.classList.remove("check")
    }
    element.classList.add("check")
}

function conectionStatus() {
    let promise = axios.post(status_url,{name:userName});
    promise.then(goodConection)
    promise.catch(badConection)
}
function goodConection(response){
    console.log(response)
}
function badConection (response){
    console.log(response)
}
