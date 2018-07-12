import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './registration/registration.service';
import { LoginService } from './login/login.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [RegistrationService, LoginService]
})
export class ServicesModule { }
