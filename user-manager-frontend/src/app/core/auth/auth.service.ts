import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment'
import {catchError, Observable, throwError} from "rxjs";
import {ApplicationUser, User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  registerUser(applicationUser: ApplicationUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/register`, applicationUser)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: User) {
    this.httpClient.post(`${environment.apiUrl}/user/login`, user, {responseType: 'text'})
      .pipe(catchError(this.handleError))
      .subscribe((authToken: string) => {
        console.log("authToken: " + authToken);
        localStorage.setItem('access_token', authToken);
      });
  }

  changePassword(newPassword: string): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/user/changePassword`, newPassword)
      .pipe(catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/user/delete`, {})
      .pipe(catchError(this.handleError));
  }

  logoutUser() {
    localStorage.removeItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
