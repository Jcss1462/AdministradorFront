import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AddUsserComponent } from './add-usser/add-usser.component';
import { SucursalesComponent } from './sucursales/sucursales.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'recuperar', component: RecuperarPasswordComponent },
  {path: 'entidad', component: EntidadesComponent },
  {path: 'addusser', component: AddUsserComponent },
  {path: 'sucursales', component: SucursalesComponent },
  {path: '',  component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
