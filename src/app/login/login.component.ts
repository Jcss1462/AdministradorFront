import { Component, OnInit } from '@angular/core';


//importo servicios
import { Data } from '../services/api';
import { LoginService } from '../services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: any
  password: any;


  datainfo: Data[];

  constructor(private _Login: LoginService) {

  }


  ngOnInit() {
  }

  updateUser(e) {
    this.user = e.target.value;

  }

  updatePassword(e) {
    this.password = e.target.value;

  }

  login() {
    console.log(this.user);
    //console.log(this.password);

    if (this.user == undefined || this.password == undefined||this.user == 0 || this.password == 0) {

      alert("Alguno de los dos campos se encuentra vacio");

    } else {

      this._Login.loginAction(this.user, this.password)
        .subscribe((data) => {

          if (data.length == undefined) {

            alert("Nombre de usuario o contraseña incorrecto");

          } else {

            console.log(data);
            this.datainfo = data;
            alert("bienvendio " + data[0].nombre+ " tipo: "+data[0].tipo);
            //localStorage.setItem("canart", JSON.stringify(data));

            if(data[0].tipo=="trabajador"){
              window.location.href = '/entidad?usser='+data[0].id_usuario;
            }

            if(data[0].tipo=="cliente"){
              window.location.href = '/clienteSucursal?usser='+data[0].id_usuario;
            }

          }
        }, (error) => {
          console.log(error.message);
        }
        );

    }


  }


}
