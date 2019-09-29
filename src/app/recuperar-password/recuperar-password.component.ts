import { Component, OnInit } from '@angular/core';

//importo servicios
import { Email } from '../services/api';
import { RecuperacionService } from '../services/api';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit {

  email:any;

  constructor(private _recuperacion: RecuperacionService) { }

  ngOnInit() {
  }

  updateEmail(e) {
    this.email = e.target.value;
  }


  enviar() {
    console.log(this.email);
    //console.log(this.password);

    if (this.email == undefined || this.email == 0) {

      alert("Debe ingresar el correo electronico");

    } else {

      
      this._recuperacion.recuperacion(this.email)
        .subscribe((data) => {

          if (data.length == 0) {

            alert("Correo no registra en la base de datos");

          } else {

            console.log(data.length);
            // this.datainfo = data;
            //alert("bienvendio " + data[0].nombre);
            //localStorage.setItem("canart", JSON.stringify(data));

          }
        }, (error) => {
          console.log(error.message);
        }
        );



    }


  }

}
