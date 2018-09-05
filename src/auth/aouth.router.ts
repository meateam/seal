import * as express from 'express';
import * as path from 'path';
export let authRouter: express.Router = express.Router();

authRouter.get('/metadata.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'metadata.xml'));
});
