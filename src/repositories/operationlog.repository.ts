import { NextFunction, Response, Request } from "express";

const getAllOperationalLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send("theses are all the logs");
};

const addOneOperationalLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send(
    "adding new operational log to all the operational logs"
  );
};

const editOneOperationalLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send(
    `editting one operational log ${req.params.id} in all the operational logs`
  );
};

export const operationalLog = {
  getAllOperationalLogs,
  addOneOperationalLog,
  editOneOperationalLog
};
