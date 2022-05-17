import { Request, Response, NextFunction } from 'express';

import { User } from '../interfaces_and_types/types';
import { ILoginService } from '../interfaces_and_types/interfaces';

import { invalidEmailOrPassword } from '../error_messages';

export default class LoginController {
  private _loginService;

  private _authService;

  constructor(loginService: ILoginService, auth: any) {
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

    const validatedUser = await this._authService.getRoleFromVerifiedToken(authorization as string);

    return res.status(200).json(validatedUser);
  }
}
