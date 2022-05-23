import { ITeamDB } from '../../../interfaces_and_types/interfaces';
import { Team, TeamsAndCorrespondingMatches } from '../../../interfaces_and_types/types';
import Matches from '../Matches';
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

  // eslint-disable-next-line max-lines-per-function
  public async getTeamsAndCorrespondingMatches(): Promise<TeamsAndCorrespondingMatches[]> {
    const teamsAndCorrespondingMatches = await this._teamModel.findAll({
      include: [
        {
          model: Matches,
          as: 'home',
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
        {
          model: Matches,
          as: 'away',
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        }],
    });
    return teamsAndCorrespondingMatches as unknown as TeamsAndCorrespondingMatches[];
  }
}
