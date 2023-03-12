const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    date:{
        hour:String,
        date:String
    },
    doctorId:{type:mongoose.Types.ObjectId, ref:'doctor'},
    patientId:{type:mongoose.Types.ObjectId, ref:'patient'}
})
const Appointment = mongoose.model('appointment', appointmentSchema)
module.exports = Appointment