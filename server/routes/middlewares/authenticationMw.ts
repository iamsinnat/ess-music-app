import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken'
//import getJsonDatabase from '../utils/jsonDatabase';
import { context } from '../../server';

interface User {
    nome: string
    email: string
    senha: string
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies['jwt']

    if (!cookie) {
        return res.status(401).send('Usuário não autenticado.');
    }

    try {
        const claims = jwt.verify(cookie, 'minha_chave_secreta') as JwtPayload;
        if (!claims) {
            return res.status(401).send('Usuário não autenticado.');
        }

        const user = context.userRepository.getByEmail(claims._email)
        if (user.email != claims._email) {
            return res.status(401).send('Usuário não autenticado.');
        }
        //const user = jsonDatabase.find((user: { id: any }) => user.id === claims._id);
        //if (!user) {
        //    return res.status(401).send('Usuário não autenticado.');
        //}

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).send('Usuário não autenticado.');
    }
}