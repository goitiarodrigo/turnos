const Patient = require("../models/Patient")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const patientControllers = {
   signIn: async (req, res) => {
      const { data, password, flagGoogle } = req.body
      try {
         let userExist = await Patient.findOne({
            "data.mail": data.mail,
         }).populate("medicalData.doctorId", {
            name: 1,
            lastName: 1,
            registration: 1,
         })
         if (!userExist)
            throw new Error("The data entered is not valid. Please, try again.")
         if (userExist.google && !flagGoogle)
            throw new Error("Sign in with Google.")
         let match = bcryptjs.compareSync(password, userExist.password)
         if (!match)
            throw new Error("The data entered is not valid. Please, try again.")
         let token = jwt.sign({ ...userExist }, process.env.SECRETOKEN)
         res.json({ success: true, res: {userExist, token } })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   addMedicalData: async (req, res) => {
      try {
         let newMedicalData = await Patient.findOneAndUpdate(
            { _id: req.params.id },
            {
               $push: {
                  medicalData: {
                     doctorId: req.user._id,
                     description: req.body.description,
                  },
               },
            },
            { new: true }
         ).populate("medicalData.doctorId", {
            name: 1,
            lastName: 1,
            registration: 1,
         })
         res.json({ success: true, res: newMedicalData.medicalData })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   editProfile: async (req, res) => {
      try {
         let modifyPatient = await Patient.findOneAndUpdate(
            { _id: req.user._id },
            { ...req.body },
            { new: true }
         )
         if (modifyPatient) {
            res.json({ success: true, res: modifyPatient })
         } else {
            throw new Error("Error")
         }
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
}
module.exports = patientControllers
