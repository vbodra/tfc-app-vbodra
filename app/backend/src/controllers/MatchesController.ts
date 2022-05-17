import { NextFunction, Response, Request } from 'express';
import { IMatches } from '../interfaces_and_types/types';
import { IMatchesService } from '../interfaces_and_types/interfaces';

export default class MatchesController {
  private _matchesServices: IMatchesService;

  private _inProgress: boolean;

  constructor(matchesServices: IMatchesService) {
    this._matchesServices = matchesServices;
  }

  public async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const { inProgress } = req.query;

    const matches = await this._matchesServices.getAll() as IMatches[];
    if (!inProgress) {
      return res.status(200).json(matches);
    }
    this._inProgress = await JSON.parse(inProgress as string);

    const filteredMatches = matches?.filter((match) => match.inProgress === this._inProgress);

    return res.status(200).json(filteredMatches);
  }
}
