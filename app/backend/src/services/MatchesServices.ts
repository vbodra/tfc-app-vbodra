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
}
