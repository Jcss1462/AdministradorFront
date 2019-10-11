import { Injectable } from '@angular/core';


//conexion con la base de datos
import { Usserinfo } from './usserinfo';
import { Usserdata } from './usserdata';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})
export class UssersService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/usser'

  constructor(private http: HttpClient) {
    console.log("funcionando servico usuario");
  }



  addUsser(usser: Usserinfo): Observable<Usserinfo> {

    return this.http.post<Usserinfo>(this.resourceURL, usser, httpOptions)

  }


  getData(usser: Number): Observable<Usserdata[]> {

    return this.http.get<Usserdata[]>(this.resourceURL + "?id_usuario=" +usser);

  }


}
