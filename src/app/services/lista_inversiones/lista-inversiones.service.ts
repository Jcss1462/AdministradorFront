import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { EnlaceII } from './enlaceII';
import { InversionInfo } from './inversionInfo';
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
export class ListaInversionesService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/listaInversiones'

  constructor(private http: HttpClient) {
    console.log("funcionando servico lista inversiones");
  }

  enlazarInversiones(enlace: EnlaceII): Observable<EnlaceII> {
    return this.http.post<EnlaceII>(this.resourceURL, enlace, httpOptions);
  }

  
  getMyInversiones(id_usuario: Number): Observable<InversionInfo[]> {
    return this.http.get<InversionInfo[]>(this.resourceURL + "?id_usuario=" + id_usuario);
  }
  
}
