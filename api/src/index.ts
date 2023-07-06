import express ,{Application} from "express";

import  cookieParser from 'cookie-parser';
import  router from './routes';
import * as dotenv from "dotenv";
dotenv.config();
import './database';

export const app:Application = express();

app.use(express.json());
app.use(cookieParser());


import "./config/jwt.config";

app.use(router);



if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT);
}
