import { Component, OnInit } from '@angular/core';

//importo servicios
import { Usserdata } from '../services/api';
import { UssersService } from '../services/api';

import { Traent } from '../services/api';
import { TrabajadorEntidadService } from '../services/api';

import { Entidad } from '../services/api';
import { EntidadesService } from '../services/api';

//importo para obtener el parametro en la url
import { Router } from '@angular/router';


@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {



  private id_ususario: Number;

  //variables de manipulcacion con servicios
  usserData: Usserdata[];
  listEntidad: Traent[];
  newEntidad: Entidad;
  //////

  busqueda: string;
  nueva: string;

  tmp: any[];
  countminnus: any;
  size: any;
  globalSize: any;



  constructor(private _Usser: UssersService, private _traEntidad: TrabajadorEntidadService, private _entidad: EntidadesService, private router: Router) {
    //sacar el parametro id y meterlo en un variable
    this.id_ususario = this.router.parseUrl(this.router.url).queryParams.usser;

  }

  ngOnInit() {



    this.tmp = new Array;
    this.countminnus = 0;

    //traer usser data
    this._Usser.getData(this.id_ususario)
      .subscribe((data) => {
        this.usserData = data;
      }, (error) => {
        console.log(error.message);
      }
      );

    //traer entidades

    this._traEntidad.getEntidades(this.id_ususario)
      .subscribe((data) => {
        this.listEntidad = data;


        //tamaño global
        this.globalSize = this.listEntidad.length;

        //asignar color al elemento
        let colorindex = 0;
        for (var idx = 0; idx < data.length; idx++) {

          if (colorindex > 4) {
            colorindex = 0;
          }

          this.listEntidad[idx].color = this.asignarcolor(colorindex);
          colorindex++;

          //pinto el elemento
          this.pintarAlcargar(idx, this.listEntidad);

        }




      }, (error) => {
        console.log(error.message);
      }
      );

    //////////////////////////////////////////////////


  }


  asignarcolor(color) {
    let colorArray = ['#00EEFF', '#FFFF00', '#FF0000', '#00FF00', '#9200FF'];
    return colorArray[color];
  }

  pintarAlcargar(index, lista: Traent[]) {
    window.addEventListener('load', function () {
      let a = document.getElementsByClassName('fas fa-circle')[index];

      a.setAttribute("style", "color:" + lista[index].color);
    })

  }

  pintar(index, lista: Traent[]) {


    let a = document.getElementsByClassName('fas fa-circle')[index];
    a.setAttribute("style", "color:" + lista[index].color);


  }

  updateBusqueda(e) {


    this.size = this.listEntidad.length;
    console.log("tamaño actual= " + this.size);

    if (this.busqueda != undefined) {

      if (e.key == "Backspace") {

        if (this.countminnus! < 0) {
          this.countminnus++;
        }

        this.listEntidad = this.tmp[Math.abs(this.countminnus)];

      } else {

        if (this.busqueda.length != 0) {
          this.countminnus--;
        }
        this.tmp.push(this.listEntidad);



        this.listEntidad = this.filterItems(this.busqueda);


      }

      if (this.listEntidad.length == this.globalSize) {

        this.tmp = new Array;
        this.tmp.push(this.listEntidad);

      }

      if (this.busqueda.length == 0) {

        console.log("cumplido");
        this.listEntidad=this.tmp[0];
        this.tmp = new Array;
        this.tmp.push(this.listEntidad);
        this.countminnus=0;
        
      }

      //console.log(this.countminnus);
      //console.log(this.tmp);
      //console.log(this.listEntidad);

    }


  }

  updateColor(e) {

    //pinto de nuevo
    for (var idx = 0; idx < this.listEntidad.length; idx++) {
      //pinto el elemento
      this.pintar(idx, this.listEntidad);
    }


  }

  filterItems(query) {
    return this.listEntidad.filter(function (el) {
      //console.log(el.entidad);
      if (el.entidad.toLowerCase().startsWith(query.toLowerCase())) {
        //console.log(55);
        return true;
      } else {
        //console.log(80);
        return false;
      }
    })
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


  create() {



    if ((this.nueva != null) || (this.nueva != "0") || this.nueva != undefined) {


      this.newEntidad = new Entidad;
      this.newEntidad.creador = Number(this.id_ususario);
      this.newEntidad.entidad = this.nueva;



      this._entidad
        .addEntidad(this.newEntidad)
        .subscribe((data) => {



          if (data) {
            alert("entidad agragada exitosamente");
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



  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');
  }

  redirectAddUsser() {
    window.location.href = '/addusser';
  }

  redirectSucursal(id_entidad){
    console.log(id_entidad);
    window.location.href = '/sucursales?entidad='+id_entidad;
  }


}
