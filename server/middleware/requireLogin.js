const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../key')
const mongoose = require('mongoose')
const User = mongoose.model('Users')
module.exports = (req,res,next)=>{
    // console.log(req.headers);
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err, payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"});
        }
        // console.log(payload)
        const{_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
        })
        console.log("sab tanch hai");
        next()
    })

}