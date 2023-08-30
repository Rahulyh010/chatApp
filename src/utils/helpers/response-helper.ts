import { type Request } from "express";

import { logger } from "@/utils/loggers";

import errorCodes from "../constants/errorCodes";
import ipHelper from "./ip-helper";

interface ResponseHelper {
  req: Request;
  data?: any;
  err?: any;
  code?: keyof typeof errorCodes;
  fields?: any;
}

export default ({ req, data, err, code, fields }: ResponseHelper) => {
  let resMessage = "OK";
  if (code) {
    let key = code;
    if (!errorCodes[code]) key = "00008";

    const enMessage = errorCodes[key];
    resMessage = enMessage;

    if (code === "00008") {
      logger.info(err);
      logger.alert(resMessage, {
        userId: req.user?._id ?? undefined,
        code,
        ipAddress: ipHelper(req),
        route: req.originalUrl,
        error: err,
      });
    }
  }

  return {
    data,
    error: {
      code,
      message: resMessage,
      fields,
    },
  };
};
