import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/recuperar'

  constructor(private http: HttpClient) {
    console.log("funcionando servico recuperacion");
  }


  recuperacion(email: string): Observable<Email[]> {
    
    return this.http.get<Email[]>(this.resourceURL + "?email=" + email);
   
 }

}
