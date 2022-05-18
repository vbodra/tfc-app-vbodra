import { Request, Response, NextFunction } from 'express';

import { IAuthService, IValidation } from '../interfaces_and_types/interfaces';

import { tokenNotFound } from '../error_messages';

export default class Validation implements IValidation {
  private _service;

  private _email: string;

  private _password: string;

  constructor(service: IAuthService) {
    this._service = service;
  }

  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;

    const verifiedToken = this._service.verifyToken(authorization as string);

    if (verifiedToken !== null) return next();

    next(tokenNotFound);
  }
}
