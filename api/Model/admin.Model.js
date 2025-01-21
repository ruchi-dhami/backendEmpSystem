const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
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

adminSchema.pre("save", function (next) {
  const email = this.email;
  const re = /\S+@\S+\.\S+/;
  
  if (re.test(email)) {
    next();
  } else {
    const error = new Error("Invalid email address");
    next(error);
  }
});

adminSchema.pre("save", function (next) {
  const password = this.password;
 
  if (password > 3) {
    next();
  } else {
    const error = new Error("Password must be more than 3 characters");
    next(error);
  }
});

adminSchema.post("save", function (next) {
  user = this;
  if (!user.password) {
    return next();
  }
  try {
    hash = bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch {
    console.log("message error");
  }
});


module.exports = Admin
