const fs = require('fs')

fs.writeFile('log.txt', '', (e) => {
    if (e) {
      console.log(e)
    }
  }) 

const logMessage = (message) => {
  fs.appendFile('log.txt', 'Hey there!', (e) => {
    if (e) {
      console.log('Error', e)
    }
  }) 
}
logMessage()

module.exports = {
  logMessage
}