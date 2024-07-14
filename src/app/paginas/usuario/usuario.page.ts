import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GeneralService } from 'src/app/services/general.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  objUsuario: IUsuario = {
    UsuarioID: 0,
    Nombre: '',
    usuario: '',
    password: '',
    Admin: '2',
  };
  toggleValue: boolean = this.objUsuario.Admin === '1';
  id: number = 0;

  constructor(
    private servU: UsuarioService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['usuarioId']
      ? this.router.snapshot.params['usuarioId']
      : 0;
    console.log(this.id);
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      this.funBuscarUsuario();
    }
    if (this.objUsuario.Admin === '1') {
      this.toggleValue = true;
    }
    l.dismiss();
  }
  async ionViewWillEnter() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      await this.funBuscarUsuario();
    }

    l.dismiss();
    console.log(this.objUsuario);
    if (this.objUsuario.Admin === '1') {
      this.toggleValue = true;
    }
  }

  async funBuscarUsuario() {
    this.servU.getUsuarioxID(this.id).subscribe((respuesta: any) => {
      this.objUsuario = respuesta.data[0];
      console.log(this.objUsuario);
      if (this.objUsuario.Admin === '1') {
        this.toggleValue = true;
      }
    });
  }

  async guardarCambios() {
    if (this.toggleValue) {
      this.objUsuario.Admin = '1';
    } else {
      this.objUsuario.Admin = '2';
    }
    console.log(this.objUsuario);
    let l = await this.loading.create();
    l.present();
    this.servU.setUsuario(this.objUsuario).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        l.dismiss();
        this.servG.fun_Mensaje('Usuario guardado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        console.log(error);
        l.dismiss();
      }
    );
    this.backToUsuarios();
  }

  backToUsuarios() {
    this.servG.irA('usuarios');
  }
  toggleAdmin(event: any) {
    console.log(event.detail.checked);
    // this.objUsuario.Admin = event.detail.checked ? 1 : 2;
  }
}
