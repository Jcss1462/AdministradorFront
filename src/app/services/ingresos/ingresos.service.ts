import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { IngresosInfo } from './ingresosInfo';
import { NewIngreso } from './newingreso';
import { ConfirmIngreso } from './confirmIngreso';
////////////////


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/ingresos'

  constructor(private http: HttpClient) {
    console.log("funcionando servico ingresos");
  }

  getAllingresos(id_fase: Number): Observable<IngresosInfo[]> {
    return this.http.get<IngresosInfo[]>(this.resourceURL + "?id_fase=" + id_fase);
  }

  addIngreso(ingreso: NewIngreso): Observable<NewIngreso> {
    return this.http.post<NewIngreso>(this.resourceURL, ingreso, httpOptions);
  }

  updateIngreso(check: ConfirmIngreso): Observable<ConfirmIngreso> {
    return this.http.put<ConfirmIngreso>(this.resourceURL, check, httpOptions)
  }

  deleteIngreso (id: number): Observable<{}> {
    return this.http.delete(this.resourceURL+"?id_ingreso="+id, httpOptions)
  }

}
