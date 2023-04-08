import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiURL = 'http://localhost:3000/api';
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) { }

    public async login(email: string, password: string) {
        try {
            const result = await this.http.post<any>(`${this.apiURL}/login`, { email: email, password: password }).toPromise();
            if (result && result.token) {
                localStorage.setItem('jwt', result.token);
                const decodedToken = this.jwtHelper.decodeToken(result.token);
                localStorage.setItem('user', JSON.stringify(decodedToken.user));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public isLoggedIn() {
        const token = localStorage.getItem('jwt');
        return !this.jwtHelper.isTokenExpired(token);
    }

    public logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    public getUserRole() {
        const token = localStorage.getItem('jwt');
        console.log(token)
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.role;
        } else {
            return null;
        }
    }
}