import { Request, Response, NextFunction } from 'express';

import { IAuthService, IValidation } from '../interfaces_and_types/interfaces';

import { tokenNotFound } from '../error_messages';

export default class Validation implements IValidation {
  private _service;

  constructor(service: IAuthService) {
    this._service = service;
  }

  public async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;

    const verifiedToken = await this._service.verifyToken(authorization as string);

    if (verifiedToken !== null) return next();

    next(tokenNotFound);
  }
}
