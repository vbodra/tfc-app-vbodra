import { app } from '../app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { emailAndPasswordRequired } from '../error_messages';

const { expect } = chai;

chai.use(chaiHttp);

describe("Testing POST /login", () => {
  let res: Response;
  describe("No data is send", () => {
    it("Tests login without data", async () => {
      res = await chai.request(app).post('/login').send({});

      expect(res.status).to.equal(emailAndPasswordRequired.status);
    });
  });
});
