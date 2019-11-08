import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ApiService} from '../../core/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminComponent),
      multi: true
    }
  ]
})
export class AdminComponent implements OnInit, ControlValueAccessor {
  balanceForm: FormGroup;
  constructor(
    private api: ApiService,
  ) {
    this.balanceForm = new FormGroup({
      userId: new FormControl(),
      quantity: new FormControl(),
      action: new FormControl()
    });
  }

  ngOnInit() {
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
