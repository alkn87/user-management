import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../utils/validation";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      password: ['', [Validators.required,]],
      confirm_password: ['', Validators.required],
    }, {
      validators: [Validation.match('password', 'confirm_password')]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  onSubmit() {
    // do nothing if form is invalid
    if (this.profileForm.invalid) return;
    console.log(this.profileForm.value);
  }

}
