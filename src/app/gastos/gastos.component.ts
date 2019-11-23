import { Component, OnInit } from '@angular/core';

//importo servicios
import { Fasesinfo } from '../services/api';
import { FasesService } from '../services/api';

import { GastosService } from '../services/api';
import { GastosInfo } from '../services/api';
import { ConfirmGasto } from '../services/api';
import { NewGasto } from '../services/api';

//importo para obtener el parametro en la url
import { Router } from '@angular/router';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  private id_fase: Number;
  private direccion: String;


  //variables de manipulcacion con servicios
  fase: Fasesinfo;
  listGasto: GastosInfo[];
  /////////////////////////////////////

  //variablas de creacion
  nuevoGasto: NewGasto;
  nuevaEntidad: String;
  presupuesto: String;
  fecha_presupuesto: String;


  //variables de modificacion
  checkGasto: ConfirmGasto;
  id_alterGasto: Number;
  gasto: String;
  cuotas: Number;
  interes: Number=0;
  fecha_pago: String;

  constructor(private router: Router, private _fases: FasesService, private _gasto: GastosService) { }

  ngOnInit() {
    this.id_fase = this.router.parseUrl(this.router.url).queryParams.id_fase;
    this.direccion = this.router.parseUrl(this.router.url).queryParams.dir;


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
    this._gasto.getAllGastos(this.id_fase)
      .subscribe((data) => {
        this.listGasto = data;
      }, (error) => {
        console.log(error.message);
      }
      );

  }

  updateFechaPresupuesto(e) {
    var fecha = e.target.value;
    var p = fecha.split("-", 3);
    this.fecha_presupuesto = p[2] + "/" + p[1] + "/" + p[0];
  }

  create() {
    console.log(this.fecha_presupuesto);


    if (((this.nuevaEntidad != null) || (this.nuevaEntidad != undefined))
      && ((this.presupuesto != null) || (this.presupuesto != undefined))
      && ((this.fecha_presupuesto != null) || (this.fecha_presupuesto != undefined))) {


      this.nuevoGasto = new NewGasto;

      this.nuevoGasto.entidad = this.nuevaEntidad;
      this.nuevoGasto.fecha_presupuesto_gasto = this.fecha_presupuesto;
      this.nuevoGasto.presupuesto_gasto = Number(this.presupuesto.replace(/,/g, ''));


      this.nuevoGasto.id_estadogasto = 1;
      this.nuevoGasto.id_fases = this.id_fase;


      this._gasto
        .addGasto(this.nuevoGasto)
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
      alert("Solo el campo de cuotas es opcional");
    }
  }


  deleteGastos(id) {

    this._gasto.deleteGasto(id).subscribe((data) => {

      if (data == null) {
        alert("Gasto eliminado");
        this.ngOnInit();
      }

    }, (error) => {
      console.log(error.message);
      alert("Error en la eliminacion");
    }
    );


  }

  ingreasar() {
    console.log("gasto: " + this.gasto);
    console.log("cuotas: " + this.cuotas);
    console.log("interes: " + this.interes);

    if ((this.gasto != null) || (this.gasto != undefined)) {

      this.checkGasto=new ConfirmGasto;
      this.checkGasto.id_gasto=this.id_alterGasto;


      let newPagoPactado=Number(this.gasto.replace(/,/g, ''));


      if(this.cuotas==0||this.cuotas==undefined){

        this.checkGasto.pago_pactado=newPagoPactado;
        this.checkGasto.cuotas=0;
        this.checkGasto.id_tipocorte=1;
        this.checkGasto.id_estadogasto=2;
        this.checkGasto.interes=0;
        this.checkGasto.pago=newPagoPactado;
        this.checkGasto.fecha_pago=this.fecha_pago;

      }else{

        this.checkGasto.pago_pactado=newPagoPactado+((Number(this.interes)*newPagoPactado)/100);
        this.checkGasto.cuotas=this.cuotas;
        this.checkGasto.id_tipocorte=2;
        this.checkGasto.id_estadogasto=1;
        this.checkGasto.interes=this.interes;
        this.checkGasto.pago=null;
        this.checkGasto.fecha_pago=null;
    
      }


      this._gasto
        .updateGasto(this.checkGasto)
        .subscribe((data) => {

          if (data) {
            alert("gasto agragado exitosamente");
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
      alert("Debe ingresar un gasto");
    }
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

  openIngreso(id_aG, fechaPresupuesto) {

    //uso estos daston en ingreasar()
    this.id_alterGasto = id_aG;
    this.fecha_pago=fechaPresupuesto;

    console.log(id_aG);

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

  simulacionPesos(e) {
    console.log(e.key)
    if ((e.key >= 0 && e.key <= 9) || (e.key == "Backspace") || (e.key == "ArrowRight") || (e.key == "ArrowLeft")) {
      e.target.value = (parseInt(e.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
    } else {
      alert("solo valores numericos en este campo");
    }
  }

  verificar(e) {
    if ((e.key >= 0 && e.key <= 9) || (e.key == "Backspace") || (e.key == "ArrowRight") || (e.key == "ArrowLeft")) {


    } else {
      alert("solo valores numericos");
    }

  }

}
