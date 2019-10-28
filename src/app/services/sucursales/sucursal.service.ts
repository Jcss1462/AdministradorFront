import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



import { SucursalInfo } from './sucursalInfo';
import { Newsucursal } from './newSucursal';
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
export class SucursalService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/sucursales'

  constructor(private http: HttpClient) { 
    console.log("funcionando servico sucursales");
  }

  getAllSucursal(id_entidad: Number): Observable<SucursalInfo[]> {
    return this.http.get<SucursalInfo[]>(this.resourceURL + "?id_entidad=" + id_entidad);
  }

  addSucursal(sucursal: Newsucursal): Observable<Newsucursal> {
    return this.http.post<Newsucursal>(this.resourceURL, sucursal, httpOptions);
  }

  getNameSucursal(id: Number): Observable<SucursalInfo> {

    return this.http.get<SucursalInfo>(this.resourceURL+"?razon=nombre"+"&id_sucursal="+id);

  }
}
