import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { first } from 'rxjs/operators';

// import { User } from '../auth/_models/users';
// import { AuthenticationService } from '../auth/services/auth.service';
// import { UserService } from '../auth/services/user.service';

// @Component({ templateUrl: 'home.component.html' })
// export class HomeComponent implements OnInit {
//   currentUser: User;
//   currentUserSubscription: Subscription;
//   users: User[] = [];

//   constructor(
//     private authenticationService: AuthenticationService) { }


//   ngOnInit() {
//   }
// }