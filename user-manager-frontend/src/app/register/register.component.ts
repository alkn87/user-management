import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }
}
