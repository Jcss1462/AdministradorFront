import { Component, OnInit } from '@angular/core';


//importacion par obtener la ultima pagina visitada
import { Location } from '@angular/common';

//importo servicios
import { Usserinfo } from '../services/api';
import { UssersService } from '../services/api';


@Component({
  selector: 'app-add-usser',
  templateUrl: './add-usser.component.html',
  styleUrls: ['./add-usser.component.scss']
})

export class AddUsserComponent implements OnInit {

  nombre: any
  email: any
  password: any;
  tipo: any;
  us: Usserinfo;
  expresionMail = /\w+@+\w+\.+[a-z]/;


  constructor(private _Usser: UssersService,private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  updateNombre(e) {
    this.nombre = e.target.value;
  }

  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updateTipo(e) {

    this.tipo = e.target.value;

  }



  signUp() {

    console.log("nombre= " + this.nombre);
    console.log("email= " + this.email);
    console.log("pasword= " + this.password);
    console.log("tipo= " + this.tipo);
    console.log("us= " + this.us);

    if (this.nombre == "" || this.nombre == undefined) {
      alert("Debe de llenar el campo nombre");
      return false;
    }

    if (this.email == "" || this.email == undefined) {
      alert("Debe de llenar el campo email");
      return false;
    }

    if (this.password == "" || this.password == undefined) {
      alert("Debe de llenar el campo contraseña");
      return false;
    }

    if (this.tipo == undefined) {
      alert("Debe de escoger un tipo");
      return false;
    }

    if (this.password.length < 6 || this.password.length > 15) {
      alert("La contraseña debe tener minimo 6 caracteres y un maximo de 15");
      return false;
    }

    if (!this.expresionMail.test(this.email)) {
      alert("El correo ingresado no cumple on el formato");
      return false;
    }

    this.us= {
      name: this.nombre,
      email: this.email,
      password: this.password,
      tipo: this.tipo
    }
    
    
    this.nombre;
    this.us.email = this.email;
    this.us.password = this.password;
    this.us.tipo = Number(this.tipo);

    console.log("us= " + this.us);

    this._Usser
      .addUsser(this.us)
      .subscribe((data) => {

       
        if(data){
          alert("Usuario agragado exitosamente");
        }else{
          alert("Ha ocurrido un problema y no se ha completado la operacion");
        }


      }, (error) => {
        console.log(error.message);
      }
      );

  }


}
