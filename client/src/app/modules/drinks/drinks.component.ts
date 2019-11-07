import {Component, forwardRef, OnInit} from '@angular/core';
import {ApiService} from '../../core/services';
import {FridgeService} from '../../core/services';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DrinksComponent),
      multi: true
    }
  ]
})
export class DrinksComponent implements OnInit, ControlValueAccessor {
  drinks: object[];
  drinksForm: FormGroup;
  buySelected: boolean;
  drinkSelected: string;
  // propagateChange = (_: any) => { };

  constructor(
    private api: ApiService,
    private fridge: FridgeService
  ) {
    this.drinksForm = new FormGroup({
        drinkId: new FormControl(),
        quantity: new FormControl()
      });
  }

  ngOnInit() {
    this.buySelected = false;
    this.api.get('/fridge/drinks').subscribe(
      data => {
        this.drinks = data.drinks;
      },
      err => console.log(err.message)
    );
  }

  // selectDrink(drink) {
  //   this.drinkSelected = drink;
  //   this.drinksForm.controls.drinkId.setValue(drink);
  // }

  toggleDrink(event) {
    if (event.checked) {
      this.drinkSelected = event.source.value;
      this.drinksForm.controls.drinkId.setValue(this.drinkSelected);
    } else {
      this.drinksForm.controls.drinkId.setValue(null);
      this.drinkSelected = undefined;
    }
  }

  // isSelected(drink) {
  //
  // }

  buyDrink() {
    this.fridge.getDrink(this.drinkSelected, this.drinksForm.controls.quantity.value);
  }

  writeValue(drink: string): void {
    // this.drinkSelected = drink;
  }

  registerOnChange(fn: any): void {
    // this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }


}
