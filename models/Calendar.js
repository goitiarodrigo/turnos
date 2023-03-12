const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    day:String,
    timeTable:Array
})

const Calendar = mongoose.model('calendar', calendarSchema)
module.exports = Calendar