import { IMatchesDB } from '../../../interfaces_and_types/interfaces';
import { Matches } from '../../../interfaces_and_types/types';
import MatchesDB from '../Matches';
import Teams from '../Teams';

export default class SequelizeMatchesModel implements IMatchesDB {
  private _matchesModel;

  constructor() {
    this._matchesModel = MatchesDB;
  }

  public async getAll(): Promise<Matches[] | null> {
    const matches = await this._matchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  }

  public async create(match: Matches): Promise<Matches> {
    const [foundOrCreatedMatch] = await this._matchesModel.findOrCreate({
      defaults: match,
      where: { homeTeam: match.homeTeam, awayTeam: match.awayTeam },
    });

    return foundOrCreatedMatch;
  }
}
