import { Router } from "express";
import { hotels as hotelsRepo } from "../repositories/hotel.repository";
import { auth as authRepo } from "../repositories/session.repository";
import { Roles } from "../models/enum/Roles";

/**
 * @description Hotels route with the appropriate HTTP verbs
 * @methods GET|POST|PUT|PATCH
 * @roles all actions are bound to different access control permissions. nothing is public
 */
export const hotels = Router();

hotels
  .route("/excelfile")

  .get(hotelsRepo.uploadExcelFileFromHotel())
  .post(hotelsRepo.uploadExcelFileFromHotel());

hotels
  .route("/:id")

  .get(
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Hotel, Roles.HotelCanRead, Roles.HotelCanWrite]),
    hotelsRepo.getOneHotelGuest
  )

  .put(
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Hotel, Roles.HotelCanEdit]),
    hotelsRepo.editHotelGuest
  )

  .patch(
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Hotel, Roles.HotelCanEdit]),
    hotelsRepo.editHotelGuest
  );

hotels
  .route("")

  .get(
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Hotel, Roles.HotelCanRead]),
    hotelsRepo.getAllHotelGuests
  )

  .post(
    authRepo.isLoggedIn,
    authRepo.hasRole([Roles.Hotel, Roles.HotelCanWrite]),
    hotelsRepo.addHotelGuest
  );
