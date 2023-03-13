const express = require('express');
const mongodb=require('./api/Helper/ConnectDb')
const app = express();
var cors = require("cors");
app.use(cors());
const port = 4000;
app.use(express.json()); 
const path=require('path')

const HelloRoutes=require('./api/Routes/Auth.SS.Routes')
app.use('/',HelloRoutes)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
