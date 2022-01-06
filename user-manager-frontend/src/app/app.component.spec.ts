import {TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "./core/auth/auth.service";
import {Idle, IdleExpiry, NgIdleModule} from "@ng-idle/core";
import {ChangeDetectorRef} from "@angular/core";

export class MockExpiry extends IdleExpiry {
  public lastDate: Date | undefined;
  public mockNow: Date | undefined;

  last(value?: Date): Date {
    if (value !== void 0) {
      this.lastDate = value;
    }

    return <Date>this.lastDate;
  }

  override now(): Date {
    return this.mockNow || new Date();
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgIdleModule],
      providers: [Idle, { provide: IdleExpiry, useClass: MockExpiry }, ChangeDetectorRef, AuthService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
