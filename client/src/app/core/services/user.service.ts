import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({} as any);

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken('randomToken');
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  async purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);

    return await this.apiService.get('/auth/logout').toPromise();
  }

  attemptAuth(type, credentials) {
    const {username, password} = credentials;
    return this.apiService.post('/auth/login', {username, password})
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getUserTransactions() {
    const user = this.getCurrentUser();
    return this.apiService.get(`/user/${user._id}/history`);
    // return [
    //     {type: 'balance', balanceDelta: 10 },
    //     {type: 'balance', balanceDelta: 3 },
    //     {type: 'balance', balanceDelta: -1 },
    //     {type: 'balance', balanceDelta: 20 },
    //     {type: 'balance', balanceDelta: -1 },
    //     {type: 'balance', balanceDelta: -1 },
    //     {type: 'purchase', product: 'cola', balanceDelta: -1 },
    //     {type: 'purchase', product: 'mate', balanceDelta: -1 },
    //     {type: 'purchase', product: 'water', balanceDelta: -1 },
    //     {type: 'purchase', product: 'beer', balanceDelta: -1 },
    //   ];
  }

  getMockUserTransactions() {
    return [
        {type: 'balance', balanceDelta: 10 },
        {type: 'balance', balanceDelta: 3 },
        {type: 'balance', balanceDelta: -1 },
        {type: 'balance', balanceDelta: 20 },
        {type: 'balance', balanceDelta: -1 },
        {type: 'balance', balanceDelta: -1 },
        {type: 'purchase', product: 'cola', balanceDelta: -1 },
        {type: 'purchase', product: 'mate', balanceDelta: -1 },
        {type: 'purchase', product: 'water', balanceDelta: -1 },
        {type: 'purchase', product: 'beer', balanceDelta: -1 },
      ];
  }


  isLogged() {
    return this.apiService.get('/auth/status');
  }

  getUser() {
    const user = this.getCurrentUser();
    return this.apiService.get(`/user/${user._id}`);
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<any> {
    return this.apiService
      .put('/user', { user })
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

}
