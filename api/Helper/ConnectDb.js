const mongoose = require("mongoose")


const DB ='mongodb+srv://Zain:8MKksNz2CGjMLMwv@cluster0.loxrinm.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery',true)
mongoose.connect(DB).then(()=>{
    console.log("Connection successfully establisted with school system DB")
}).catch((err)=>console.log(err,"getting error while connecting with mongodb"))

