import express ,{Application,  Request, Response} from "express";
import {join} from 'path';
// const cookieParser = require('cookie-parser');
// const port = process.env.PORT || '8000';
// const router = require('./routes');

// require('./database');

const app:Application = express();

// module.exports = {
//   app,
// };


// app.use(express.static('../client-build'));
// app.use(express.json());
// app.use(cookieParser());


// require("./config/jwt.config");

// app.use(router);

app.get('*', (_:Request, res:Response) => {
    res.sendFile(join(__dirname, '../index.html'));
})

app.listen(8000);