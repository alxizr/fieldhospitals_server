import { Router } from "express";
import { auth as authRepo } from "../repositories/session.repository";

export const auth = Router();

auth
  .route("")

  .post(authRepo.login)

  .delete(authRepo.logout)

  .get(authRepo.verifiyLoggedIn);
