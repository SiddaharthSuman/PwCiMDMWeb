import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/components/home/home.component';
import { PageNotFoundComponent } from './pages/components/page-not-found/page-not-found.component';
import { ComponentsModule } from './pages/components/components.module';
import { LoginComponent } from './pages/components/login/login.component';
import { RegisterComponent } from './pages/components/register/register.component';
import { ServicesModule } from './pages/services/services.module';

export const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
