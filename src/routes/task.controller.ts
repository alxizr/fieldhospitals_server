import { Router } from "express";
import { Roles } from "../models/enum/Roles";
import { task as taskRepo } from "../repositories/task.repository";

/**
 * @description Hotels route with the appropriate HTTP verbs
 * @methods GET|POST|PUT|PATCH
 * @roles all actions are bound to different access control permissions. nothing is public
 */
export const tasks = Router();

tasks
  .route("")

  .get(taskRepo.getAllTasks)

  .post(taskRepo.addOneTask);

tasks
  .route("/:id")

  .patch(taskRepo.editOneTask)

  .put(taskRepo.editOneTask);
