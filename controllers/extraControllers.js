const Avatar = require("../models/Avatar");
const Socialwork = require("../models/SocialWork");

const extraControllers ={
    addAvatar:async(req, res)=>{
        let newavatar = new Avatar({...req.body})
        try{
            await newavatar.save()
            res.json({success:true, res:newavatar})
        }catch(err){
            res.json({success:true, res:err.message})
        }
    },
    getAvatar: async(req, res)=>{
        try{
            let avatars = await Avatar.find()
            res.json({success:true, res:avatars})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    },
    addSocialwork:async(req, res)=>{
        let newsocialwork = new Socialwork({...req.body})
        try{
            await newsocialwork.save()
            res.json({success:true, res:newsocialwork})
        }catch(err){
            res.json({success:true, res:err.message})
        }
    },
    getSocialwork: async(req, res)=>{
        try{
            let allSocialwork = await Socialwork.find()
            res.json({success:true, res:allSocialwork})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    }
}
module.exports = extraControllers
