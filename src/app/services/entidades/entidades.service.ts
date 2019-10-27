import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { Entidad } from './entidad';
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
export class EntidadesService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/entidades'

  constructor(private http: HttpClient) {
    console.log("funcionando servico entidad");
  }

  addEntidad(entidad: Entidad): Observable<Entidad> {

    return this.http.post<Entidad>(this.resourceURL, entidad, httpOptions);

  }


}
