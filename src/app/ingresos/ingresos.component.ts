import { Component, OnInit } from '@angular/core';

//importo servicios
import { Fasesinfo } from '../services/api';
import { FasesService } from '../services/api';

import { ConfirmIngreso } from '../services/api';
import { NewIngreso } from '../services/api';
import { IngresosInfo } from '../services/api';
import { IngresosService } from '../services/api';



//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  private id_fase: Number;
  private direccion: String;



  //variables de manipulcacion con servicios
  fase: Fasesinfo;
  listingreso: IngresosInfo[];
  /////////////////////////////////////

  //variablas de creacion
  nuevoIngreso: NewIngreso;
  tipo: any;
  nuevaEntidad: String;
  presupuesto: Number;
  fecha_presupuesto: String;

  //variables de modificacion
  check: ConfirmIngreso;
  id_alterIngreso: Number;
  ingreso: Number;
  fecha_ingreso: string;
  interes: Number;

  constructor(private router: Router, private _fases: FasesService, private _ingreso: IngresosService) {
    this.id_fase = this.router.parseUrl(this.router.url).queryParams.id_fase;
    this.direccion = this.router.parseUrl(this.router.url).queryParams.dir;


  }

  ngOnInit() {

    //traer entidad data
    this._fases.getNameFase(this.id_fase)
      .subscribe((data) => {
        this.fase = data;
        console.log(data);
      }, (error) => {
        console.log(error.message);
      }
      );


    //traiho los ingresos de la fase
    this._ingreso.getAllingresos(this.id_fase)
      .subscribe((data) => {
        this.listingreso = data;
      }, (error) => {
        console.log(error.message);
      }
      );

  }

  updateTipo(e) {

    this.tipo = e.target.value;

  }

  updateFechaPresupuesto(e) {
    var fecha = e.target.value;
    var p = fecha.split("-", 3);
    this.fecha_presupuesto = p[2] + "/" + p[1] + "/" + p[0];
  }

  updateFechaIngreso(e) {
    var fecha = e.target.value;
    var p = fecha.split("-", 3);
    this.fecha_ingreso = p[2] + "/" + p[1] + "/" + p[0];
  }

  create() {
    console.log(this.fecha_presupuesto);
    console.log(this.tipo);

    if (((this.nuevaEntidad != null) || (this.nuevaEntidad != undefined))
      && ((this.presupuesto != null) || (this.presupuesto != undefined))
      && ((this.tipo != null) || (this.tipo != undefined))
      && ((this.fecha_presupuesto != null) || (this.fecha_presupuesto != undefined))) {


      this.nuevoIngreso = new NewIngreso;

      this.nuevoIngreso.entidad = this.nuevaEntidad;
      this.nuevoIngreso.fecha_presupuesto = this.fecha_presupuesto;
      this.nuevoIngreso.presupuesto = this.presupuesto;
      this.nuevoIngreso.id_estadoingreso = 1;
      this.nuevoIngreso.id_tipoingreso = this.tipo;
      this.nuevoIngreso.id_fase = this.id_fase;


      this._ingreso
        .addIngreso(this.nuevoIngreso)
        .subscribe((data) => {

          if (data) {
            alert("entidad agragada exitosamente");
            this.ngOnInit();
          } else {
            alert("Ha ocurrido un problema y no se ha completado la operacion");
          }


        }, (error) => {
          console.log(error.message);
          alert("Eror de insercion, verificar los datos");
        }
        );


    } else {
      alert("Todos los campos deben estar lleneos");
    }
  }

  ingreasar() {
    console.log("fecha ingreso: " + this.fecha_ingreso);
    console.log("interes: " + this.interes);
    console.log("ingreso: " + this.ingreso);

    if (((this.ingreso != null) || (this.ingreso != undefined))
      && ((this.fecha_ingreso != null) || (this.fecha_ingreso != undefined))
      && ((this.interes != null) || (this.interes != undefined))) {


      this.check = new ConfirmIngreso;
      this.check.id_ingreso = this.id_alterIngreso;
      this.check.ingreso = this.ingreso;
      this.check.id_estadoingreso = 2;
      this.check.interes = this.interes;
      this.check.fecha_ingreso = this.fecha_ingreso;

      this._ingreso
        .updateIngreso(this.check)
        .subscribe((data) => {

          if (data) {
            alert("ingreso agregado exitosamente");
            this.ngOnInit();
          } else {
            alert("Ha ocurrido un problema y no se ha completado la operacion");
          }


        }, (error) => {
          console.log(error.message);
          alert("Eror de insercion, verificar los datos");
        }
        );


    } else {
      alert("Todos los campos deben estar lleneos");
    }
  }


  deleteIngreso(id) {

    this._ingreso.deleteIngreso(id).subscribe((data) => {

      if(data==null){
        alert("Ingreso eliminado");
        this.ngOnInit();
      }

    }, (error) => {
      console.log(error.message);
      alert("Error en la eliminacion");
    }
    );


  }


  openIngreso(id_aI) {

    this.id_alterIngreso = id_aI;

    let a = document.getElementById('editar');
    if (a.style.display == "none") {
      a.setAttribute("style", "display: inline-block");
    } else {
      a.setAttribute("style", "display: none");
    }
  }

  closeEdit() {
    let a = document.getElementById('editar');
    a.setAttribute("style", "display: none");
  }


  ////////////////////////////////////////////////////// options interface

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



}
