const Doctor = require("../models/Doctor");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorControllers = {
  signIn: async (req, res) => {
    const { data, password, flagGoogle } = req.body;
    try {
      let userExist = await Doctor.findOne({ "data.mail": data.mail }).populate(
        "review.patientId",
        { name: 1, lastName: 1, src: 1 }
      );
      if (!userExist)
        throw new Error("The data entered is not valid. Please, try again.");
      if (userExist.google && !flagGoogle)
        throw new Error("Sign in with Google.");
      let match = bcryptjs.compareSync(password, userExist.password);
      if (!match)
        throw new Error("The data entered is not valid. Please, try again.");
      let token = jwt.sign({ ...userExist }, process.env.SECRETOKEN);
      res.json({ success: true, res: {userExist, token } });
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
  changedReviewAndScore: async (req, res) => {
    switch (req.body.action) {
      case "addReview":
        try {
          let newReview = await Doctor.findOneAndUpdate(
            { _id: req.params.id },
            {
              $push: {
                review: { patientId: req.user._id, text: req.body.text },
              },
            },
            { new: true }
          ).populate("review.patientId", { name: 1, lastName: 1, src: 1 });
          res.json({ success: true, res: newReview.review });
        } catch (err) {
          res.json({ success: false, res: err.message });
        }
        break;
      case "editReview":
        try {
          let editReview = await Doctor.findOneAndUpdate(
            { "review._id": req.body.reviewId },
            { $set: { "review.$.text": req.body.text } },
            { new: true }
          ).populate("review.patientId", { name: 1, lastName: 1, src: 1 });
          res.json({ success: true, res: editReview.review });
        } catch (err) {
          res.json({ success: false, res: err.message });
        }
        break;
      case "deleteReview":
        try {
          let newReview = await Doctor.findOneAndUpdate(
            { _id: req.params.id },
            {
              $pull: {
                review: { _id: req.body.reviewId },
              },
            },
            { new: true }
          ).populate("review.patientId", { name: 1, lastName: 1, src: 1 });
          res.json({ success: true, res: newReview.review });
        } catch (err) {
          res.json({ success: false, res: err.message });
        }
        break;
        case 'editScore':
        try{
          let addScore = await Doctor.findOne({_id: req.params.id, 'score.patientId':req.user._id})
          if (!addScore){
            let newScore = await Doctor.findOneAndUpdate({_id: req.params.id},{$push:{score:{patientId:req.user._id, point:req.body.point}}},{new:true})
            res.json({success:true, res:newScore.score})
          }else{
            let editScore = await Doctor.findOneAndUpdate({'score.patientId': req.user._id},{$set:{'score.$.point': req.body.point}},{new:true})
            res.json({success:true, res:editScore.score})
          }
        }catch(err){
          res.json({success:false, res:err.message})
        }
    }
  },
  editProfile: async (req, res) => {
        try {
          let changedDoctor = await Doctor.findOneAndUpdate(
            { _id: req.user._id },
            { ...req.body },
            { new: true }
          ).populate("review.patientId", { name: 1, lastName: 1, src: 1 });
          if (changedDoctor) {
            res.json({ success: true, res: changedDoctor });
          } else {
            throw new Error();
          }
        } catch (err) {
          res.json({ success: false, res: err.message });
        }
  },
  getDoctorById: async (req, res) => {
    try {
      let doctor = await Doctor.findOne({ _id: req.params.id }).populate(
        "review.patientId",
        { name: 1, lastName: 1, src: 1 }
      );
      if (doctor) {
        res.json({ success: true, res: doctor });
      } else {
        throw new Error();
      }
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
  getDoctors: async (req, res) => {
    try {
      let doctors = await Doctor.find().populate("review.patientId", {
        name: 1,
        lastName: 1,
        src: 1,
      });
      if (doctors) {
        res.json({ success: true, res: doctors });
      } else {
        throw new Error();
      }
    } catch (err) {
      res.json({ success: false, res: err.message });
    }
  },
  deleteDoctor: async (req,res)=>{
    try{
      let docDelete = await Doctor.findOneAndDelete({_id : req.user._id})
            if(docDelete){
                res.json({success: true, res: docDelete})
            }else{
                throw new Error()
            }
    }catch(err){
      res.json({success:false})
    }
  }
};
module.exports = doctorControllers;
