import { ITeamDB } from '../../../interfaces_and_types/interfaces';
import { Team } from '../../../interfaces_and_types/types';
import Teams from '../Teams';

export default class SequelizeTeamModel implements ITeamDB {
  private _teamModel;

  constructor() {
    this._teamModel = Teams;
  }

  public async getAll(): Promise<Team[] | null> {
    const teams = await this._teamModel.findAll({ raw: true });
    return teams;
  }

  public async getById(id: number): Promise<Team | null> {
    const team = await this._teamModel.findByPk(id);

    return team;
  }
}
