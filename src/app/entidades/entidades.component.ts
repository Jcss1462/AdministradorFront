import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activarOpt(): void {
    let activador = document.getElementById("optbox");
    activador.classList.toggle('active');
  }

  redirectAddUsser(){
    window.location.href = '/addusser';
  }

}
