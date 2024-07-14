import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { InterfaceInventario } from '../interfaces/inventario.interface';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getInventario() {
    let url = this.servg.URLAPI + 'listarInventario';
    return this.http.get(url);
  }
  getInventarioxiD(id: number) {
    let url = this.servg.URLAPI + 'getInventarioID';
    let data = this.servg.objectToFormData({
      InventarioID: id,
    });
    return this.http.post(url, data);
  }
  getInventarioCant(cant: number) {
    let url = this.servg.URLAPI + 'getInventarioBajo';
    let data = this.servg.objectToFormData({
      Cant: cant,
    });
    return this.http.post(url, data);
  }
  setInventario(objInventario: InterfaceInventario) {
    let url = '';
    console.log(objInventario.InventarioID);
    if (objInventario.InventarioID > 0) {
      url = this.servg.URLAPI + 'updateInventario';
    } else {
      url = this.servg.URLAPI + 'insertInventario';
    }
    let data = this.servg.objectToFormData({
      InventarioID: objInventario.InventarioID,
      ProductoID: objInventario.ProductoID,
      Cantidad: objInventario.Cantidad,
      FechaUltimaActualizacion: objInventario.FechaUltimaActualizacion,
      ubicacion: objInventario.ubicacion,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar :', error);
        return throwError(error);
      })
    );
  }
  deleteInventario(id: number) {
    let url = this.servg.URLAPI + 'eliminarInventario';
    let data = this.servg.objectToFormData({
      InventarioID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', error);
        return throwError(error);
      })
    );
  }
}
