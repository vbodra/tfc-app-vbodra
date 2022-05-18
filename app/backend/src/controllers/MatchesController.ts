import { NextFunction, Response, Request } from 'express';
import { Matches } from '../interfaces_and_types/types';
import { IMatchesService } from '../interfaces_and_types/interfaces';
import { inProgressMustBeTrue } from '../error_messages';

export default class MatchesController {
  private _matchesServices: IMatchesService;

  private _inProgress: boolean;

  constructor(matchesServices: IMatchesService) {
    this._matchesServices = matchesServices;
  }

  public async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const { inProgress } = req.query;

    const matches = await this._matchesServices.getAll() as Matches[];
    if (!inProgress) {
      return res.status(200).json(matches);
    }
    this._inProgress = await JSON.parse(inProgress as string);

    const filteredMatches = matches?.filter((match) => match.inProgress === this._inProgress);

    return res.status(200).json(filteredMatches);
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { inProgress } = req.body;

    if (inProgress !== true) return next(inProgressMustBeTrue);

    const postedMatch = await this._matchesServices.create(req.body);

    return res.status(201).json(postedMatch);
  }
}
