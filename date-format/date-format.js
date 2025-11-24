const moment = require('moment')
const now = moment()

const date1 = now.format('DD-MM-YYYY')
const date2 = now.format('MMM Do YY')
const date3 = now.format('dddd')

console,console.log(date1, date2, date3);
