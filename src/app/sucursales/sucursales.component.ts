import { Component, OnInit } from '@angular/core';


//importo servicios
import { GetEntidad } from '../services/api';
import { EntidadesService } from '../services/api';

import { SucursalInfo } from '../services/api';
import { Newsucursal } from '../services/api';
import { SucursalService } from '../services/api';



//importo para obtener el parametro en la url
import { Router } from '@angular/router';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  private id_Entidad: Number;

  //variables de manipulcacion con servicios
  entidadInfo: GetEntidad;
  listSucursales: SucursalInfo[];
  newSucursal: Newsucursal;
  /////////////////////////////////////

  busqueda: string;
  tmp: any[];
  countminnus: any;
  size: any;
  globalSize: any;

  /////variables de creacion
  nuevaSucursal: string;
  direccion: string;


  constructor(private router: Router, private _entidad: EntidadesService, private _sucursales: SucursalService) {

    //sacar el parametro de la url lo meto en un variable
    this.id_Entidad = this.router.parseUrl(this.router.url).queryParams.entidad;

  }

  ngOnInit() {

    this.tmp = new Array;
    this.countminnus = 0;

    //traer entidad data
    this._entidad.getName(this.id_Entidad)
      .subscribe((data) => {
        this.entidadInfo = data;
      }, (error) => {
        console.log(error.message);
      }
      );

    ///traigo lista de sucursales
    this._sucursales.getAllSucursal(this.id_Entidad)
      .subscribe((data) => {
        console.log(data);
        this.listSucursales = data;

        //tamaño global
        this.globalSize = this.listSucursales.length;

      }, (error) => {
        console.log(error.message);
      }
      );

  }


  updateBusqueda(e) {

    this.size = this.listSucursales.length;
    console.log("tamaño actual= " + this.size);

    if (this.busqueda != undefined) {

      if (e.key == "Backspace") {

        if (this.countminnus! < 0) {
          this.countminnus++;
        }

        this.listSucursales = this.tmp[Math.abs(this.countminnus)];

      } else {

        if (this.busqueda.length != 0) {
          this.countminnus--;
        }
        this.tmp.push(this.listSucursales);



        this.listSucursales = this.filterItems(this.busqueda);


      }

      if (this.listSucursales.length == this.globalSize) {

        this.tmp = new Array;
        this.tmp.push(this.listSucursales);
        this.countminnus=0;
      }

    

      //console.log(this.countminnus);
      //console.log(this.tmp);
      //console.log(this.listEntidad);

    }


  }

  filterItems(query) {
    return this.listSucursales.filter(function (el) {
      //console.log(el.entidad);
      if (el.sucursal.toLowerCase().startsWith(query.toLowerCase())) {
        //console.log(55);
        return true;
      } else {
        //console.log(80);
        return false;
      }
    })
  }

  create(){

    if((this.nuevaSucursal==null||this.nuevaSucursal.length==0||this.nuevaSucursal==undefined)||
    (this.direccion==null||this.direccion.length==0||this.direccion==undefined)){

      alert("Ambos campos deve estar llenos");

    }else{


      this.newSucursal = new Newsucursal;
      this.newSucursal.sucursal = this.nuevaSucursal;
      this.newSucursal.direccion = this.direccion;
      this.newSucursal.id_entidad = Number(this.id_Entidad);
      



      this._sucursales
        .addSucursal(this.newSucursal)
        .subscribe((data) => {

          if (data) {
            alert("sucursal agragada exitosamente");
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

  redirectProyects(id_sucursal){
    console.log(id_sucursal);
    window.location.href = '/proyects?sucursal='+id_sucursal;
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
