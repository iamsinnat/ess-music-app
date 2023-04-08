import { Router } from 'express'
const router: Router = Router()

//import getJsonDatabase from './utils/jsonDatabase'
import { hashPassword, comparePasswords } from './utils/bcryptUtils'

import { logout } from './controllers/logout';
import { login } from './controllers/login';
import { register } from './controllers/register';

import { dashboardRoute } from './views/dashboard';
import { authenticationMiddleware } from './middlewares/authenticationMw'
import { authorizationMiddleware } from './middlewares/authorizationMw'

import { Request, Response } from 'express';
import fs = require('fs');
import bcrypt = require('bcrypt');
import uuid = require('uuid');
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken'
interface User {
    id: string
    role: string
    name: string
    email: string
    password: string
}

interface JwtClaims {
    _id: string
}


router.post('/register', register)

router.post('/login', login)

router.get('/dashboardUser', authenticationMiddleware, dashboardRoute)

router.get('/dashboardAdmin', authenticationMiddleware, authorizationMiddleware, dashboardRoute)

router.post('/logout', authenticationMiddleware, logout)

export default router