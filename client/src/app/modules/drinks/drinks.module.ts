import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material';
@NgModule({
  declarations: [DrinksComponent],
  imports: [
    CommonModule,
    SharedModule,
    DrinksRoutingModule,
    MatCardModule
  ]
})
export class DrinksModule { }
