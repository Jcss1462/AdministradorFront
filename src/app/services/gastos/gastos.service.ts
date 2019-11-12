import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { GastosInfo } from './gastosInfo';
import { NewGasto } from './newgasto';

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
export class GastosService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/gastos'

  constructor(private http: HttpClient) {
    console.log("funcionando servico gastos");
  }

  getAllGastos(id_fase: Number): Observable<GastosInfo[]> {
    return this.http.get<GastosInfo[]>(this.resourceURL + "?id_fase=" + id_fase);
  }

  addGasto(gasto: NewGasto): Observable<NewGasto> {
    return this.http.post<NewGasto>(this.resourceURL, gasto, httpOptions);
  }

}
