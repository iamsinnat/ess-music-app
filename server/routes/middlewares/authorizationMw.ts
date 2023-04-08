import { Request, Response, NextFunction } from 'express';

export function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    /*const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).send('Acesso não autorizado.');
    }*/

    next();
}