import { readFileSync } from 'fs';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default class AuthenticationService {
  private _email: string;

  private _jwt;

  private _jwtSecret;

  private _jwtOptions;

  constructor() {
    this._jwt = jwt;
    this._jwtSecret = readFileSync('./jwt.evaluation.key');
    this._jwtOptions = {
      expiresIn: '2d',
    };
  }

  static authenticateUserPassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }

  public generateToken(email: string, role: string): string {
    const token = this._jwt.sign({ email, role }, this._jwtSecret, this._jwtOptions);

    return token;
  }

  public verifyToken(token: string) {
    const verifiedToken = this._jwt.verify(token, this._jwtSecret) as {
      email: string,
      role: string
    };

    return verifiedToken;
  }
}
