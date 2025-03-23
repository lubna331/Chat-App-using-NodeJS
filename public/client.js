const socket = io()

let fame;
let textarea = document.querySelector('#textarea')
let messageArea = document.getElementById('container')

do {
    fame = prompt('Please enter your name: ')
} while(!fame)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMess(e.target.value)
    }
})

function sendMess (message) {
    let msg = {
        user: fame,
        message: message.trim()
    }

    //Append 
    apndMess(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()


    // send to server
socket.emit('message', msg)
}


function apndMess(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


// receive message

socket.on('message', (msg) => {
    apndMess(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
