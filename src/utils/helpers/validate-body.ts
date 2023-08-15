import { type NextFunction, type Request, type Response } from "express";
import { type AnyZodObject, type ZodError } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const obj = {} as any;
      if (Object.keys(req.body).length) obj.body = req.body;
      if (Object.keys(req.query).length) obj.query = req.query;
      if (Object.keys(req.params).length) obj.params = req.params;

      const result = await schema.strict().parseAsync(obj);
      req.body = result.body;
      req.query = result.query;
      req.params = result.params;
      next();
    } catch (error: any) {
      const e = error as ZodError;
      return res.status(400).json({
        err: e,
        code: "00087",
        fields: e.issues,
      });
    }
  };

export default validate;
