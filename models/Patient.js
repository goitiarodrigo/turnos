const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
   name: { type: String, default: null },
   lastName: { type: String, default: null },
   dni: { type: Number, default: null },
   password: { type: String, default: null },
   src: { type: String, default: null },
   data: {
      direction: {
         street: { type: String, default: null },
         num: { type: String, default: null },
         city: { type: String, default: null },
      },
      phoneNumber: { type: Number, default: null },
      mail: { type: String, default: null },
   },
   clinicHistory: { type: String, default: null },
   medicalData: [
      {
         doctorId: { type: mongoose.Types.ObjectId, ref: "doctor" },
         description: { type: String, default: null },
      },
   ],
   socialWork: { type: String, default: null },
   doc: { type: Boolean, default: false },
   google: { type: Boolean, default: false },
})

const Patient = mongoose.model("patient", patientSchema)
module.exports = Patient
