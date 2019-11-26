import { Component, OnInit } from '@angular/core';


import { SubgastoService } from '../services/api';
import { subGastoInfo } from '../services/api';
import { subGastoConfirm } from '../services/api';


//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-subgasto',
  templateUrl: './subgasto.component.html',
  styleUrls: ['./subgasto.component.scss']
})
export class SubgastoComponent implements OnInit {

  private id_gasto: Number;
  private entidad: String;
  private controlador: Number;

  //variables de manipulcacion con servicios
  listSubgastos: subGastoInfo[];

  //variables de modificacion
  paySubgasto: subGastoConfirm;


  constructor(private router: Router, private _subgasto: SubgastoService) {
    this.id_gasto = this.router.parseUrl(this.router.url).queryParams.id_gasto;
    this.entidad = this.router.parseUrl(this.router.url).queryParams.entidad;
  }

  ngOnInit() {

    //traigo los subgastos
    this._subgasto.getAllSubgastos(this.id_gasto)
      .subscribe((data) => {
        this.listSubgastos = data;
        this.detectaSiguiente();
      }, (error) => {
        console.log(error.message);
      }
      );



  }

  detectaSiguiente() {
    for (let idx = 0; idx < this.listSubgastos.length; idx++) {
      if (this.listSubgastos[idx].estadogasto == "Pendiente") {
        this.controlador = idx;
        break;
      }
    }
    console.log(this.controlador);
  }

  pagar(pago: Number, id_subgasto: Number) {

    let result = window.confirm("¿Esta seguro que ya realizo el pago?");
    if (result == true) {
      console.log("update");
      this.paySubgasto = new subGastoConfirm;
      this.paySubgasto.id_gasto = Number(this.id_gasto);
      this.paySubgasto.valorcancelado = Number(pago);
      this.paySubgasto.id_estadogasto = 2;
      this.paySubgasto.id_subgasto = Number(id_subgasto);

      this._subgasto
        .updateSubgasto(this.paySubgasto)
        .subscribe((data) => {

          if (data) {
            alert("Subgasto pagado exitosamente");
            this.ngOnInit();
          } else {
            alert("Ha ocurrido un problema y no se ha completado la operacion");
          }


        }, (error) => {
          console.log(error.message);
          alert("Eror de insercion, verificar los datos");
        }
        );
    }

  }

}
