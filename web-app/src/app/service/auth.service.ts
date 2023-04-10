import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/user';

  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl);
  }

  GetbyCode(code: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/${code}`);
  }

  GetAllRole(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/role');
  }

  Proceedregister(inputdata: any): Observable<any> {
    return this.http.post<any>(this.apiurl, inputdata);
  }

  Updateuser(code: any, inputdata: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/${code}`, inputdata);
  }

  Adduser(inputdata: any): Observable<any> {
    return this.http.post<any>(this.apiurl, inputdata);
  }

  // Saber se o usuário está logado
  IsloggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  GetUserRole(): string {
    return localStorage.getItem('userrole')?.toString() || '';
  }

  deletarUsuario(code: any) {
    this.http.delete(this.apiurl + '/' + code).subscribe(res => res)
  }
}

/*Antes da refatoração, caso quebre algo
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/user'

  GetAll() {
    return this.http.get(this.apiurl);
  }

  GetbyCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  Proceedregister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata);
  }

  Adduser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  //saber se o usuario esta logado
  IsloggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  GetUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }

  deletarUsuario(code: any) {
    this.http.delete(this.apiurl + '/' + code).subscribe(res => res)
  }

}
*/