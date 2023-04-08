import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { decode, verify, JwtPayload } from 'jsonwebtoken';//import { context } from '../../../../server'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private cookieService: CookieService) { }

    getJwtFromCookie(): string {
        return this.cookieService.get('jwt');
    }

    validateJwt(jwtToken: string): boolean {
        try {
            // Verifica se o token está no formato correto
            const decodedToken = decode(jwtToken);
            if (!decodedToken || typeof decodedToken !== 'object') {
                return false;
            }

            // Verifica se o token é válido
            const secret = 'my_secret_key'; // substituir pela chave secreta real
            const verifiedToken = verify(jwtToken, secret) as JwtPayload;
            if (!verifiedToken || typeof verifiedToken !== 'object') {
                return false;
            }

            // Verifica se o token não expirou
            const currentTime = Date.now() / 1000; // convertendo para segundos
            if (verifiedToken.exp && verifiedToken.exp <= currentTime) {
                return false;
            }

            /*const user = context.userRepository.getByEmail(verifiedToken['_email'])
            // Verifica se o token contém as informações corretas do usuário
            if (user.email != verifiedToken['_email']) {
                return false;
            }
            */
            // Se todas as verificações passarem, o token é válido
            return true;

        } catch (err) {
            // Se ocorrer algum erro durante a verificação, o token é inválido
            return false;
        }
    }
}