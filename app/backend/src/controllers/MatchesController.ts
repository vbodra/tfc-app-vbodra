import { NextFunction, Response, Request } from 'express';
import { IMatchesService } from '../interfaces_and_types/interfaces';

export default class MatchesController {
  private _matchesServices: IMatchesService;

  constructor(matchesServices: IMatchesService) {
    this._matchesServices = matchesServices;
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const matches = await this._matchesServices.getAll();

    res.status(200).json(matches);
  }
}
