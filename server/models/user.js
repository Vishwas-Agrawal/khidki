const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
         type: String,
         required: true
    },
    password:{
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: false
    },
    favoriteMovies:{
        type: [{_id:false,movieid: String,moviephoto: String}],
        required:false
    },
   country:{
       type:String,
       required: false
   },
   gender:{
       type: String,
       required: false
   },
   birthday:{
       type: String,
       required: false
   },
   about:{
       type: String,
       required: false
   }
    ,
    isVerified:{
        type:Boolean,
        default: false,        
    }
})
module.exports = mongoose.model("Users",userSchema);