import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.sass']
})
export class DrinksComponent implements OnInit {
  drinks: [];

  constructor(
    private api: ApiService,
  ) {

  }

  ngOnInit() {
    this.api.get('drinks').subscribe(
      data => this.drinks = data.drinks,
      err => console.log(err.message)
    );
  }
}
