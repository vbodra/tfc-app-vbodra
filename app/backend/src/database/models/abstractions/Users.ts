import { IUserDB } from '../../../interfaces_and_types/interfaces';
import { User } from '../../../interfaces_and_types/types';
import Users from '../Users';

export default class SequelizeUserModel implements IUserDB {
  private _userModel;

  constructor() {
    this._userModel = Users;
  }

  public async getByEmail(email: string): Promise< User | null > {
    const user = await this._userModel.findOne({ where: { email }, raw: true });
    return user;
  }
}
