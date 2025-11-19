const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('message', (user, message) => {
  console.log(`${user}: ${message}`)
})

function sendMessage(user, message, emitter) {
  emitter.emit('message', user, message)
}

sendMessage('Luna', 'Good morning!', emitter)
sendMessage('Alex', 'Hi Luna!', emitter)
sendMessage('Kate', 'Hello Everyone!', emitter)