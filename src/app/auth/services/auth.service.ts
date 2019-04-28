import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { User } from '../_models/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  uri = environment.apiUrlRoot

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    console.log("Authenticating on this uri: ", this.uri, "\n Authenticating with this http request: ", this.http)

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log("Authenticating on this uri: ", this.uri)
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log("Authenticating login on this uri: ", this.uri)

    return this.http.post<any>(`${this.uri}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        console.log("Authenticate returning: ", user)
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}