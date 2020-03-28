import express from "express";
import connectStore from "connect-mongo";
import { connection, connect } from "mongoose";
import session, { SessionOptions } from "express-session";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "errorhandler";

import {
  ENV_APP_PORT_REST,
  APP_IDENTIFIER,
  ENV_ENVIRONMENT,
  ENVIRONMENT_PRODUCTION,
  CONNECTION_STRING,
  TTL,
  SESSION_NAME,
  SESSION_SECRET
} from "./utils/secret";

import { auth } from "./routes/session.controller";
import { hotels } from "./routes/hotel.controller";
import { tasks } from "./routes/task.controller";
import { logs } from "./routes/operationlog.controller";
import { admin } from "./routes/admin.controller";

const PORT = ENV_APP_PORT_REST;
const app = express();

// setup express app to use Helmet for security
app.use(helmet());

// setup express session - since v1.15.0 no need for cookie-parser package
const MongoStore = connectStore(session);
const opts: SessionOptions = {
  name: <string>SESSION_NAME,
  secret: <string>SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: connection,
    collection: "sessions",
    ttl: TTL
  }),
  cookie: {
    path:
      "/api" /* <--------- MUST BE SET TO THE INITIAL ROUTE PATH OF THE SERVER API JUST AS THE apiRoute is configured */,
    secure: process.env.NODE_ENV === ENVIRONMENT_PRODUCTION,
    maxAge: TTL * 1000,
    sameSite: true,
    httpOnly: true,
    signed: true
  }
};
app.use(session(opts));

// parse request to json -- this must be here!!! do not move!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable compression on all requests
app.use(compression());

// enable cors between client and server -- this must be here!!! do not move!!!
app.use(cors());
app.options("*", cors());

// setup error handle print stack trace for development
if (ENV_ENVIRONMENT !== ENVIRONMENT_PRODUCTION) {
  app.use(errorHandler());
}

// setup application to use controller
const apiRouter = express.Router();
apiRouter.use("/auth", auth); //      authentication with sessions & cookies
apiRouter.use("/hotels", hotels); //  hotels route
apiRouter.use("/admin", admin); //    admin multiple routes
app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log(`App ${APP_IDENTIFIER} server is live on port: ${PORT}`);

  // set up mongoose connection to Database
  // we can use either async/await or promises
  try {
    await connect(<string>CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Database is connected on MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
});