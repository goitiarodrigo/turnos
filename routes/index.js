const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/userControllers");
const doctorControllers = require("../controllers/doctorControllers");
const patientControllers = require("../controllers/patientControllers");
const appointmentControllers = require("../controllers/appointmentControllers");
const calendarControllers = require("../controllers/calendarControllers");
const extraControllers = require('../controllers/extraControllers')
const validator = require("../controllers/validator");

router.route("/user")
.post(validator, userControllers.addUser);

router
   .route("/doctor")
   .post(doctorControllers.signIn)
   .put(
      passport.authenticate("jwt", { session: false }),
      doctorControllers.editProfile
   )
   .delete(passport.authenticate("jwt", { session: false }),
   doctorControllers.deleteDoctor)

router.route("/doctors")
.get(doctorControllers.getDoctors)


router
  .route("/doctor/:id")
  .get(doctorControllers.getDoctorById)
  .put(
    passport.authenticate("jwt", { session: false }),
    doctorControllers.changedReviewAndScore
  )

router
   .route("/patient")
   .post(patientControllers.signIn)
   .put(
      passport.authenticate("jwt", { session: false }),
      patientControllers.editProfile
   )
   
router
   .route("/patient/:id")
   .put(
      passport.authenticate("jwt", { session: false }),
      patientControllers.addMedicalData
   )

router
  .route("/appointment/:id")
  .get(appointmentControllers.getAppointementByDoctor)
  .post(
    passport.authenticate("jwt", { session: false }),
    appointmentControllers.addAppointment
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    appointmentControllers.deleteAppointement
  );

router
   .route("/appointments")
   .get(
      passport.authenticate("jwt", { session: false }),
      appointmentControllers.getAppointments
   )
   .delete( passport.authenticate("jwt", { session: false }),appointmentControllers.deleteAllAppointmentByDoctor)

router
   .route("/verifyToken")
   .get(
      passport.authenticate("jwt", { session: false }),
      userControllers.verifyToken
   )

router
   .route("/calendar")
   .post(calendarControllers.addDay)
   .get(calendarControllers.getAllCalendar)

router
   .route("/mail")
   .post(
      passport.authenticate("jwt", { session: false }),
      appointmentControllers.sendMails
   )

router
   .route("/avatar")
   .post(extraControllers.addAvatar)
   .get(extraControllers.getAvatar)

router
   .route("/socialwork")
   .post(extraControllers.addSocialwork)
   .get(extraControllers.getSocialwork)

module.exports = router
