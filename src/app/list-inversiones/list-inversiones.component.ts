import { Component, OnInit } from '@angular/core';


//importo servicios
import { Usserdata } from '../services/api';
import { UssersService } from '../services/api';

import { ListaInversionesService } from '../services/api';
import { EnlaceII } from '../services/api';
import { InversionInfo } from '../services/api';

//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-inversiones',
  templateUrl: './list-inversiones.component.html',
  styleUrls: ['./list-inversiones.component.scss']
})
export class ListInversionesComponent implements OnInit {

  private id_ususario: Number;

  //variables de manipulcacion con servicios
  usserData: Usserdata[];
  codeIngreso: Number;

  //variables de enlace
  nuevoDato: EnlaceII;

  //variable para manejar todas las inversiones
  inversiones: InversionInfo[];

  constructor(private _Usser: UssersService, private router: Router, private _listaInversion:ListaInversionesService) {
    //sacar el parametro id y meterlo en un variable
    this.id_ususario = this.router.parseUrl(this.router.url).queryParams.usser;
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

    this._listaInversion.getMyInversiones(this.id_ususario)
      .subscribe((data) => {
        console.log(data);
        this.inversiones = data;
      }, (error) => {
        console.log(error.message);
      }
      );

  }
  
  create() {

    if ((this.codeIngreso != null) || (this.codeIngreso != undefined)) {


      for(let idx=0;idx<this.inversiones.length;idx++){
        if(this.codeIngreso==this.inversiones[idx].id_ingreso){
          alert("Inversión ya existente");
          return;
        }
      }
  

      this.nuevoDato = new EnlaceII;
      this.nuevoDato.id_usuario = Number(this.id_ususario);
      this.nuevoDato.id_inversion =  Number(this.codeIngreso);

      console.log(this.nuevoDato);
      this._listaInversion
        .enlazarInversiones(this.nuevoDato)
        .subscribe((data) => {

          if (Number(data)==1) {
            alert("Inversión emparejada exitosamente");
            this.ngOnInit();
          } else {
            alert("Inversión no valido");
          }


        }, (error) => {
          console.log(error.message);
          alert("Inversión no valido");
        }
        );
    }else{
      alert("Diguite el codigo de la Inversión");
    }

  }




  ////////////////////////////////////////////////////// options interface
  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');

  }

  logout() {
    window.location.href = '/';
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
