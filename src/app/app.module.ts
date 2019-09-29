import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//componentes
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';


//http
import { HttpClientModule } from '@angular/common/http';


//servicios
import{LoginService} from './services/api';
import{RecuperacionService} from './services/api';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [

    LoginService,
    RecuperacionService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
