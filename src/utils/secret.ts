import dotenv from "dotenv";

const FILEPATH_ENV = ".env"; // <----- must be in root folder
dotenv.config({ path: FILEPATH_ENV });

export const ENVIRONMENT_PRODUCTION = "production";

export const ENV_ENVIRONMENT = process.env.NODE_ENV;

export const APP_IDENTIFIER = process.env.APP_IDENTIFIER;

export const ENV_APP_PORT_REST = +(process.env.APP_PORT_REST || 3001);

export const CONNECTION_STRING = process.env.APP_MONGODB_CONNECTION_STRING;

export const TTL = +(process.env.TTL || 60);

export const SESSION_NAME = process.env.SESSION_NAME;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const COOKIE_PATH = process.env.COOKIE_PATH;

export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

export const JWT_SECRET = process.env.JWT_SECRET;
