let userName,sideBar,container;
let users = [];
let usersObject = {};
let participant_url = "https://mock-api.driven.com.br/api/v6/uol/participants";
const MESSAGES_URL = "https://mock-api.driven.com.br/api/v6/uol/messages";
let loginAnswer = [];
let messagesReceived = [];
let messageDataCounter = 0;





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
        getMessages()
        //setInterval(getMessages,3000)
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

function selectingMessageType(){
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
    <p class="message"> <strong> ${messagesReceived[messageDataCounter].from}</strong> entrou na sala...</p>
    </div>`
    messageBoard.scrollIntoView(false)
}

function publicMessage(){
    let messageBoard = document.querySelector(".messages-board");
    messageBoard.innerHTML += `<div class="message-template public">
    <div class="time">(${messagesReceived[messageDataCounter].time})</div>
    <p class="message"> <strong>${messagesReceived[messageDataCounter].from} </strong> para <strong>${messagesReceived[messageDataCounter].to}:</strong> ${messagesReceived[messageDataCounter].text}</p>
    </div>`
    messageBoard.scrollIntoView(false)
}
function privateMessage(){
    let messageBoard = document.querySelector(".messages-board");
    messageBoard.innerHTML += `<div class="message-template private">
    <div class="time">(${messagesReceived[messageDataCounter].time})</div>
    <p class="message"> <strong>${messagesReceived[messageDataCounter].from} </strong> reservadamente para <strong>${messagesReceived[messageDataCounter].to}:</strong> ${messagesReceived[messageDataCounter].text}</p>
    </div>`
    messageBoard.scrollIntoView(false)
}

// API functions
function response (answer){
    loginAnswer.push(answer)
    console.log(loginAnswer)
    hideLogin()
}
function errorHandling(error){
    alert("Por favor digite um nome válido.")
}
function conectionStatus() {
    let status_url = "https://mock-api.driven.com.br/api/v6/uol/status";
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
function getMessages(){
    let messagesData = axios.get(MESSAGES_URL)
    messagesData.then(sucessGettingMessage)
    messagesData.catch(errorGetingMessage)
}
function sucessGettingMessage(response){
    console.log(response)
    messagesReceived = response.data
    console.log(messagesReceived)
    selectingMessageType()
    
}
function errorGetingMessage(response){
    console.log(response)
}

function sendingMessage(){
    let contactReceiver = document.querySelector(".contact-container.check p").innerHTML
    let message = document.querySelector(".message-sender").value
    let messageType = document.querySelector(".visibility-container.check p").innerHTML
        if (messageType === "Público"){
            messageType = "message";
        }
        else if(messageType === "Reservadamente") {
            messageType = "private_message"
        }

    let sendingMenssageApi = axios.post(MESSAGES_URL,{from:usersObject.name,to:contactReceiver,text:message,type:messageType});
    sendingMenssageApi.then(getMessages);
    sendingMenssageApi.catch(errorDebugging);
}
function errorDebugging(answer){
    console.log(answer);
}
