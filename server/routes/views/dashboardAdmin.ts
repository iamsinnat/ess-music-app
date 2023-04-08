import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken'

export const dashboardRoute = (req: Request, res: Response) => {
    /*const cookie = req.cookies['jwt']

    if (!cookie) {
        return res.status(401).send('Usuário não autenticado.')
    }

    const claims = jwt.verify(cookie, 'minha_chave_secreta') as JwtPayload

    if (!claims) {
        return res.status(401).send('Usuário não autenticado.')
    }

    // Cria um handle para o arquivo json de banco de dados
    getJsonDatabase((err: any, jsonDatabase: any) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo JSON de usuários.')
        }

        // Busca o usuário pelo id
        const user = jsonDatabase.find((user: { id: any }) => user.id === claims._id)
        if (!user) {
            return res.status(401).send('Usuário não encontrado.')
        }

        const {
            password,
            ...userData
        } = JSON.parse(JSON.stringify(user))

        // Retorna o usuário correspondente ao id
        res.send(userData)

    })*/
    return res.status(200).send('Bem vindo ao dashboard admin')
}