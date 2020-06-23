const Counter = require('../models/counter');

module.exports = async (req,res,next) =>{
    try{
        let counter = await Counter.findOne({})
        counter.id++;
        await counter.save();
        req.headers["id"] = counter.id;
        next();
    }catch(e){
        console.log(e);
        return res.status(400).json({message:'fatal error'})
    }
}