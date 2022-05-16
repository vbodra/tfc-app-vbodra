export type User = {
  id: number,
  username: string,
  role: string,
  email: string,
  token?: string,
  password?: string,
};

export type Team = {
  id: number,
  teamName: string,
};

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesRequest extends IMatchGoals {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
}

export interface IMatches extends IMatchGoals {
  id: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
  teamHome: { teamName: string },
  teamAway: { teamName: string },
}

export type LeaderBoard = {
  rank?: number,
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};
