const User = require("../../models/User");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require("config");
const {Router} = require("express");

const  router = Router();

router.post('/register',async (req,res)=>{
    const {email,password} = req.body;
    
        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message:'user allready exist'})
        }else{
            const hashedPassword = await bcrypt.hash(password,2)
            
            const user = new User({email,id:req.headers.id,password: hashedPassword,projects:[],tasks:[],invites:[]})
            await user.save();
            const token = jwt.sign(
                
                    { userId: user._id },
                    config.get('jwtSecret'),
                    { expiresIn: "4h"}
            )
            return res.status(201).json({jwt:token,user: user});
        }
    
})
module.exports = router