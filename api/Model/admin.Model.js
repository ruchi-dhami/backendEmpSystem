const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema({

  email: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

adminSchema.pre('save',function(next){
  user=this;
  if(!user.password){
    return next();
  }
  try{
    hash=bcrypt.hash(user.password,10)
    user.password=hash;
    next();
  }
  catch{
console.log("message error")
  }
})


module.exports = Admin
