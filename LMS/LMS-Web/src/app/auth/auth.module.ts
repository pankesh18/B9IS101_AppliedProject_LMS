import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    IntermediateComponent
    
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
