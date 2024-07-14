import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IProveedor } from '../interfaces/proveedor.interface';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getProveedores() {
    const url = this.servg.URLAPI + 'listarProveedor';
    return this.http.get(url);
  }

  getProveedorxID(id: number) {
    const url = this.servg.URLAPI + 'getProveedorID';
    const data = this.servg.objectToFormData({
      ProveedorID: id,
    });
    return this.http.post(url, data);
  }

  setProveedor(objProveedor: IProveedor) {
    let url = '';
    if (objProveedor.ProveedorID > 0) {
      url = this.servg.URLAPI + 'updateProveedor';
    } else {
      url = this.servg.URLAPI + 'insertProveedor';
    }
    const data = this.servg.objectToFormData({
      ProveedorID: objProveedor.ProveedorID,
      Nombre: objProveedor.Nombre,
      Contacto: objProveedor.Contacto,
      Telefono: objProveedor.Telefono,
      Email: objProveedor.Email,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteProveedor(id: number) {
    const url = this.servg.URLAPI + 'eliminarProveedor';
    const data = this.servg.objectToFormData({
      ProveedorID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', error);
        return throwError(error);
      })
    );
  }
}
