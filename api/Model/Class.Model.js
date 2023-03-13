const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema= new Schema({
ClassName: {
    type: String,
    required: true,
    unique:true
  }, 
  ClassCode:{
    type: String,
    required:true,
    unique:true
  }   
})
const Uniclass = mongoose.model('class', classSchema);
module.exports = Uniclass