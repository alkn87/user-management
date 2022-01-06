import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment'
import {first, Observable, tap} from 'rxjs';
import {ApplicationUser, User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  registerUser(applicationUser: ApplicationUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/register`, applicationUser)
      .pipe(first());
  }

  loginUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}/user/login`, user, {responseType: 'text'})
      .pipe(
        first(),
        tap((authToken: string) => {
          console.log("authToken: " + authToken);
          localStorage.setItem('access_token', authToken);
        })
      );
  }

  changePassword(newPassword: string): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/user/changePassword`, newPassword)
      .pipe(first());
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/user/delete`, {})
      .pipe(first());
  }

  logoutUser() {
    localStorage.removeItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

}
