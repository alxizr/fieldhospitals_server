import { NextFunction, Request, Response } from "express";
import multer from "multer";

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
export const uploadExcelFile = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return upload(req, res, err => {
      if (err) {
        return res.json({ error_code: 1, err_desc: err });
      }

      return res.json({ error_code: 0, err_desc: null });
    });
  };
};
