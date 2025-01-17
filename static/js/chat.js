let path = window.location.pathname;
let pathParts = path.split('/');
let roomName = pathParts[pathParts.length - 2];

let url = `ws://${window.location.host}/ws/socket-server/${roomName}/`

const chatSocket = new WebSocket(url)

chatSocket.onmessage = function(e){
    let data = JSON.parse(e.data)
    console.log('Data:', data)

    if(data.type === 'chat'){
        let messages = document.getElementById('messages')

        messages.insertAdjacentHTML('beforeend', `<div>
                                <p>${data.username}: ${data.message}</p>
                            </div>`)
    }
}

let form = document.getElementById('form')
form.addEventListener('submit', (e)=> {
    e.preventDefault()
    let message = e.target.message.value
    let username = e.target.username.value
    chatSocket.send(JSON.stringify({
        'message':message,
        'username':username
    }))
    form.reset()
})