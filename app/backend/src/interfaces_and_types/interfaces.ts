import { Request, Response, NextFunction } from 'express';
import { User, Team } from './types';

export interface IUserDB {
  getByEmail(email: string): Promise< User | null >,
}

export interface ILoginService {
  authenticateUser(email: string, password: string): Promise<User | boolean>,
  generateToken(email: string, role: string): string,
  getRoleFromVerifiedToken(token: string): string,
  validateEmail(email: string): boolean,
}

export interface IValidation {
  verifyEmailAndPassword(req: Request, res: Response, next: NextFunction): void,
}

export interface ITeamsService {
  getAll(): Promise<Team[] | null>
  getById(id: number): Promise<Team | null>
}

export interface ITeamDB {
  getAll(): Promise<Team[] | null>,
  getById(id: number): Promise<Team | null>
}
