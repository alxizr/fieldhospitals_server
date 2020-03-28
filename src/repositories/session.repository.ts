import { NextFunction, Response, Request } from "express";
import { SESSION_NAME } from "../utils/secret";
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
      accessroles: [] // here need to write a method that handles the roles assignment
    };

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

        res.clearCookie(<string>SESSION_NAME);
        res.send(`${user.name} logged out`);
      });
    } else {
      //no user stored in the session
      throw new Error("Something went wrong. Could not find user object...");
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
  const loginstatus =
    req.session.user && req.session.user !== null && req.session.user !== {};

  return loginstatus
    ? next()
    : res
        .status(401)
        .send(
          "You are unauthenticated! You must be logged in before you can try and access different routes!!!"
        );
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
