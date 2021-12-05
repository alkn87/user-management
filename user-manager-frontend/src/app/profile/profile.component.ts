import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../utils/validation";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteProfileComponent} from "./delete-profile/delete-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.profileForm = this.fb.group({
      password: ['', [Validators.required,]],
      confirm_password: ['', Validators.required],
    }, {
      validators: [Validation.match('password', 'confirm_password')]
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  onSubmit() {
    // do nothing if form is invalid
    if (this.profileForm.invalid) return;
    console.log(this.profileForm.value);
  }

  openDeleteProfileDialog() {
    const modalRef = this.modalService.open(DeleteProfileComponent, {size: 'lg'});
    modalRef.result
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch(() => {
      });
  }
}
