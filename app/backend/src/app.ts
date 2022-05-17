import 'dotenv/config';
import * as express from 'express';
import { login, matches, teams } from './routes';
import error from './middlewares/error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.setRoutes();
    this.setErrorHandler();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(
      `Server is running on PORT: ${PORT}`,
    ));
  }

  public setRoutes(): void {
    this.app.use('/login', login);
    this.app.use('/teams', teams);
    this.app.use('/matches', matches);
  }

  public setErrorHandler(): void {
    this.app.use(error);
  }
}

export { App };

export const { app } = new App();
