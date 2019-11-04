import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//componentes
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AddUsserComponent } from './add-usser/add-usser.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { FasesComponent } from './fases/fases.component';
import { PresupuestosComponent } from './presupuestos/presupuestos.component';
import { IngresosComponent } from './ingresos/ingresos.component';

//http
import { HttpClientModule } from '@angular/common/http';


//servicios
import{LoginService} from './services/api';
import{RecuperacionService} from './services/api';
import{UssersService} from './services/api';
import{EntidadesService} from './services/api';
import{TrabajadorEntidadService} from './services/api';
import{SucursalService} from './services/api';
import{ProyectosService} from './services/api';
import{FasesService} from './services/api';
import{IngresosService} from './services/api';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarPasswordComponent,
    EntidadesComponent,
    AddUsserComponent,
    SucursalesComponent,
    ProyectsComponent,
    FasesComponent,
    PresupuestosComponent,
    IngresosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [

    LoginService,
    RecuperacionService,
    UssersService,
    EntidadesService,
    TrabajadorEntidadService,
    SucursalService,
    ProyectosService,
    FasesService,
    IngresosService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
