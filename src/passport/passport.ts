import { PassportStatic } from "passport";
import { Strategy } from 'passport-local';
import { User } from "../model/user";

export const configurePassport = (passport: PassportStatic  ): PassportStatic => {

    passport.use('local', new Strategy((username, password, done) => {
        if (username === 'test@test.com' && password === 'testpw') {
            done(null, new User(username, password));    
        } else {
            done('Incorrect username or password');
        }

    }));

    return passport;
}