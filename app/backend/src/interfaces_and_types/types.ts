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

export interface IMatches {
  id: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
  homeTeamGoals: number,
  awayTeamGoals: number,
  teamAway?: { teamName: string },
  teamHome?: { teamName: string },
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
