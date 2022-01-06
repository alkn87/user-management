import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {

    const materialDesignModules = [
      BrowserAnimationsModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatToolbarModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
    ]

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, materialDesignModules],
      providers: [FormBuilder, AuthService],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set instance correctly', () => {
    expect(component).not.toBeNull();
  });

  it('should call auth register method', fakeAsync(() => {
    let registerElement: DebugElement;
    const debugElement = fixture.debugElement;
    const authService = debugElement.injector.get(AuthService);
    const loginSpy = spyOn(authService, 'registerUser').and.callThrough();
    const testRegisterUser = {
      firstname: 'max',
      lastname: 'mustermann',
      username: 'testuser123',
      password: '12345'
    };
    component.registerForm.controls['firstname'].setValue(testRegisterUser.username);
    component.registerForm.controls['lastname'].setValue(testRegisterUser.password);
    component.registerForm.controls['username'].setValue(testRegisterUser.username);
    component.registerForm.controls['password'].setValue(testRegisterUser.password);

    registerElement = fixture.debugElement.query(By.css('form'));
    registerElement.triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalledTimes(1);
    // check that service is called once
    // ^ this fails without correct login!
  }));
});
