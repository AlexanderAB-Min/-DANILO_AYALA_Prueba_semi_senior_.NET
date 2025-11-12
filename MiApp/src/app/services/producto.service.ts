import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; // Ajusta si es necesario
import { ResponseProducto } from '../interfaces/ResponseProducto'; // Ajusta si es necesario
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/Producto'; // Cambia de './Producto' a '../interfaces/Producto'

@Injectable({
     providedIn: 'root'
})
export class ProductoService {
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;
     constructor() { }
     
     lista() : Observable<ResponseProducto>{
          return this.http.get<ResponseProducto>(`${this.baseUrl}Producto/Lista`);
     }

     crear(request: Producto): Observable<any> {
          return this.http.post<any>(`${this.baseUrl}Producto/Crear`, request);
     }

     editar(id: number, request: Producto): Observable<any> {
          return this.http.put<any>(`${this.baseUrl}Producto/Editar/${id}`, request);
     }

     eliminar(id: number): Observable<any> {
          return this.http.delete<any>(`${this.baseUrl}Producto/Eliminar/${id}`);
     }
}