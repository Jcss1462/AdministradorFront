import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { EnlaceCS } from './enlaceCS';
import { CliSuc } from './clisuc';
////////////////

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};




@Injectable({
  providedIn: 'root'
})
export class ClientsucursalesService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/clientesucursales'

  constructor(private http: HttpClient) {
    console.log("funcionando servico cliente sucursal");
  }

  addSucursal(sucursal: EnlaceCS): Observable<EnlaceCS> {
    return this.http.post<EnlaceCS>(this.resourceURL, sucursal, httpOptions);
  }

  getMySucursal(id_usuario: Number): Observable<CliSuc[]> {
    return this.http.get<CliSuc[]>(this.resourceURL + "?id_usuario=" + id_usuario);
  }

}
