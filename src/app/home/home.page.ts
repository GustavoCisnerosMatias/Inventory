import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IUsuario } from '../interfaces/usuario.interface';
import { GeneralService } from '../services/general.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaUsuarios: IUsuario[] = [];
  user = '';
  pass = '';
  admin = '0';

  constructor(
    public servG: GeneralService,
    private servU: UsuarioService,
    private loading: LoadingController
  ) {}

  async cargarUsuarios() {
    let l = await this.loading.create();
    l.present();
    this.servU.login(this.user, this.pass).subscribe(
      (respuesta: any) => {
        if (respuesta.data.length > 0) {
          this.admin = respuesta.data[0].Admin;
        } else {
          this.admin = '0'; // Asigna un valor por defecto en caso de que no haya datos válidos
        }
        this.listaUsuarios = respuesta.data;
        this.servG.fun_Mensaje(respuesta.Mensaje);
        console.log(respuesta);

        l.dismiss();
      },
      (error: any) => {
        l.dismiss();

        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
    l.dismiss();
  }
  cerrarSesion() {
    console.log(this.admin);
    this.admin = '0';
    this.user = ''; // Limpia el usuario y contraseña
    this.pass = '';
    this.listaUsuarios = []; // Limpia la lista de usuarios cargados
  }
}
