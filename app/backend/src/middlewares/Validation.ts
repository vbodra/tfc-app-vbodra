import { Request, Response, NextFunction } from 'express';

import { ILoginService, IValidation } from '../interfaces_and_types/interfaces';

import { invalidEmailOrPassword, emailAndPasswordRequired } from '../error_messages';

export default class Validation implements IValidation {
  private _loginService;

  private _email: string;

  private _password: string;

  constructor(loginService: ILoginService) {
    this._loginService = loginService;
  }

  public verifyEmailAndPassword(req: Request, _res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    this._email = email;
    this._password = password;

    if (!this._email || !this._password) return next(emailAndPasswordRequired);
    if (!this._loginService.validateEmail(this._email)) return next(invalidEmailOrPassword);
    if (this._password.length <= 6) return next(invalidEmailOrPassword);

    return next();
  }
}
