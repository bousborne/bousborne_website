import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animations';

import { AuthenticationService } from './auth/services/auth.service';
import { User } from './auth/_models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  currentUser: User;
  title = 'Benjamin Ousborne';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
