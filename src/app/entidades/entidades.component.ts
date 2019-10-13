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



  private id_ususario: Number;

  usserData: Usserdata[];
  listEntidad: Traent[];

  busqueda: string;

  tmp: any[];
  countminnus: any;
  size: any;
  globalSize:any;



  constructor(private _Usser: UssersService, private _traEntidad: TrabajadorEntidadService, private router: Router) {
    //sacar el parametro id y meterlo en un variable
    this.id_ususario = this.router.parseUrl(this.router.url).queryParams.usser;
    console.log(this.id_ususario);
  }

  ngOnInit() {

    this.tmp = new Array;
    this.countminnus = 0;

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

        let colorindex = 0;
        for (var idx = 0; idx < data.length; idx++) {

          if (colorindex > 4) {
            colorindex = 0;
          }

          this.cambiarColor(idx, colorindex);
          colorindex++;

        }

        //tamaño global
        this.globalSize=this.listEntidad.length;
        




      }, (error) => {
        console.log(error.message);
      }
      );

  }


  async cambiarColor(index, color) {

    let colorArray = ['#00EEFF', '#FFFF00', '#FF0000', '#00FF00', '#9200FF'];


    window.addEventListener('load', function () {

      let a = document.getElementsByClassName('fas fa-circle')[index];

      a.setAttribute("style", "color:" + colorArray[color]);

      //console.log(a);
    })

  }


  updateBusqueda(e) {


    this.size = this.listEntidad.length;

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

        //detecto si ha habido algun cambio para añadirlo
        if (this.tmp.length != this.size) {
          this.tmp.push(this.listEntidad);
        }

        
        this.listEntidad = this.filterItems(this.busqueda);
        
        
      }

      if(this.listEntidad.length==this.globalSize){
        console.log("atun");
        this.tmp=new Array;
        this.tmp.push(this.listEntidad);
      }

      console.log(this.countminnus);
      console.log(this.tmp);
      
      
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



  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');
  }

  redirectAddUsser() {
    window.location.href = '/addusser';
  }

}
