import * as express from 'express';
// import router from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    // this.app.use(router); - a implementar
    // this.app.use(error); - a implementar
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
}

export { App };

export const { app } = new App();
