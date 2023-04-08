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
        //secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    })

    // Retorna o token JWT para o usuário
    res.send({
        //token: token
        message: 'success'
    })

    /*
       // Cria um handle para o arquivo json de banco de dados
       getJsonDatabase((err: any, jsonDatabase: any) => {
           if (err) {
               return res.status(500).send('Erro ao ler o arquivo JSON de usuários.')
           }
   
           // Busca o usuário
           // Busca o usuário pelo nome de usuário
           const user = jsonDatabase.find((user: { name: any }) => user.name === username)
           if (!user) {
               return res.status(401).send('Nome de usuário ou senha incorretos.')
           }
   
           // Verifica a senha do usuário
           const validPassword = bcrypt.compareSync(password, user.password)
           if (!validPassword) {
               return res.status(401).send('Nome de usuário ou senha incorretos.')
           }
   
           // Gera um token JWT contendo o id do usuário
           const token = jwt.sign({
               _id: user.id,
               _role: user.role,
               _name: user.name,
               _email: user.email
   
           }, 'minha_chave_secreta')
   
           res.cookie('jwt', token, {
               httpOnly: true,
               //secure: true,
               maxAge: 24 * 60 * 60 * 1000 // 24 horas
           })
   
           // Retorna o token JWT para o usuário
           res.send({
               //token: token
               message: 'success'
           })
       })*/
}