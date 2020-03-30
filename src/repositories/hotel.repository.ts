import { NextFunction, Response, Request } from "express";
import { uploadExcelFile } from "../utils/excel2jsonconvertor.utils";
/**
 *
 * @param req
 * @param res
 * @param next
 * @description method to get all guests registered in a specific hotel.
 * only authenticated hotel with the appropriate permisions can access this middleware
 */
const getAllHotelGuests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send("these are all the guests in the hotels");
};

/**
 *
 * @param id - coming from req.params.id is a mandatory argument
 * @param res
 * @param next
 * @description Get one specific registered hotel guest in a specific hotel by id.
 * only authenticated hotel with the appropriate permisions can access this middleware
 */
const getOneHotelGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send(
    `this is the one specific ${req.params.id} hotel guest  you wanted`
  );
};

const addHotelGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send("add one guest to the hotel");
};

const editHotelGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await res.send(`edit one guest ${req.params.id} in the hotel`);
};

// setup additional middleware or packages here

export const hotels = {
  getAllHotelGuests,
  getOneHotelGuest,
  addHotelGuest,
  editHotelGuest,
  uploadExcelFile
};
