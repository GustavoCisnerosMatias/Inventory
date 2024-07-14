import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IProveedor } from 'src/app/interfaces/proveedor.interface';
import { GeneralService } from 'src/app/services/general.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit {
  objProveedor: IProveedor = {
    ProveedorID: 0,
    Nombre: '',
    Contacto: '',
    Telefono: '',
    Email: '',
  };
  id: number = 0;

  constructor(
    private servP: ProveedorService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['proveedorId']
      ? this.router.snapshot.params['proveedorId']
      : 0;
    console.log(this.id);
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      this.funBuscarProveedor();
    }
    l.dismiss();
  }

  async funBuscarProveedor() {
    this.servP.getProveedorxID(this.id).subscribe((respuesta: any) => {
      this.objProveedor = respuesta.data[0];
    });
  }

  async guardarCambios() {
    let l = await this.loading.create();
    l.present();
    this.servP.setProveedor(this.objProveedor).subscribe(
      (respuesta: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Proveedor guardado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        l.dismiss();
      }
    );
    this.servG.irA('proveedores');
  }

  backToProveedores() {
    this.servG.irA('proveedores');
  }
}
