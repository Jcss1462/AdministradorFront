import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AddUsserComponent } from './add-usser/add-usser.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { FasesComponent } from './fases/fases.component';
import { PresupuestosComponent } from './presupuestos/presupuestos.component';
import { SubgastoComponent } from './subgasto/subgasto.component';
import { ClientesSucursalesComponent } from './clientes-sucursales/clientes-sucursales.component';
import { ClientesProyectosComponent } from './clientes-proyectos/clientes-proyectos.component';
import { ClienteFasesComponent } from './cliente-fases/cliente-fases.component';
import { ListInversionesComponent } from './list-inversiones/list-inversiones.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'recuperar', component: RecuperarPasswordComponent },
  {path: 'entidad', component: EntidadesComponent },
  {path: 'addusser', component: AddUsserComponent },
  {path: 'sucursales', component: SucursalesComponent },
  {path: 'proyects', component: ProyectsComponent},
  {path: 'fases', component: FasesComponent},
  {path: 'presupuesto', component: PresupuestosComponent},
  {path: 'subgasto', component: SubgastoComponent},

  {path: 'clienteSucursal', component: ClientesSucursalesComponent},
  {path: 'clienteProyecto', component: ClientesProyectosComponent},
  {path: 'clienteFases', component: ClienteFasesComponent},

  {path: 'listInversiones', component: ListInversionesComponent},


  {path: '',  component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
