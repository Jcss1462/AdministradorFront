import { Component, OnInit } from '@angular/core';


//traigo los servicios
import { IngresosInfo } from '../services/api';
import { IngresosService } from '../services/api';

import { GastosInfo } from '../services/api';
import { GastosService } from '../services/api';


//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {

  private id_fase: Number;

  //variablesdonde almacenare lo traido por los servicios
  listingreso: IngresosInfo[];
  listGasto: GastosInfo[];

  //variables donde almacenare los totales
  presupuestIngreso: any = 0;
  totalIngreso: any = 0;

  presupuestGasto: any = 0;
  totalPagar: any = 0;
  totalGastado: any = 0;

  constructor(private router: Router, private _ingreso: IngresosService, private _gasto: GastosService) {
    this.id_fase = this.router.parseUrl(this.router.url).queryParams.id_fase;
  }

  ngOnInit() {


    this.presupuestIngreso=0;
    this.totalIngreso= 0;
    this.presupuestGasto=0;
    this.totalPagar=0;
    this.totalGastado=0;

    //traigo los ingresos de la fase
    this._ingreso.getAllingresos(this.id_fase)
      .subscribe((data) => {
        this.listingreso = data;

        for (let idx = 0; idx < this.listingreso.length; idx++) {

          this.presupuestIngreso += this.listingreso[idx].presupuesto;
          this.totalIngreso += this.listingreso[idx].ingreso;

        }


      }, (error) => {
        console.log(error.message);
      }
      );

    //traigo los gastos de la fase
    this._gasto.getAllGastos(this.id_fase)
      .subscribe((data) => {

        this.listGasto = data;

        for (let idx = 0; idx < this.listGasto.length; idx++) {

          this.presupuestGasto += this.listGasto[idx].presupuesto_gasto;
          this.totalPagar += this.listGasto[idx].pago_pactado;
          this.totalGastado += this.listGasto[idx].pago;

        }

      }, (error) => {
        console.log(error.message);
      }
      );

  }

  refrech(){

    this.ngOnInit();

  }

}
