import { Router } from "express";
import { tasks } from "./task.controller";
import { logs } from "./operationlog.controller";
import { Roles } from "../models/enum/Roles";
import { auth as authRepo } from "../repositories/session.repository";

export const admin = Router();

admin
  .use(
    "/tasks",
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Admin, Roles.AdminCanRead]),
    tasks
  )

  .use(
    "/logs",
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Admin, Roles.AdminCanRead]),
    logs
  );
