import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
////////////////


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/login'

  constructor(private http: HttpClient) {
    console.log("funcionando servico login");
  }

  loginAction(username: string,password: string): Observable<Data[]> {
    
     return this.http.get<Data[]>(this.resourceURL + "?username=" + username+"&password="+password);
    
  }


}
