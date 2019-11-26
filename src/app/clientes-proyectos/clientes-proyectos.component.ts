import { Component, OnInit } from '@angular/core';

//importo servicios
import { SucursalInfo } from '../services/api';
import { SucursalService } from '../services/api';

import { ProyectosInfo } from '../services/api';
import { NuevoProyecto } from '../services/api';
import { ProyectosService } from '../services/api';


//importo para obtener el parametro en la url
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes-proyectos',
  templateUrl: './clientes-proyectos.component.html',
  styleUrls: ['./clientes-proyectos.component.scss']
})
export class ClientesProyectosComponent implements OnInit {

  private id_Sucursal: Number;

  //variables de manipulcacion con servicios
  sucursal: SucursalInfo;
  listProyectos: ProyectosInfo[];
  /////////////////////////////////////

  constructor(private router: Router, private _sucursales: SucursalService, private _proyectos: ProyectosService) {
    this.id_Sucursal = this.router.parseUrl(this.router.url).queryParams.sucursal;
  }

  ngOnInit() {

    //traer entidad data
    this._sucursales.getNameSucursal(this.id_Sucursal)
      .subscribe((data) => {
        this.sucursal = data;
        console.log(data);
      }, (error) => {
        console.log(error.message);
      }
      );

    //traigo lista de proyectos
    this._proyectos.getAllProyects(this.id_Sucursal)
      .subscribe((data) => {
        console.log(data);
        this.listProyectos = data;
        

      }, (error) => {
        console.log(error.message);
      }
      );

  }

  ////////////////////////////////////////////////////// options interface

  redirectFase(id_proyecto){
    console.log(id_proyecto);
    window.location.href = '/clienteFases?proyect='+id_proyecto+"&dir="+this.sucursal[0].direccion;
  }

  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');

  }

  logout() {
    window.location.href = '/';
  }

  
  //esta funcon sirve par ocultar el menu de opciones si hago click fuera de el
  propieties(e) {
    if ((e.target.parentElement.parentElement.id != "optbox") && (document.getElementById("optbox").classList.value == "active")) {
      document.getElementById("optbox").classList.toggle('active')
    }
  }


}
