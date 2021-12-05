import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";
import {catchError, EMPTY, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required,]],
      lastname: ['', [Validators.required,]],
      username: ['', [Validators.required,]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    // do nothing if form is invalid
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);

    let applicationUser = {
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    }


    this.authService.registerUser(applicationUser).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError(err => {
        if(err.status === 403){
          this.errorMessage = "Username existiert bereits";
        }
        return EMPTY;
      })
    ).subscribe()
  }
}
