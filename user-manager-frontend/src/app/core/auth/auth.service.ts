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

  registerUser(applicationUser: ApplicationUser) {
    this.httpClient.post(`${environment.apiUrl}/user/register`, applicationUser)
      //.pipe(catchError(this.handleError));
  }

  loginUser(user: User) {
    this.httpClient.post(`${environment.apiUrl}/user/login`, user, {responseType: 'text'})
      .subscribe((authToken: string) => {
        console.log("authToken: " + authToken);
        localStorage.setItem('access_token', authToken);
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
