import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Traent } from './traent';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorEntidadService {

   //conecto con el elmento json del link
   resourceURL = 'http://localhost:3000/api/trabajadorentidades'

   constructor(private http: HttpClient) {
     console.log("funcionando servico trabajador entidad");
   }
 
   getEntidades(id_usuario: Number): Observable<Traent[]> {
     
      return this.http.get<Traent[]>(this.resourceURL + "?id_usuario="+id_usuario);
     
   }
}
