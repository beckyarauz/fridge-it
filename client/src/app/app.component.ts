import { Component, OnInit } from '@angular/core';

import { UserService } from './core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  title = 'fridge-it';

  ngOnInit() {
    this.userService.populate();
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
