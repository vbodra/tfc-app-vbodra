import { IMatchesDB } from '../../../interfaces_and_types/interfaces';
import { IMatches } from '../../../interfaces_and_types/types';
import Matches from '../Matches';
import Teams from '../Teams';

export default class SequelizeMatchesModel implements IMatchesDB {
  private _matchesModel;

  constructor() {
    this._matchesModel = Matches;
  }

  public async getAll(): Promise<IMatches[] | null> {
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

  public async create(match: IMatches): Promise<IMatches> {
    const createdMatch = await this._matchesModel.create(match);

    return createdMatch;
  }
}
