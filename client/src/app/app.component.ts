import { Component, OnInit } from '@angular/core';

import {DataService, UserService} from './core/services';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  // parentSubject: Subject<any> = new Subject();

  isLoggedIn;

  title = 'fridge-it';

  constructor(
    private router: Router,
    private userService: UserService,
    private dataService: DataService
  ) {}




  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  logout() {
    this.userService.purgeAuth();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
