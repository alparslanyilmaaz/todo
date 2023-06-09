import * as bodyParser from 'body-parser';
import express from 'express';
import routes from './src/modules/routes';
require('dotenv').config();

import cors from 'cors';
import { AppDataSource } from './src/datasource';

const app = express();

const port = process.env.SERVER_PORT || '8080';

AppDataSource.initialize().catch(error => console.log(error));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Express ');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});