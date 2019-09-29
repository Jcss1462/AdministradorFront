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

    if (this.user == undefined || this.password == undefined) {

      alert("Alguno de los dos campos se encuentra vacio");

    } else {

      this._Login.loginAction(this.user, this.password)
        .subscribe((data) => {

          if (data.length == undefined) {

            alert("Nombre de usuario o contraseña incorrecto");

          } else {

            console.log(data.length);
            this.datainfo = data;
            alert("bienvendio " + data[0].nombre);
            //localStorage.setItem("canart", JSON.stringify(data));

          }
        }, (error) => {
          console.log(error.message);
        }
        );

    }


  }


}
