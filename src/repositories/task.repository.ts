import { NextFunction, Response, Request } from "express";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  return await res.send("theses are all the tasks");
};

const addOneTask = async (req: Request, res: Response, next: NextFunction) => {
  return await res.send("adding new task to all the tasks");
};

const editOneTask = async (req: Request, res: Response, next: NextFunction) => {
  return await res.send(`editting one task ${req.params.id} in all the tasks`);
};

export const task = {
  getAllTasks,
  addOneTask,
  editOneTask
};
