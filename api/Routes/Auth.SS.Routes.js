const express = require("express");
const controller = require("../Controller/SS.Crt");
const Middleware = require("../MiddleWare/SS.MW");
const router = express.Router();

router.post("/adminlogin", controller.asynclogin);
router.post("/ClassCreation", controller.ClassCreation);

router.post("/StudentCreation", controller.StudentCreation);
router.get("/StudentGet", controller.Studentget);
router.get("/StudentbyClass", controller.StudentbyClass);
router.get("/findClass", controller.findclass);
router.get("/allClass", controller.allClass);


module.exports = router;
