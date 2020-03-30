import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { E2JResponse } from "../models/E2JResponse";
const xlsxtojson = require("xlsx-to-json-lc");
const xlstojson = require("xls-to-json-lc");

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "excelneedstobeconvertedtojson." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).single("myfilenamefield");

/**
 * @path src/uploads
 *
 * @param field name is myfilenamefield
 *
 * @description this method handles Excel (.xls, .xlsx) file uploads from the client to the server side,
 * specifically into the src/uploads folder.
 */
export const convertExcel2JSON = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return await upload(req, res, err => {
      if (!req.file) {
        return res.json(
          new E2JResponse(new Error("No file passed!"), false, "code 1", null)
        );
      }

      if (err) {
        return res.json({ error_code: 1, err_desc: err });
      }

      let excel2json = null;
      if (
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ] === "xlsx"
      ) {
        excel2json = xlsxtojson;
      } else {
        excel2json = xlstojson;
      }

      try {
        excel2json(
          {
            input: req.file.path,
            output: null,
            lowerCaseHeaders: false
          },
          (err: Error, result: JSON) => {
            if (err) {
              return res.json(new E2JResponse(err, false, "code 1", null));
            }

            /**
             * this is where we do what needs to be done with the JSON file!!!
             */

            res.json(
              new E2JResponse(null, true, "converted successfully", result)
            );
            //////////////////////////////////////////////////////////////////
          }
        );
      } catch (err) {
        return res.json(
          new E2JResponse(err, false, "Corupted excel file", null)
        );
      }
    });
  };
};
