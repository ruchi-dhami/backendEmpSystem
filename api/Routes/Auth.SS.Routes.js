const express = require("express");
const controller = require("../Controller/SS.Crt");
const Middleware = require("../MiddleWare/SS.MW");
const router = express.Router();

router.post("/login", controller.asynclogin);

router.post("/class", controller.ClassCreation);
router.get("/class", controller.findclass);
router.get("/allClass", controller.allClass);

router.post("/students", controller.StudentCreation);
router.get("/students", controller.Studentget);
router.get("/student/class", controller.StudentbyClass);



module.exports = router;
