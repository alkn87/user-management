import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from '../../../environments/environment'
import {catchError, Observable, throwError} from "rxjs";
import {ApplicationUser, User} from "../../models/user";
import {LoginResponse} from "../../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // TODO: backend return value
  registerUser(applicationUser: ApplicationUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/register`, applicationUser)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: User) {
    this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`, user)
      .subscribe((res: LoginResponse) => {
        localStorage.setItem('access_token', res.token)
      });
  }

  logoutUser() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  // Error handling
  handleError(err: HttpErrorResponse) {
    return throwError(err.error.message())
  }

}
