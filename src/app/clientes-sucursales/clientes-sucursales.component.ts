import { Component, OnInit } from '@angular/core';

//importo servicios
import { Usserdata } from '../services/api';
import { UssersService } from '../services/api';

import { ClientsucursalesService } from '../services/api';
import { EnlaceCS } from '../services/api';
import { CliSuc } from '../services/api';

//importo para obtener el parametro en la url
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-sucursales',
  templateUrl: './clientes-sucursales.component.html',
  styleUrls: ['./clientes-sucursales.component.scss']
})
export class ClientesSucursalesComponent implements OnInit {

  private id_ususario: Number;

  //variables de manipulcacion con servicios
  usserData: Usserdata[];
  codeSucursal: Number;

  //variable para obtener la informacion de ls sucursales pertenecientes al cliente
  sucursalList: CliSuc[];

  //variables de enlace
  nuevoDato: EnlaceCS;

  constructor(private _Usser: UssersService, private router: Router, private _clienteSucursal: ClientsucursalesService) { 
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

     //traer sucursales data
     this._clienteSucursal.getMySucursal(this.id_ususario)
     .subscribe((data) => {
      console.log(data);
       this.sucursalList = data;
     }, (error) => {
       console.log(error.message);
     }
     );

  }

  create() {

    if ((this.codeSucursal != null) || (this.codeSucursal != undefined)) {



      for(let idx=0;idx<this.sucursalList.length;idx++){
          if(this.codeSucursal==this.sucursalList[idx].id_sucursal){
            alert("Sucursal ya agregada");
            return;
          }
      }

      this.nuevoDato = new EnlaceCS;
      this.nuevoDato.cliente = Number(this.id_ususario);
      this.nuevoDato.codigo =  Number(this.codeSucursal);

      console.log(this.nuevoDato);
      this._clienteSucursal
        .addSucursal(this.nuevoDato)
        .subscribe((data) => {

          if (data) {
            alert("Sucursal emparejada exitosamente");
            this.ngOnInit();
          } else {
            alert("Sucursal no registra en la base de datos");
          }


        }, (error) => {
          console.log(error.message);
          alert("Sucursal no registra en la base de datos");
        }
        );
    }else{
      alert("Diguite el codigo de la sucursal");
    }

  }

  redirectProyects(id){
    window.location.href = '/clienteProyecto?sucursal='+id;
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
