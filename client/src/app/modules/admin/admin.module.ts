import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {SharedModule} from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class AdminModule { }
