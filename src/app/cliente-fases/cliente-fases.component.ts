import { Component, OnInit } from '@angular/core';



//importo servicios
import { ProyectosInfo } from '../services/api';
import { ProyectosService } from '../services/api';


import { Fasesinfo } from '../services/api';
import { FasesService } from '../services/api';


//importo para obtener el parametro en la url
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-fases',
  templateUrl: './cliente-fases.component.html',
  styleUrls: ['./cliente-fases.component.scss']
})
export class ClienteFasesComponent implements OnInit {

  private id_proyecto: Number;
  private direccion: String;

  //variables de manipulcacion con servicios
  proyectoInfo: ProyectosInfo;
  listFases: Fasesinfo[];

  constructor(private router: Router, private _proyecto: ProyectosService, private _fases: FasesService) {

    //sacar el parametro de la url lo meto en un variable
    this.id_proyecto = this.router.parseUrl(this.router.url).queryParams.proyect;
    this.direccion=this.router.parseUrl(this.router.url).queryParams.dir;
    console.log(this.id_proyecto);
    console.log(this.direccion);

  }

  ngOnInit() {

    
    //traer entidad data
    this._proyecto.getNameProyecto(this.id_proyecto)
      .subscribe((data) => {
        this.proyectoInfo = data;
      }, (error) => {
        console.log(error.message);
      }
      );


    //traer fases
    this._fases.getAllfases(this.id_proyecto)
      .subscribe((data) => {
        this.listFases = data;
        //tamaño global
        console.log(data);
      }, (error) => {
        console.log(error.message);
      }
      );

  }


  ///////////////////////////////////////////////////// options interface
  logout() {
    window.location.href = '/';
  }


  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');

  }

  //esta funcon sirve par ocultar el menu de opciones si hago click fuera de el
  propieties(e) {
    if ((e.target.parentElement.parentElement.id != "optbox") && (document.getElementById("optbox").classList.value == "active")) {
      document.getElementById("optbox").classList.toggle('active')
    }
  }

}
