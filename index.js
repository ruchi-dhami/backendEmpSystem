require("dotenv").config();
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");

const routeModule = require('./api/Routes/Auth.SS.Routes');

// const mongodb = require('./api/Helper/ConnectDb')

const app = express();

app.use(cors());


const PORT = process.env.PORT || 8080;

const logger = require("./api/MiddleWare/winston");

const uri = "mongodb+srv://ruchidhami:PCw6fEjQPhCdu7Uz@cluster0.4xhih.mongodb.net/employee_db?retryWrites=true&w=majority&appName=Cluster0";
//const uri = "mongodb://localhost:27017/emp";


// mongoDB connection
try {
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  logger.info("Connected to MongoDB");
} catch (error) {
  logger.error("Error connecting to MongoDB", error);
}

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.use(express.json()); 

const registerCoreMiddleware = () => {
  try {
    app.use(
      session({
        secret: "1234",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      })
    );

    app.use(morgan("combined", { stream: logger.stream }));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use('/', routeModule);


  } catch (error) {
    logger.error(
      "Error thrown while executing registerCoreMiddleware" +
        JSON.stringify(error, undefined, 2)
    );
  }
};


// handling uncaught exceptions
const handleError = () => {
  // 'process' is a built in object in NodeJS
  // if uncaught exception, then execute this
  // note that we can catch uncaught exceptions from the process object
  process.on("uncaughtException", (err) => {
    logger.error(`UNCAUGHT_EXCEPTION OCCURED : ${JSON.stringify(err.stack)}`);
  });
};


(() => {
  try {
      // register core application level middlewared
      registerCoreMiddleware();
  
      app.listen(PORT, () => {
        logger.info(`Server running on PORT: ${PORT}`);
      });
  
      handleError();
    } catch (error) {
      logger.error(
        `startup :: Error while booting the application ${JSON.stringify(
          error,
          undefined,
          2
        )}`
      );
      throw error;
    }
})();
