import * as bcryptjs from 'bcryptjs';

import { IUserDB, ILoginService } from '../interfaces_and_types/interfaces';
import { User } from '../interfaces_and_types/types';

export default class LoginService implements ILoginService {
  private _userModel: IUserDB;

  private _email: string;

  constructor(model: IUserDB) {
    this._userModel = model;
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

    const validPassword = LoginService.authenticateUserPassword(password, user.password as string);
    if (!validPassword) {
      return false;
    }

    return user;
  }
}
