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
  presupuesto: String;
  fecha_presupuesto: String;

  //variables de modificacion
  check: ConfirmIngreso;
  id_alterIngreso: Number;
  ingreso: String;
  fecha_ingreso: String;
  interes: Number;
  cuotas: Number;

  tipo_seleccionado: String;

  //variables de numeracion



  constructor(private router: Router, private _fases: FasesService, private _ingreso: IngresosService) {
    this.id_fase = this.router.parseUrl(this.router.url).queryParams.id_fase;
    this.direccion = this.router.parseUrl(this.router.url).queryParams.dir;
  }

  ngOnInit() {

    //traer fase data
    this._fases.getNameFase(this.id_fase)
      .subscribe((data) => {
        this.fase = data;
        console.log(data);
      }, (error) => {
        console.log(error.message);
      }
      );


    //traigo los ingresos de la fase
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
      this.nuevoIngreso.presupuesto = Number(this.presupuesto.replace(/,/g, ''));;
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
      && ((this.fecha_ingreso != null) || (this.fecha_ingreso != undefined))) {

      this.check = new ConfirmIngreso;
      this.check.id_ingreso = this.id_alterIngreso;
      this.check.ingreso = Number(this.ingreso.replace(/,/g, ''));
      this.check.id_estadoingreso = 2;
      this.check.fecha_ingreso = this.fecha_ingreso;

      if (this.interes == undefined || this.interes == 0) {
        this.check.interes = 0;
      }else{
        this.check.interes = this.interes;
      }

      if (this.cuotas == undefined || this.cuotas == 0) {
        this.check.cuotas = 1;
      }else{
        this.check.cuotas = this.cuotas;
      }



      console.log(this.check);

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

      if (data == null) {
        alert("Ingreso eliminado");
        this.ngOnInit();
      }

    }, (error) => {
      console.log(error.message);
      alert("Error en la eliminacion");
    }
    );


  }


  openIngreso(id_aI, tipo_aI) {

    //uso estos daston en ingreasar()
    this.id_alterIngreso = id_aI;
    //uso este dato para alterar el formulario
    this.tipo_seleccionado = tipo_aI;

    console.log(this.tipo_seleccionado);

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

  simulacionPesos(e) {
    console.log(e.key)
    if ((e.key >= 0 && e.key <= 9) || (e.key == "Backspace")||(e.key=="ArrowRight")||(e.key=="ArrowLeft")) {
      e.target.value = (parseInt(e.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
    } else {
      alert("solo valores numericos en este campo");
    }
  }

  verificar(e) {
    if ((e.key >= 0 && e.key <= 9) || (e.key == "Backspace")||(e.key=="ArrowRight")||(e.key=="ArrowLeft")) {


    } else {
      alert("solo valores numericos");
    }

  }



}
