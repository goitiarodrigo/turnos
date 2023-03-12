const Appointment = require("../models/Appointment")
const transport = require("../config/transport")

const appointmentControllers = {
   addAppointment: async (req, res) => {
      const {params,body,user}=req
      try {
         const newAppointment = new Appointment({
            date: body.date,
            doctorId: params.id,
            patientId: user._id,
         })
         await newAppointment.save()
         res.json({ success: true, res: newAppointment })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   getAppointments: async (req, res) => {
      if (req.user.doc) {
         try {
            let appointments = await Appointment.find({
               doctorId: req.user._id,
            }).populate("patientId")
            res.json({ success: true, res: appointments })
         } catch (err) {
            res.json({ success: false, res: err.message })
         }
      } else {
         try {
            let appointments = await Appointment.find({
               patientId: req.user._id,
            }).populate("doctorId", {
               name: 1,
               lastName: 1,
               src: 1,
               registration: 1,
               specialty: 1,
            })
            res.json({ success: true, res: appointments })
         } catch (err) {
            res.json({ success: false, res: err.message })
         }
      }
   },
   getAppointementByDoctor: async (req, res) => {
      try {
         let appointmenDoctor = await Appointment.find({
            doctorId: req.params.id,
         })
         res.json({ success: true, res: appointmenDoctor })
      } catch (err) {
         res.json({ success: false, res: err.message })
      }
   },
   deleteAppointement:async(req,res)=>{
      try{
         let removeAppointment = await Appointment.findOneAndDelete({_id:req.params.id})
         res.json({success:true, res:removeAppointment})
      }catch(err){
         res.json({success:false, res:error.message})
      }
   },
   sendMails:async(req, res)=>{
      const {info,doc,action}= req.body
      const {name, lastName, data}=req.user
      const htmlConfirm = `
      <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
            <div style="width: 100%;margin:20px 0; text-align: center;">
                <img src="https://i.postimg.cc/s2Z5nX3q/logo.png" />
            </div>

          <tr>
            <td style="background-color: #F0F3F5">
              <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                <h1 style="color: #19b1bc; margin: 0 0 7px">Reserva de turno</h1>
                <h2 style="color: #000; margin: 0 0 7px">Estimado/a ${name} ${lastName}:</h2>
                <p style="margin: 2px; font-size: 15px; color: #000">
                           Te enviamos este e-mail para comunicarte que has reservado un turno en
                           el Centro Medico NutriMed<br>
                </p>
                <h2 style="color: #19b1bc;">Constancia del Turno:</h2>
                <ul style="font-size: 15px;  margin: 10px 0">
                  <li style="color: #000;">Profesional: ${doc.name} ${doc.lastName} - ${doc.specialty} - MP${doc.registration}</li>
                  <li style="color: #000;">Turno para el ${info.date}</li>
                  <li style="color: #000;">Horario: ${info.hour}hs</li>
                </ul>
                  <h2 style="color: #19b1bc;">INFORMACION IMPORTANTE - MEDIDAS DE PROTECCIÓN:</h2>
                  <p style="margin: 2px; font-size: 15px; color: #000">
                      Nuestra institución cumple todos los protocolos, recomendaciones e
                      instrucciones sanitarias en torno al nuevo Coronavirus. Por esta
                      razón, le solicitamos respetar las siguientes medidas al concurrir a
                      su turno:
                  </p>
                <ul style="font-size: 15px;  margin: 10px 0; color: #000">
                  
                  <li>Asista solo. Cuando lo necesite, con 1 acompañante.</li>
                  <li>Utilice barbijo durante su permanencia en la institución.</li>
                  <li>Mantenga 2 metros de distancia con los demás.</li>
                            <li>Higienice sus manos al ingresar, antes de retirarse y las veces que lo considere necesario.</li>
                </ul>
                        <h2 style="margin: 0 0 7px; color: #19b1bc">Importante:</h2>
                        <p style="margin: 2px; font-size: 15px; color: #000;">
                          Sr/a. Paciente: Solicitamos por favor que en caso de no poder asistir
                          al turno solicitado que cancele el mismo.</p>
                <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #19b1bc;">
                  <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | NutriMed.</p></a>	
                </div>
              </td>
          </tr>
      </table>
          `
      const htmlCancel=`<table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
         <div style="width: 100%;margin:20px 0; text-align: center;">
            <img src="https://i.postimg.cc/s2Z5nX3q/logo.png" />
         </div>
         <tr>
            <td style="background-color: #F0F3F5">
            <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
               <h1 style="color: #19b1bc; margin: 0 0 7px">Reserva de turno</h1>
               ${!req.user.doc ? `<h2 style="color: #000; margin: 0 0 7px">Estimado/a ${name} ${lastName}:</h2>`
            : `<h2 style="color: #000; margin: 0 0 7px">Estimado/a ${doc.name} ${doc.lastName}:</h2>` }
               ${!req.user.doc ?`<h2 style="color: #19b1bc;">El siguiente Turno que tenia programado fue CANCELADO:</h2>`
            : `<h2 style="color: #19b1bc;">El siguiente Turno que tenia programado fue CANCELADO por el Profesional:</h2>`}
               ${!req.user.doc ?`<ul style="font-size: 15px;  margin: 10px 0">
                  <li style="color: #000;">Profesional: ${doc.name} ${doc.lastName} - ${doc.specialty} - MP${doc.registration}</li>
                  <li style="color: #000;">Turno para el ${info.date}</li>
                  <li style="color: #000;">Horario: ${info.hour}hs</li>
               </ul>`
               : `<ul style="font-size: 15px;  margin: 10px 0">
                  <li style="color: #000;">Profesional: ${name} ${lastName} - ${req.user.specialty} - MP${req.user.registration}</li>
                  <li style="color: #000;">Turno para el ${info.date}</li>
                  <li style="color: #000;">Horario: ${info.hour}hs</li>
               </ul>`}
               <h2 style="margin: 0 0 7px; color: #19b1bc">Importante:</h2>
               <p style="margin: 2px; font-size: 15px; color: #000;">
                     Sr/a. Paciente:Si desear reprogramar, por favor ingrese a: 
                     <a href="">aca va el mail</a></p>
               <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #19b1bc;">
                  <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | NutriMed.</p></a>	
               </div>
            </td>
         </tr>
      </table>`
      try{
         let options ={
            from:'NutriMed <nutrimed.centronutricional@gmail.com>',
            to: !req.user.doc ? data.mail : doc.data.mail,
            subject: action ? "Confimarcion de Turno" : "Cancelacion de Turno",
            html: action ? htmlConfirm : htmlCancel,
         }
         transport.sendMail(options, (err, info) => {
            if (err) {
               throw Error()
            } else {
               res.json({ success: true })
            }
         })
      } catch (err) {
         res.json({ success: false })
      }
   },
   deleteAllAppointmentByDoctor:async(req,res)=>{
      try{
         let docDelete = await Appointment.deleteMany({doctorId: req.user._id})
            if(docDelete){
                res.json({success: true})
            }else{
                throw new Error()
            }
      }catch(err){
         return({success:true, res:err.message})
      }
   }
}

module.exports = appointmentControllers
