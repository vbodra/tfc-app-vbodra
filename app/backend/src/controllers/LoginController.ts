import { Request, Response, NextFunction } from 'express';

import { User } from '../interfaces_and_types/types';
import { IAuthService, ILoginService } from '../interfaces_and_types/interfaces';

import { invalidEmailOrPassword, emailAndPasswordRequired } from '../error_messages';

export default class LoginController {
  private _loginService;

  private _authService;

  private _email: string;

  private _password: string;

  constructor(loginService: ILoginService, auth: IAuthService) {
    this._loginService = loginService;
    this._authService = auth;
  }

  public async verifyCredentials(
    req: Request,
    _res: Response,
    next: NextFunction,
  ):Promise<void> {
    const { email, password } = req.body;

    const verifiedUser = await this._loginService.authenticateUser(email, password);

    const { password: userPass, ...user } = verifiedUser as User;

    if (!verifiedUser) return next(invalidEmailOrPassword);

    req.body.user = user;

    return next();
  }

  public async login(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const { email, user } = req.body;

    const token = this._authService.generateToken(email, user.role);

    return res.status(200).json({ user, token });
  }

  public async getRoleFromValidatedUser(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response> {
    const { authorization } = req.headers;

    const { role } = await this
      ._authService.verifyToken(authorization as string);

    return res.status(200).json(role);
  }

  public verifyEmailAndPassword(req: Request, _res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    this._email = email;
    this._password = password;

    if (!this._email || !this._password) return next(emailAndPasswordRequired);
    if (LoginController.validateEmail(this._email)) return next(invalidEmailOrPassword);
    if (this._password.length <= 6) return next(invalidEmailOrPassword);

    return next();
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailRegex)) return true;

    return false;
  }
}
