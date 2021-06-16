const express = require('express')
const app=express()
const mongoose = require('mongoose')
const PORT=500
const {MONGOURI} = require('./key');
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo great success")
})
mongoose.connection.on('error',()=>{
    console.log("error connecting");
})
///////////////////////

app.use(express.json());
app.use(require('./routes/auth'))







///////////////////////
app.listen(PORT,()=>{
    console.log("server is running on ",PORT);
})
