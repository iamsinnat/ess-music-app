import { Request, Response } from 'express'
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')
import { context } from '../../server'

export const login = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password

    const user = context.userRepository.getByEmail(email)

    const validPassword = bcrypt.compareSync(password, user.senha)
    if (!validPassword) {
        return res.status(401).send('Nome de usuário ou senha incorretos.')
    }

    // Gera um token JWT contendo o id do usuário
    const token = jwt.sign({
        _name: user.nome,
        _email: user.email

    }, 'minha_chave_secreta')

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    })

    // Retorna o token JWT para o usuário
    res.send({ token });
}