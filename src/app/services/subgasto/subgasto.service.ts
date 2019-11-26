import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { subGastoInfo } from './subgastoinfo';
import { subGastoConfirm } from './subgastoconfirm';

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
export class SubgastoService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/subgastos'

  constructor(private http: HttpClient) {
    console.log("funcionando servico subgastos");
  }


  getAllSubgastos(id_Gasto: Number): Observable<subGastoInfo[]> {
    return this.http.get<subGastoInfo[]>(this.resourceURL + "?id_gasto=" + id_Gasto);
  }

  updateSubgasto(check: subGastoConfirm): Observable<subGastoConfirm> {
    return this.http.put<subGastoConfirm>(this.resourceURL, check, httpOptions)
  }

}
