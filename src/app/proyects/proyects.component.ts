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
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit {


  private id_Sucursal: Number;

  //variables de manipulcacion con servicios
  sucursal: SucursalInfo;
  listProyectos: ProyectosInfo[];
  /////////////////////////////////////


  busqueda: string;
  tmp: any[];
  countminnus: any;
  size: any;
  globalSize: any;

  //variables de creacion
  Proyecto: string;
  nuevoProyecto: NuevoProyecto;

  constructor(private router: Router, private _sucursales: SucursalService, private _proyectos: ProyectosService) {
    this.id_Sucursal = this.router.parseUrl(this.router.url).queryParams.sucursal;
  }

  ngOnInit() {

    this.tmp = new Array;
    this.countminnus = 0;
    

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
        //tamaño global
        this.globalSize = this.listProyectos.length;

      }, (error) => {
        console.log(error.message);
      }
      );

  }

  
  updateBusqueda(e) {

    this.size = this.listProyectos.length;
    console.log("tamaño actual= " + this.size);

    if (this.busqueda != undefined) {

      if (e.key == "Backspace") {

        if (this.countminnus! < 0) {
          this.countminnus++;
        }

        this.listProyectos = this.tmp[Math.abs(this.countminnus)];

      } else {

        if (this.busqueda.length != 0) {
          this.countminnus--;
        }
        this.tmp.push(this.listProyectos);



        this.listProyectos = this.filterItems(this.busqueda);


      }

      if (this.listProyectos.length == this.globalSize) {

        this.tmp = new Array;
        this.tmp.push(this.listProyectos);
        this.countminnus=0;
      }

    

      //console.log(this.countminnus);
      //console.log(this.tmp);
      //console.log(this.listEntidad);

    }


  }

  filterItems(query) {
    return this.listProyectos.filter(function (el) {
      //console.log(el.entidad);
      if (el.proyecto.toLowerCase().startsWith(query.toLowerCase())) {
        //console.log(55);
        return true;
      } else {
        //console.log(80);
        return false;
      }
    })
  }

  create(){

    if(this.Proyecto==null||this.Proyecto.length==0||this.Proyecto==undefined){

      alert("Todos los campos deven estar llenos");

    }else{


      this.nuevoProyecto = new NuevoProyecto;
      this.nuevoProyecto.proyecto = this.Proyecto;
      this.nuevoProyecto.id_sucursal = Number(this.id_Sucursal);
      this.nuevoProyecto.id_estado = Number(1);
      



      this._proyectos
        .addProyecto(this.nuevoProyecto)
        .subscribe((data) => {

          if (data) {
            alert("proyecto creado exitosamente");
            this.ngOnInit();
          } else {
            alert("Ha ocurrido un problema y no se ha completado la operacion");
          }


        }, (error) => {
          console.log(error.message);
        }
        );

    }
  }


  redirectFase(id_proyecto){
    console.log(id_proyecto);
    window.location.href = '/fases?proyect='+id_proyecto+"&dir="+this.sucursal[0].direccion;
  }
  ////////////////////////////////////////////////////// options interface
  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');

  }

  redirectAddUsser() {
    window.location.href = '/addusser';
  }

  showAdd(e) {
    let a = document.getElementById('añadir');
    if (a.style.display == "none") {
      a.setAttribute("style", "display: inline-block");
    } else {
      a.setAttribute("style", "display: none");
    }
  }

  closeadd() {
    let a = document.getElementById('añadir');
    a.setAttribute("style", "display: none");
  }


  //esta funcon sirve par ocultar el menu de opciones si hago click fuera de el
  propieties(e) {
    if ((e.target.parentElement.parentElement.id != "optbox") && (document.getElementById("optbox").classList.value == "active")) {
      document.getElementById("optbox").classList.toggle('active')
    }
  }

}
