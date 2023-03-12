const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:String,
    lastName:String,
    dni:{type:Number, default:null},
    src:String,
    description:String,
    registration:{type:String, default:null},
    specialty:{type:String, default:null},
    password:{type:String, default:null},
    socialWork:{type:String},
    data:{
        direction:{
            street:{type:String, default:null},
            num:{type:String, default:null},
            city:{type:String, default:null}, 
        },
        phoneNumber:{type:Number, default:null},
        mail:{type:String, default:null}
    },
    score:[{
        patientId:{type:mongoose.Types.ObjectId, ref:'patient'},
        point:Number
    }],
    review:[{
        patientId:{type:mongoose.Types.ObjectId, ref:'patient'},
        text:String,  
    }],
    doc:Boolean,
    google:{type:Boolean, default:false}
})

const Doctor = mongoose.model('doctor', doctorSchema)
module.exports = Doctor




