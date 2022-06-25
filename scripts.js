let userName,sideBar,container,onlineUsers;
let users = [];
let usersObject = {};
const PARTICIPANT_URL = "https://mock-api.driven.com.br/api/v6/uol/participants";
const MESSAGES_URL = "https://mock-api.driven.com.br/api/v6/uol/messages";
let loginAnswer = [];
let messagesReceived = [];
let messageDataCounter = 0;
let teste;



function getName(){
    userName = document.querySelector(".login-Name").value;
    usersObject = {name: userName};
    users.push(usersObject);
    console.log(users);
    sendName()
}

function hideLogin(){
        let loginPage = document.querySelector(".login-page");
        loginPage.classList.add("hidden");
        let messagePage = document.querySelector(".container");
        messagePage.classList.remove("hidden");
        console.log(loginAnswer[0].status);
        setInterval(conectionStatus,5000);
        getMessages()
        getActiveUsers()
        setInterval(getMessages,3000)
        setInterval(getActiveUsers,10000)
    }

function toggleSideBar(){
    sideBar = document.querySelector(".side-bar");
    sideBar.classList.add("visible");
    container = document.querySelector(".container");
    container.classList.add("opacity");
}
function unToggleSideBar(){
    if (container.classList.contains("opacity")){
        container.classList.remove("opacity");
        sideBar.classList.remove("visible");
    }
}

function addCheckMark(element){
   let checkOff = document.querySelector(".contact-container.check");
   if (checkOff !== null){
    checkOff.classList.remove("check");
   }
   element.classList.add("check");
}

function addCheckMarkVisibility(element){
    let checkOff = document.querySelector(".visibility-container.check")
    if (checkOff !== null){
        checkOff.classList.remove("check");
    }
    element.classList.add("check");
}

function selectingMessageType(){
    let messageBoard = document.querySelector(".messages-board")
    messageBoard.innerHTML = ""
    for (messageDataCounter = 0; messageDataCounter < messagesReceived.length; messageDataCounter++){
        if (messagesReceived[messageDataCounter].type === "status" ) {
            statusMessage()
        }
        else if (messagesReceived[messageDataCounter].type === "message"){
            publicMessage()
        }
        else if(messagesReceived[messageDataCounter].type === "private_message"){
            privateMessage()
        }
    }   
}
function statusMessage(){
    let messageBoard = document.querySelector(".messages-board");
    messageBoard.innerHTML += `<div class="message-template status">
    <div class="time">(${messagesReceived[messageDataCounter].time})</div>
    <p class="message"> <strong> ${messagesReceived[messageDataCounter].from}</strong> ${messagesReceived[messageDataCounter].text} </p>
    </div>`
    messageBoard.scrollIntoView(false);
}

function publicMessage(){
    let messageBoard = document.querySelector(".messages-board");
    messageBoard.innerHTML += `<div class="message-template public">
    <div class="time">(${messagesReceived[messageDataCounter].time})</div>
    <p class="message"> <strong>${messagesReceived[messageDataCounter].from} </strong> para <strong>${messagesReceived[messageDataCounter].to}:</strong> ${messagesReceived[messageDataCounter].text}</p>
    </div>`
    messageBoard.scrollIntoView(false);
}
function privateMessage(){
    let messageBoard = document.querySelector(".messages-board");
    messageBoard.innerHTML += `<div class="message-template private">
    <div class="time">(${messagesReceived[messageDataCounter].time})</div>
    <p class="message"> <strong>${messagesReceived[messageDataCounter].from} </strong> reservadamente para <strong>${messagesReceived[messageDataCounter].to}:</strong> ${messagesReceived[messageDataCounter].text}</p>
    </div>`
    messageBoard.scrollIntoView(false);
}

// API functions

function sendName(){
    let promise = axios.post(PARTICIPANT_URL,{name:userName});
    promise.then(response);
    promise.catch(errorHandling);

}
function response (answer){
    loginAnswer.push(answer);
    console.log(loginAnswer);
    hideLogin()
}
function errorHandling(error){
    alert("Por favor digite um nome válido.");
}
function conectionStatus() {
    let status_url = "https://mock-api.driven.com.br/api/v6/uol/status";
    let promise = axios.post(status_url,{name:userName});
    promise.then(goodConection);
    promise.catch(badConection);
}
function goodConection(response){
    console.log(response);
}
function badConection (response){
    console.log(response);
}
function getMessages(){
    let messagesData = axios.get(MESSAGES_URL);
    messagesData.then(sucessGettingMessage);
    messagesData.catch(errorGetingMessage);
}
function sucessGettingMessage(response){
    console.log(response);
    messagesReceived = response.data;
    console.log(messagesReceived);
    selectingMessageType()
    
}
function errorGetingMessage(response){
    console.log(response);
}

function sendingMessage(){
    let contactReceiver = document.querySelector(".contact-container.check p").innerHTML
    let message = document.querySelector(".message-sender").value;
    let messageType = document.querySelector(".visibility-container.check p").innerHTML
        if (messageType === "Público"){
            messageType = "message";
        }
        else if(messageType === "Reservadamente") {
            messageType = "private_message";
        }

    let sendingMenssageApi = axios.post(MESSAGES_URL,{from:usersObject.name,to:contactReceiver,text:message,type:messageType});
    sendingMenssageApi.then(getMessages);
    sendingMenssageApi.catch(errorSendingMessage);
}
function errorSendingMessage(){
    window.location.reload();
}

function getActiveUsers(){
    let usersDataRequest = axios.get(PARTICIPANT_URL);
    usersDataRequest.then(listActiveUsers);
    usersDataRequest.catch
}

function listActiveUsers(activeUserData){
    onlineUsers = activeUserData.data;
    console.log(onlineUsers);
    renderActiveUsers()
    
}
function renderActiveUsers(){
    let contactOptions = document.querySelector(".contact-options");
    contactOptions.innerHTML =`<div onclick="addCheckMark(this),addMessageReceiver(this)" class="contact-container">
    <div class="contact-template"><ion-icon name="people"></ion-icon><p>Todos</p>
    </div><ion-icon name="checkmark-outline"></ion-icon>`
    for (let i = 0; i < onlineUsers.length; i++){
        contactOptions.innerHTML += `<div onclick="addCheckMark(this),addMessageReceiver(this)" class="contact-container">
        <div class="contact-template"> <ion-icon  name="person-circle"></ion-icon><p>${onlineUsers[i].name}</p></div>
        <ion-icon name="checkmark-outline"></ion-icon></div>`
    }
}

function addMessageReceiver(contact){
    let messageDestination = contact.querySelector("p").innerHTML
    let footer = document.querySelector(".footer")
    footer.innerHTML = `<div class="input-wrapper" data-required="Enviando para ${messageDestination}" >
    <input class="message-sender"placeholder="Escreva aqui...">
</div>
<ion-icon onclick="sendingMessage()"name="paper-plane-outline"></ion-icon>`
}