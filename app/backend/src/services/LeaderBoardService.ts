import { LeaderBoard, GoalsCounter } from '../interfaces_and_types/types';
import { ILeaderBoardService, ITeamDB } from '../interfaces_and_types/interfaces';

export default class LeaderBoardServices implements ILeaderBoardService {
  private _teamsModel: ITeamDB;

  private _leaderboard: LeaderBoard[] = [];

  rank?: number;

  name: string;

  totalPoints = 0;

  totalGames = 0;

  totalVictories = 0;

  totalDraws = 0;

  totalLosses = 0;

  goalsFavor = 0;

  goalsOwn = 0;

  goalsBalance = 0;

  efficiency = 0;

  constructor(model: ITeamDB) {
    this._teamsModel = model;
  }

  // eslint-disable-next-line max-lines-per-function
  public async getLeaderboard(awayOrHome?: string): Promise<LeaderBoard[] | null> {
    const teamsAndCorrespondingMatches = await this._teamsModel.getTeamsAndCorrespondingMatches();

    this._leaderboard = [];
    teamsAndCorrespondingMatches?.forEach((teamMatches) => {
      this.resetThisProperties();
      this.name = teamMatches.teamName;

      switch (awayOrHome) {
        case '/away':
          teamMatches.away.map((match) => this.calculateWinLossesAndDrawsAwayFromHome(match));
          break;
        case '/home':
          teamMatches.home.map((match) => this.calculateWinLossesAndDrawsAtHome(match));
          break;
        default:
          teamMatches.away.map((match) => this.calculateWinLossesAndDrawsAwayFromHome(match));
          teamMatches.home.map((match) => this.calculateWinLossesAndDrawsAtHome(match));
      }

      this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
      this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));

      this.createObject();
    });

    this.sortLeaderboard();
    return this._leaderboard;
  }

  resetThisProperties() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  createObject() {
    this._leaderboard?.push({
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    });
  }

  calculateWinLossesAndDrawsAtHome(match: GoalsCounter) {
    this.totalGames += 1;

    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;

    if (match.awayTeamGoals === match.homeTeamGoals) {
      this.totalDraws += 1;
    } else {
      switch (match.awayTeamGoals < match.homeTeamGoals) {
        case true:
          this.totalVictories += 1;
          break;
        default:
          this.totalLosses += 1;
      }
    }
  }

  calculateWinLossesAndDrawsAwayFromHome(match: GoalsCounter) {
    this.totalGames += 1;
    this.goalsFavor += match.awayTeamGoals;
    this.goalsOwn += match.homeTeamGoals;

    if (match.homeTeamGoals === match.awayTeamGoals) {
      this.totalDraws += 1;
    }

    switch (match.homeTeamGoals < match.awayTeamGoals) {
      case true:
        this.totalVictories += 1;
        break;
      default:
        this.totalLosses += 1;
    }
  }

  sortLeaderboard() {
    this._leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }
}
