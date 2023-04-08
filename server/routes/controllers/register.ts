import { Request, Response } from 'express';
import { hashPassword } from '../utils/bcryptUtils'
import * as uuid from 'uuid';
import { User } from 'music-app-models';
import { context } from '../../server';

export const register = async (req: Request, res: Response) => {
    if (req.body.password === undefined || req.body.password == '' || req.body.password === null)
        return res.status(400).send('Senha vazia.');

    const hashedPassword = await hashPassword(req.body.password)
    const username = req.body.name
    const email = req.body.email
    const password = hashedPassword

    // Valida se o email possui um "@"
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return res.status(400).send('Email inválido.')
    }

    const newUser: User = {
        email: email,
        nome: username,
        senha: password
    }

    if (context.userRepository.add(newUser))
        return res.status(200).send('Registro bem sucedido');

    return res.status(400).send('Usuário já existente');
}
