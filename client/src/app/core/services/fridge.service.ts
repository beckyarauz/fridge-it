import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable()
export class FridgeService {

  constructor(
    private api: ApiService,
  ) {}

  buyDrink(drinkId, quantity) {
    return this.api.post('/fridge/purchase', {
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
