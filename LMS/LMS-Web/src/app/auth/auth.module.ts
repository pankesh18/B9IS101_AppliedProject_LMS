import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    LoginComponent,
    IntermediateComponent,
    RegisterComponent
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
