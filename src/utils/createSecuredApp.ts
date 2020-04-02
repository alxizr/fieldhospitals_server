import cluster from "cluster";
import express from "express";
import connectStore from "connect-mongo";
import { connection, connect } from "mongoose";
import session, { SessionOptions } from "express-session";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import sanitize from "express-mongo-sanitize";
import cors from "cors";
import errorHandler from "errorhandler";
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

import {
  ENV_APP_PORT_REST,
  APP_IDENTIFIER,
  ENV_ENVIRONMENT,
  ENVIRONMENT_PRODUCTION,
  CONNECTION_STRING,
  TTL,
  SESSION_NAME,
  SESSION_SECRET,
  COOKIE_PATH,
  COOKIE_DOMAIN
} from "./secret";

export const createSecuredApp = () => {
  const app = express();

  // setup Security
  app.use(helmet()); // Helmet - general
  app.use(xss()); // xss-clean
  app.use(sanitize()); // prevent Sql & NoSql injections
  app.use(hpp()); // header parameters pollution
  app.set("trust proxy", 1);
  app.use(
    rateLimit({
      max: 100,
      windowMs: 10 * 60 * 1000
    })
  ); // rate limit for all routes

  // enable cookie-parser
  app.use(cookieParser());

  // setup express session - since v1.15.0 no need for cookie-parser package to write
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
      domain: COOKIE_DOMAIN,
      path: COOKIE_PATH /* <--------- MUST BE SET TO THE INITIAL ROUTE PATH OF THE SERVER API JUST AS THE apiRoute is configured */,
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

  // enable cors between client and server -- this must be here!!! do not move!!!
  app.use(cors({ credentials: true }));
  app.options("*", cors({ credentials: true }));

  // enable compression on all requests
  app.use(compression());

  // setup error handle print stack trace for development
  if (ENV_ENVIRONMENT !== ENVIRONMENT_PRODUCTION) {
    app.use(errorHandler());
  }

  return app;
};

export const startMyApp = async () => {
  console.log(
    `Run util method 'startMyApp'`,
    `worker id: ${cluster.worker.id}`,
    `App ${APP_IDENTIFIER} server is live on port: ${ENV_APP_PORT_REST}`
  );

  // set up mongoose connection to Database
  // we can use either async/await or promises
  try {
    await connect(<string>CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: false,
      useFindAndModify: false
    });
    console.log(
      `Run util method 'startMyApp'`,
      "Database is connected on MongoDB Atlas"
    );
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
