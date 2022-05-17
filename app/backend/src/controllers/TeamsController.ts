import { NextFunction, Response, Request } from 'express';
import { ITeamsService } from '../interfaces_and_types/interfaces';

export default class TeamsController {
  private _teamsServices: ITeamsService;

  constructor(teamServices: ITeamsService) {
    this._teamsServices = teamServices;
  }

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const teams = await this._teamsServices.getAll();

    res.status(200).json(teams);
  }

  public async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;

    const team = await this._teamsServices.getById(parseInt(id, 10));

    res.status(200).json(team);
  }
}
