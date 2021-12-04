import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countdown: number = 60;
  timedOut: boolean = false;
  idleState = "NOT_STARTED";

  constructor(private idle: Idle, private cd: ChangeDetectorRef, private router: Router) {
    idle.setIdle(1);
    idle.setTimeout(this.countdown);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  ngOnInit(): void {
    this.reset();

    this.idle.onIdleStart.subscribe(() => {
      console.log("User is idle.");
      this.idleState = "IDLE";
    });

    this.idle.onIdleEnd.subscribe(() => {
      console.log("No longer idle.");
      this.idleState = "NOT_IDLE";
      this.cd.detectChanges();
    });

    this.idle.onTimeout.subscribe(() => {
      console.log("Time out!");
      this.timedOut = true;
      this.logout();
    });

    this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      //console.log("You will be timed out in " + countdown + " seconds.");
      this.countdown = countdown;
    });
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  logout() {
    // logout user
    this.router.navigate(['/login']);
  }
}
