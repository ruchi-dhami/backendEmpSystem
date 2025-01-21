const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema= new Schema({
className: {
    type: String,
    required: true,
    unique:true
  }, 
classCode:{
    type: String,
    required:true,
    unique:true
  }   
})

const Uniclass = mongoose.model('class', classSchema);

module.exports = Uniclass;