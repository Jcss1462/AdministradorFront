import { Component, OnInit } from '@angular/core';

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
  expresionMail=/\w+@+\w+\.+[a-z]/;
  

  constructor() { }

  ngOnInit() {
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

    console.log("nombre= "+this.nombre);
    console.log("email= "+this.email);
    console.log("pasword= "+this.password);
    console.log("tipo= "+this.tipo);

    if(this.nombre==""||this.nombre==undefined){
      alert("Debe de llenar el campo nombre");
      return false;
    }

    if(this.email==""||this.email==undefined){
      alert("Debe de llenar el campo email");
      return false;
    }

    if(this.password==""||this.password==undefined){
      alert("Debe de llenar el campo contraseña");
      return false;
    }

    if(this.tipo==undefined){
      alert("Debe de escoger un tipo");
      return false;
    }

    if(this.password.length<6||this.password.length>15){
      alert("La contraseña debe tener minimo 6 caracteres y un maximo de 15");
      return false;
    }

    if(!this.expresionMail.test(this.email)){
      alert("El correo ingresado no cumple on el formato");
      return false;
    }



    
    


  }


}
