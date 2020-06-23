
const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require("config");
const {Router} = require("express");

const  router = Router();

router.post('/login',
    [
        check('password','введите корректный пароль').exists(),
    ], async (req,res)=>{
        
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "некорректные данные"
        })
    }
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: 'пользователь не найден'})
    }   
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:'неверный пароль'})
    }
    const token = jwt.sign (
        {userId:user.id},
        config.get('jwtSecret'),
        {expiresIn:"1h"}
    )
    res.json({token,user})

})
 module.exports = router