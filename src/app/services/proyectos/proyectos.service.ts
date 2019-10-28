import { Injectable } from '@angular/core';

//conexion con la base de datos
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



import { ProyectosInfo } from './proyectsInfo';
import { NuevoProyecto } from './nuevoProyecto';
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
export class ProyectosService {

  //conecto con el elmento json del link
  resourceURL = 'http://localhost:3000/api/proyectos'

  constructor(private http: HttpClient) { 
    console.log("funcionando servicio proyectos");
  }

  getAllProyects(id_sucursal: Number): Observable<ProyectosInfo[]> {
    return this.http.get<ProyectosInfo[]>(this.resourceURL + "?id_sucursal=" + id_sucursal);
  }

  addProyecto(proyecto: NuevoProyecto): Observable<NuevoProyecto> {
    return this.http.post<NuevoProyecto>(this.resourceURL, proyecto, httpOptions);
  }

  getNameProyecto(id: Number): Observable<ProyectosInfo> {

    return this.http.get<ProyectosInfo>(this.resourceURL+"?razon=nombre"+"&id_proyecto="+id);

  }
}
