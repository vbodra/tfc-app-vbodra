import { NextFunction, Response, Request } from 'express';
import { LeaderBoard } from '../interfaces_and_types/types';
import { ILeaderBoardService } from '../interfaces_and_types/interfaces';

export default class TeamsController {
  private _leaderBoardServices: ILeaderBoardService;

  constructor(leaderBoardServices: ILeaderBoardService) {
    this._leaderBoardServices = leaderBoardServices;
  }

  public async findAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    let leaderboard: LeaderBoard[] | null;
    if (req.path) {
      leaderboard = await this._leaderBoardServices.getLeaderboard(req.path);
    } else {
      leaderboard = await this._leaderBoardServices.getLeaderboard();
    }

    res.status(200).json(leaderboard);
  }
}
