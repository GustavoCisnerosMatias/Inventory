import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { IProveedor } from 'src/app/interfaces/proveedor.interface';
import { GeneralService } from 'src/app/services/general.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {
  listaProveedores: IProveedor[] = [];
  proveedoresFiltrados: IProveedor[] = [];
  filtroNombre: string = '';

  constructor(
    public servG: GeneralService,
    private servP: ProveedorService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarProveedores();
  }

  ionViewWillEnter() {
    this.cargarProveedores();
  }

  async cargarProveedores() {
    let l = await this.loading.create();
    l.present();
    this.servP.getProveedores().subscribe(
      (respuesta: any) => {
        this.listaProveedores = respuesta.data;
        this.proveedoresFiltrados = this.listaProveedores;
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
  }

  filtrarProveedores() {
    this.proveedoresFiltrados = this.listaProveedores.filter((proveedor) =>
      proveedor.Nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  funEditar(item: IProveedor, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servG.irA('/proveedor/' + item.ProveedorID);
  }

  async funEliminar(item: IProveedor, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servP.deleteProveedor(item.ProveedorID).subscribe(
      (respuesta: any) => {
        this.cargarProveedores();
        this.servG.fun_Mensaje('Proveedor eliminado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar el proveedor: ' + error);
      }
    );
  }
}
