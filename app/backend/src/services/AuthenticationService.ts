import { readFileSync } from 'fs';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { IUserDB } from '../interfaces_and_types/interfaces';
import { User } from '../interfaces_and_types/types';

export default class AuthenticationService {
  private _userModel: IUserDB;

  private _email: string;

  private _jwt;

  private _jwtSecret;

  private _jwtOptions;

  constructor(model: IUserDB) {
    this._userModel = model;
    this._jwt = jwt;
    this._jwtSecret = readFileSync('./jwt.evaluation.key');
    this._jwtOptions = {
      expiresIn: '2d',
    };
  }

  static authenticateUserPassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }

  public async authenticateUser(
    email: string,
    password: string,
  ): Promise<boolean | User> {
    const user = await this._userModel.getByEmail(email);

    if (!user) return false;

    const validPassword = AuthenticationService
      .authenticateUserPassword(password, user.password as string);

    if (!validPassword) {
      return false;
    }

    return user;
  }

  public generateToken(email: string, role: string): string {
    const token = this._jwt.sign({ email, role }, this._jwtSecret, this._jwtOptions);

    return token;
  }

  public getRoleFromVerifiedToken(token: string): string {
    const verifiedToken = this._jwt.verify(token, this._jwtSecret) as {
      email: string,
      role: string
    };

    return verifiedToken.role;
  }

  public validateEmail(email: string): boolean {
    this._email = email;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this._email.match(emailRegex)) return true;

    return false;
  }
}
