const mongoose = require("mongoose")


const DB ='mongodb://localhost:27017/emp';

mongoose.set('strictQuery',true)

try {
    mongoose.connect(DB)
} catch (error) {
    console.log(error,'Error connecting in database!')
}


// mongoose.connect(DB).then(()=>{
//     console.log("Connection successfully establisted with school system DB")
// }).catch((err)=>console.log(err,"getting error while connecting with mongodb"))

