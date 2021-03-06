import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Validation from '../utils/validation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteProfileComponent} from './delete-profile/delete-profile.component';
import {AuthService} from '../core/auth/auth.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm: FormGroup;
  changedFlag = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private authService: AuthService, private router: Router) {
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
    // TODO potential error handling.
    this.authService.changePassword(this.profileForm.value.confirm_password).subscribe(() => {
      this.changedFlag = true;
    });
  }

  openDeleteProfileDialog() {
    const modalRef = this.modalService.open(DeleteProfileComponent, {size: 'lg'});
    modalRef.result
      .then((confirmed) => {
        if (confirmed) {
          console.log('User confirmed to delete profile:', confirmed)
          // TODO error handling
          this.authService.deleteUser().pipe(
            tap(() => {
              this.router.navigate(['/login'])
              this.authService.logoutUser();
            })).subscribe()
        }
      })
      .catch(() => {
      });
  }
}
