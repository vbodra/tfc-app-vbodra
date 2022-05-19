import { Matches } from '../interfaces_and_types/types';
import { IMatchesService, IMatchesDB } from '../interfaces_and_types/interfaces';

export default class MatchesServices implements IMatchesService {
  private _matchesModel: IMatchesDB;

  constructor(model: IMatchesDB) {
    this._matchesModel = model;
  }

  public async getAll(): Promise<Matches[] | null> {
    const matches = await this._matchesModel.getAll();

    return matches;
  }

  public async create(match: Matches) {
    const createdMatch = await this._matchesModel.create(match);

    return createdMatch;
  }

  public async update(id: number) {
    this._matchesModel.update(id);
  }

  public async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> {
    return this._matchesModel.updateGoals(id, homeTeamGoals, awayTeamGoals);
  }
}
