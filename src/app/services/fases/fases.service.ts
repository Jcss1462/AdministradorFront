import { Injectable } from '@angular/core';


//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { Fasesinfo } from './fasesInfo';
import { NewFase } from './newFase';
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
export class FasesService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/fases'

  constructor(private http: HttpClient) {
    console.log("funcionando servico fases");
  }

  getAllfases(id_proyecto: Number): Observable<Fasesinfo[]> {
    return this.http.get<Fasesinfo[]>(this.resourceURL + "?id_proyecto=" + id_proyecto);
  }

  addFase(fase: NewFase): Observable<NewFase> {
    return this.http.post<NewFase>(this.resourceURL, fase, httpOptions);
  }

  getNameFase(id: Number): Observable<Fasesinfo> {

    return this.http.get<Fasesinfo>(this.resourceURL+"?razon=nombre"+"&id_fases="+id);

  }


}
