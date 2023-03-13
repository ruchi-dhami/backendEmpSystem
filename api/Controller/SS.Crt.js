var jwt = require("jsonwebtoken");
const secretkey = "seebiz";
const Admin = require("../Model/admin.Model");
const ClassName = require("../Model/Class.Model");
const StudentModel = require("../Model/student.Model");

const asynclogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find a user with matching email and password
    const user = await Admin.findOne({ email, password });

    if (!user) {
      // Return an error response if no user is found
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      // Return a success response with the user's data if found
      var token = jwt.sign({ email: email }, secretkey);
      console.log(token);
      res.status(200).json({
        message: "Successfully login",
        token: token,
      });
    }
  } catch (error) {
    // Return an error response if an error occurs
    res.status(500).json({ error: error.message });
  }
};
const ClassCreation = async (req, res) => {
  const { className, classCode } = req.body;
  console.log(req.body, "herrr");
  try {
    const cName = new ClassName({ ClassName: className, ClassCode: classCode });
    const savedcName = await cName.save();

    // Return a success response with the saved user data
    res.status(201).json(savedcName);
  } catch (error) {
    // Return an error response if an error occurs
    res.status(500).json({ error: error.message });
  }
};
const StudentCreation = async (req, res) => {
  const { name, className, rollNo } = req.body;

  try {
    const finclass = await ClassName.findOne({
      _id: className,
    });
    if (finclass) {
      const sName = new StudentModel({
        Name: name,
        class: className,
        RollNo: rollNo,
      });
      const savedsName = await sName.save();
      res.status(201).json(savedsName);
    } else {
      res.status(400).json({ error: "class not found" });
    }
  } catch (error) {
    // Return an error response if an error occurs
    res.status(500).json({ error: error.message });
  }
};
const Studentget = async (req, res) => {

  const { name, classId } = req.query;
  const filter = {};
  if (name) {
    filter.Name = new RegExp(name, "i");
  }

  if (classId) {
    filter.class = classId;
  }
  const allStudent = await StudentModel.find(filter).populate("class");
  //db.StudentModel.aggregate({ $filter: { Name: { $eq: filters } } });
  res.json({
    data: allStudent,
  });
};
const StudentbyClass = async (req, res) => {
  const { classbyid } = req.body;
  try {
    const studentGetbyId = await StudentModel.find({ class: classbyid });
    res.status(200).json({ data: studentGetbyId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const findclass = async (req, res) => {
  const classcount = await ClassName.count();
  res.status(200).json({ classcount });
};
const allClass = async (req, res) => {
  const allStudent = await ClassName.find({});
  res.json({
    data: allStudent,
  });
};

module.exports = {
  asynclogin,
  ClassCreation,
  StudentCreation,
  Studentget,
  StudentbyClass,
  findclass,
  allClass,
};
