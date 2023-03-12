const Calendar = require('../models/Calendar')

const calendarControllers = {
    addDay:async(req, res)=>{
        let day = new Calendar({...req.body})
        try{
            await day.save()
            res.json({success:true, res:day})
        }catch(err){
            res.json({success:true, res:err.message})
        }
    },
    getAllCalendar: async(req, res)=>{
        try{
            let calendar = await Calendar.find()
            res.json({success:true, res:calendar})
        }catch(err){
            res.json({success:false, res:err.message})
        }
    }
}
module.exports = calendarControllers