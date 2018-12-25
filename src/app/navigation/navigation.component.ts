import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { AuthenticationService } from '../auth/services/auth.service';
import { User } from '../auth/_models/users';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
