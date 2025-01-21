const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  class:{  
    type: Schema.ObjectId,
    ref: 'class'
  },
  rollNo: {
    type: Number,
    required: true,
    unique:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student
