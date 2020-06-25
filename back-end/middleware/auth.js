const config = require('config');

const jwt = require("jsonwebtoken");
module.exports = (req,res,next) => {
    
    if(req.method ==="OPTIONS"){
        return next();
    }
    try{
        const token = req.headers.jwt.split(" ")[0];
        if(!token) {
            return res.status(401).json({message: 'no authorizatin'});
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        if(decoded){
            req.headers["personId"] = decoded.userId;
            next();
        }
    } catch(e){ 
        console.log(e)
        return res.status(401).json({message: 'no authorizatin'});
    }
}