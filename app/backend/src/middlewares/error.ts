import { Request, Response, NextFunction } from 'express';

export interface IError {
  status: number,
  message: string,
}

const error = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  try {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
  } catch (_) {
    return res.status(500).end();
  }
};

export default error;
