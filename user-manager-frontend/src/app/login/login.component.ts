import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {catchError, EMPTY, tap} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    // do nothing if form is invalid
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);

    let user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.loginUser(user).pipe(
      tap(() => {
        this.router.navigate(['/home']);
      }),
      catchError((err, caught) => {
        switch (err.status) {
          case 403:
            this.errorMessage = "username oder password nicht korrekt";
            break;
          case 418:
            this.errorMessage = "Du bist gesperrt! Versuche es später erneut";
            break;
        }
        return EMPTY;
      })
    ).subscribe();
  }
}
