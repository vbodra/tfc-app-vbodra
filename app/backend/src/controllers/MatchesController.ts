import { NextFunction, Response, Request } from 'express';
import { Matches } from '../interfaces_and_types/types';
import { IMatchesService, ITeamsService } from '../interfaces_and_types/interfaces';
import { inProgressMustBeTrue, teamInMatchesMustBeDifferent,
  atLeastOneInvalidTeam } from '../error_messages';

export default class MatchesController {
  private _matchesServices: IMatchesService;

  private _inProgress: boolean;

  private _teamsServices: ITeamsService;

  constructor(matchesServices: IMatchesService, teamsServices: ITeamsService) {
    this._matchesServices = matchesServices;
    this._teamsServices = teamsServices;
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
    const { inProgress, awayTeam, homeTeam } = req.body;

    if (homeTeam === awayTeam) return next(teamInMatchesMustBeDifferent);
    if (inProgress !== true) return next(inProgressMustBeTrue);

    const homeTeamExist = await this._teamsServices.getById(homeTeam);
    const awayTeamExist = await this._teamsServices.getById(awayTeam);
    if (homeTeamExist && awayTeamExist) {
      const postedMatch = await this._matchesServices.create(req.body);

      return res.status(201).json(postedMatch);
    }

    next(atLeastOneInvalidTeam);
  }

  public async update(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;

    this._matchesServices.update(JSON.parse(id));

    res.status(200).json({ message: 'Finished' });
  }

  public async updateGoals(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const a = await this
      ._matchesServices.updateGoals(JSON.parse(id), homeTeamGoals, awayTeamGoals);

    if (a === 0) return next({ status: 400, message: 'match not found or already finished' });

    res.status(204).end();
  }
}
