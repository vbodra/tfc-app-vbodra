import { Team } from '../interfaces_and_types/types';
import { ITeamsService, ITeamDB } from '../interfaces_and_types/interfaces';

export default class TeamsServices implements ITeamsService {
  private _teamModel: ITeamDB;

  constructor(model: ITeamDB) {
    this._teamModel = model;
  }

  public async getAll(): Promise<Team[] | null> {
    const teams = await this._teamModel.getAll();

    return teams;
  }

  public async getById(id: number): Promise<Team | null> {
    const team = await this._teamModel.getById(id);

    return team;
  }
}
