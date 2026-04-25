import { MainClass } from './main-class';
import express, { Request, Response } from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport'
import { configurePassport } from './passport/passport';

const app = express();
const port = 3000;

// any vs unknown
// (port as any.).listen() bízunk benne hogy van ilyen implementáció
// unkown értéket nem lehet tovább adni más objektumnak

// undefined vs null 
// undefined inicializálatlan érték, null szándékosan üres érték

app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser
app.use(cookieParser());

// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions))

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));

app.listen(3000, () => {
    console.log('Server is running on port' + port.toString);
});

