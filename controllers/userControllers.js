const Patient = require("../models/Patient")
const Doctor = require("../models/Doctor")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
   addUser: async (req, res) => {
      const { name, lastName, data, password, src, google, doc, passwordAdm} =
         req.body
      const hashedPassword = bcryptjs.hashSync(password)
      const userType = doc ? Doctor : Patient
      try {
         if (process.env.PASSWORD_ADM !== passwordAdm && userType == Doctor)
            throw new Error("No tienes autorizacion")
         let userExist = new userType({
            name,
            lastName,
            data,
            password: hashedPassword,
            src,
            google,
            doc,
         })
         let repeatUser = await userType.findOne({ "data.mail": data.mail })
         if (repeatUser)
            throw new Error("El mail ya se encuentra en uso")
         await userExist.save()
         let token = jwt.sign({ ...userExist }, process.env.SECRETOKEN)
         res.json({ success: true, res:{userExist,token}})
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   verifyToken: (req, res) => {
      res.json({userExist: req.user})
   }
}
module.exports = userControllers
