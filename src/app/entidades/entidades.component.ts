import { Component, OnInit } from '@angular/core';

//importo servicios
import { Usserdata } from '../services/api';
import { UssersService } from '../services/api';

import { Traent } from '../services/api';
import { TrabajadorEntidadService } from '../services/api';

//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {


  colorArray = ['#00EEFF', '#FFFF00', '#FF0000', '#00FF00', '#9200FF'];

  private id_ususario: Number;

  usserData: Usserdata[];
  listEntidad: Traent[];

  

  constructor(private _Usser: UssersService, private _traEntidad: TrabajadorEntidadService,  private router: Router) {
    //sacar el parametro id y meterlo en un variable
    this.id_ususario = this.router.parseUrl(this.router.url).queryParams.usser;
    console.log(this.id_ususario);
  }

  ngOnInit() {

    //traer usser data
    this._Usser.getData(this.id_ususario)
      .subscribe((data) => {
        console.log(data);
        this.usserData = data;
      }, (error) => {
        console.log(error.message);
      }
      );

    //traer entidades

    this._traEntidad.getEntidades(this.id_ususario)
    .subscribe((data) => {
      console.log(data);
      this.listEntidad = data;

      this.cambiarColor(0);

    }, (error) => {
      console.log(error.message);
    }
    );

  }


  cambiarColor(index){

    window.addEventListener('load', function () {
    
    let a=document.getElementsByClassName('fas fa-circle');
    console.log(a[0]);

    })

  
  }

  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');
  }

  redirectAddUsser() {
    window.location.href = '/addusser';
  }

}
