import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IProducto } from '../interfaces/producto.interface';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getProductos() {
    let url = this.servg.URLAPI + 'listarProducto';
    return this.http.get(url);
  }

  getProductoxiD(id: number) {
    let url = this.servg.URLAPI + 'getProductoID';
    let data = this.servg.objectToFormData({
      productoID: id,
    });
    return this.http.post(url, data);
  }
  setProducto(objProducto: IProducto) {
    let url = '';
    console.log(objProducto);
    if (objProducto.ProductoID > 0) {
      url = this.servg.URLAPI + 'updateProducto';
    } else {
      url = this.servg.URLAPI + 'insertProducto';
    }
    let data = this.servg.objectToFormData({
      productoID: objProducto.ProductoID,
      nombre: objProducto.Nombre,
      descripcion: objProducto.Descripcion,
      precio: objProducto.Precio,
      proveedorId: objProducto.ProveedorId,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar el Producto:', error);
        return throwError(error);
      })
    );
  }
  deleteProducto(id: number) {
    let url = this.servg.URLAPI + 'eliminarProducto';
    let data = this.servg.objectToFormData({
      productoID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje(
          'Ocurrió un error al eliminar el Producto:',
          error
        );
        return throwError(error);
      })
    );
  }
}
