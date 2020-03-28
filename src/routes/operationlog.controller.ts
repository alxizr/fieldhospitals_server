import { Router } from "express";
import { operationalLog as logsRepo } from "../repositories/operationlog.repository";

/**
 * @description Hotels route with the appropriate HTTP verbs
 * @methods GET|POST|PUT|PATCH
 * @roles all actions are bound to different access control permissions. nothing is public
 */
export const logs = Router();

logs
  .route("")

  .get(logsRepo.getAllOperationalLogs)

  .post(logsRepo.addOneOperationalLog);

logs
  .route("/:id")

  .patch(logsRepo.editOneOperationalLog)

  .put(logsRepo.editOneOperationalLog);
