import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable()
export class FridgeService {

  constructor(
    private api: ApiService,
  ) {}

  buyDrink(drinkId, quantity) {
    console.log(drinkId);
    console.log(quantity);
    return this.api.post('/fridge/drinks/retrieve', {
      drinkId, quantity
    })
      .subscribe(
        data => 'Drinks Retrieved',
        error => error.message
      );
  }

  getDrinks() {
    return this.api.get('/fridge/drinks');
  }

}
