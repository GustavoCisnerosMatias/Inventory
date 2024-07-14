import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getUsuarios() {
    const url = this.servg.URLAPI + 'listarUsuarios';
    return this.http.get(url);
  }
  login(user: string, pass: string) {
    const url = this.servg.URLAPI + 'login';
    const data = this.servg.objectToFormData({
      Usuario: user,
      Password: pass,
    });
    return this.http.post(url, data);
  }

  getUsuarioxID(id: number) {
    const url = this.servg.URLAPI + 'getUsuarioID';
    const data = this.servg.objectToFormData({
      UsuarioID: id,
    });
    return this.http.post(url, data);
  }

  setUsuario(objUsuario: IUsuario) {
    let url = '';
    if (objUsuario.UsuarioID > 0) {
      url = this.servg.URLAPI + 'updateUsuario';
    } else {
      url = this.servg.URLAPI + 'insertUsuario';
    }
    const data = this.servg.objectToFormData({
      UsuarioID: objUsuario.UsuarioID,
      Nombre: objUsuario.Nombre,
      usuario: objUsuario.usuario,
      password: objUsuario.password,
      Admin: objUsuario.Admin,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteUsuario(id: number) {
    const url = this.servg.URLAPI + 'eliminarUsuario';
    const data = this.servg.objectToFormData({
      UsuarioID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', error);
        return throwError(error);
      })
    );
  }
}
