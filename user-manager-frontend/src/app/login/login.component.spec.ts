import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      imports: [materialDesignModules, HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, AuthService],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set instance correctly', () => {
    expect(component).not.toBeNull();
  });

  it('should call auth login method', fakeAsync(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    const authService = debugElement.injector.get(AuthService);
    const loginSpy = spyOn(authService, 'loginUser').and.callThrough();
    const testUser = {
      username: 'testuser123',
      password: '12345'
    };
    component.loginForm.controls['username'].setValue(testUser.username);
    component.loginForm.controls['password'].setValue(testUser.password);
    loginElement = fixture.debugElement.query(By.css('form'));
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalledTimes(1);
    // check that service is called once
    // ^ this fails without correct login!
  }));
});
