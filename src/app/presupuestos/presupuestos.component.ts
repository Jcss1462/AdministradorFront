import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit {

  private seleccion;

  constructor() { }

  ngOnInit() {

    //selecciono ingresos apenas carga la pagina
    this.seleccion=1;
    document.getElementById("Ingresos").classList.toggle('active');


  }


  changeSlect(choose){

    this.seleccion=choose;

    console.log(document.getElementById("Ingresos").classList.value);

    if(this.seleccion==1&&document.getElementById("Ingresos").classList.value!="item active"){
      document.getElementById("Ingresos").classList.toggle('active');
      document.getElementById("Gastos").classList.toggle('active');
    }

    if(this.seleccion==2&&document.getElementById("Gastos").classList.value!="item active"){
      document.getElementById("Gastos").classList.toggle('active');
      document.getElementById("Ingresos").classList.toggle('active');
    }
    
  }


  ////////////////////////////////////////////////////// options interface
  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');

  }

  redirectAddUsser() {
    window.location.href = '/addusser';
  }

  //esta funcon sirve par ocultar el menu de opciones si hago click fuera de el
  propieties(e) {
    if ((e.target.parentElement.parentElement.id != "optbox") && (document.getElementById("optbox").classList.value == "active")) {
      document.getElementById("optbox").classList.toggle('active')
    }
  }

}
