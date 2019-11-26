import { Component, OnInit } from '@angular/core';



//importo servicios
import { ProyectosInfo } from '../services/api';
import { ProyectosService } from '../services/api';


import { Fasesinfo } from '../services/api';
import { NewFase } from '../services/api';
import { FasesService } from '../services/api';


//importo para obtener el parametro en la url
import { Router } from '@angular/router';



@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.scss']
})
export class FasesComponent implements OnInit {

  private id_proyecto: Number;
  private direccion: String;

  //variables de manipulcacion con servicios
  proyectoInfo: ProyectosInfo;
  listFases: Fasesinfo[];
  newFase: NewFase;
  /////////////////////////////////////

  busqueda: string;
  tmp: any[];
  countminnus: any;
  size: any;
  globalSize: any;

  /////variables de creacion
  nueva: string;


  constructor(private router: Router, private _proyecto: ProyectosService, private _fases: FasesService) {

    //sacar el parametro de la url lo meto en un variable
    this.id_proyecto = this.router.parseUrl(this.router.url).queryParams.proyect;
    this.direccion=this.router.parseUrl(this.router.url).queryParams.dir;
    console.log(this.id_proyecto);
    console.log(this.direccion);

  }

  ngOnInit() {

    this.tmp = new Array;
    this.countminnus = 0;

    //traer entidad data
    this._proyecto.getNameProyecto(this.id_proyecto)
      .subscribe((data) => {
        this.proyectoInfo = data;
      }, (error) => {
        console.log(error.message);
      }
      );


    //traer fases
    this._fases.getAllfases(this.id_proyecto)
      .subscribe((data) => {
        this.listFases = data;
        //tamaño global
        this.globalSize = data.length;
        console.log(data);
      }, (error) => {
        console.log(error.message);
      }
      );


  }


  updateBusqueda(e) {

    this.size = this.listFases.length;
    console.log("tamaño actual= " + this.size);

    if (this.busqueda != undefined) {

      if (e.key == "Backspace") {

        if (this.countminnus! < 0) {
          this.countminnus++;
        }

        this.listFases = this.tmp[Math.abs(this.countminnus)];

      } else {

        if (this.busqueda.length != 0) {
          this.countminnus--;
        }
        this.tmp.push(this.listFases);



        this.listFases = this.filterItems(this.busqueda);


      }

      if (this.listFases.length == this.globalSize) {

        this.tmp = new Array;
        this.tmp.push(this.listFases);
        this.countminnus=0;
      }

    

      //console.log(this.countminnus);
      //console.log(this.tmp);
      //console.log(this.listEntidad);

    }


  }

  filterItems(query) {
    return this.listFases.filter(function (el) {
      //console.log(el.entidad);
      if (el.fase.toLowerCase().startsWith(query.toLowerCase())) {
        //console.log(55);
        return true;
      } else {
        //console.log(80);
        return false;
      }
    })
  }


  create(){

    if(this.nueva==null||this.nueva.length==0||this.nueva==undefined){

      alert("llenar en campo");

    }else{


      this.newFase = new NewFase;
      this.newFase.fase = this.nueva;
      this.newFase.id_proyecto = this.id_proyecto;

    


      this._fases
        .addFase(this.newFase)
        .subscribe((data) => {

          if (data) {
            alert("fase agragada exitosamente");
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

  redirectPresupuesto(id_fase){
    window.location.href = '/presupuesto?id_fase='+id_fase+"&dir="+this.direccion;
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

  logout() {
    window.location.href = '/';
  }


}
