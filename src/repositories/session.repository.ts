import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import {
  SESSION_NAME,
  COOKIE_PATH,
  COOKIE_DOMAIN,
  JWT_SECRET,
  TTL
} from "../utils/secret";
import { Roles } from "../models/enum/Roles";

/**
 *
 * @param req
 * @param res
 * @param next
 * @description login method to the application - creates a new session and cookie
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;

    req.session.user = {
      name,
      logintime: Date.now(),
      accessroles: ["Hotel"] // here need to write a method that handles the roles assignment
    };

    res.cookie(
      "jwt",
      jwt.sign({ name, password, today: Date.now() }, <string>JWT_SECRET, {
        expiresIn: TTL
      })
    );

    return await res
      .status(200)
      .send(`${req.session!.user.name} successfully logged in!`);
  } catch (error) {
    return await res.status(401).send(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @description logout method from the application - kills the current session and cookie
 */
const logout = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.session.user;

  // console.log(SESSION_NAME, req.session.name, req.session.user);
  try {
    if (user) {
      return await req.session.destroy(err => {
        if (err) throw err;

        res.clearCookie("jwt");

        res.clearCookie(<string>SESSION_NAME, {
          domain: COOKIE_DOMAIN,
          path: COOKIE_PATH
        });

        res.send(`${user.name} logged out`);
      });
    } else {
      //no user stored in the session
      res
        .status(500)
        .send(new Error("Something went wrong. Could not find user object..."));
    }
  } catch (error) {
    return await res.status(422).send(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @description isloggedIn middleware checks if the current user session is valid
 */
const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let sessionStatus =
      req.session.user && req.session.user !== null && req.session.user !== {};
    let token = req.cookies.jwt || "";
    let cookieTokenStatus = await jwt.verify(token, <string>JWT_SECRET);

    const loginstatus = cookieTokenStatus && sessionStatus;
    return loginstatus
      ? next()
      : res
          .status(401)
          .send(
            "You are unauthenticated! You must be logged in before you can try and access different routes!!!"
          );
  } catch (error) {
    res
      .status(500)
      .send("There was a problem trying unauthenticating You!\n" + error);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @description hasRole middleware checks if the current loggedin user has valid permissions to a specific route
 */
const hasRole = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return roles.some(r => {
      return req.session.user.accessroles.includes(r);
    })
      ? next()
      : res.status(403).send("You are unauthorized to access this route!");
  };
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @description verify logged in method to the application - a middleware to test current session in postman
 */
const verifiyLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let isLoggedin = null;
    if (
      req.session.user &&
      req.session.user !== null &&
      req.session.user !== {}
    ) {
      isLoggedin = true;
    } else {
      isLoggedin = false;
    }

    return await res.send(isLoggedin);
  } catch (error) {
    console.log("catch err");
    return await res.status(422).send(error);
  }
};

export const auth = {
  login,
  logout,
  verifiyLoggedIn,
  isLoggedIn,
  hasRole
};
