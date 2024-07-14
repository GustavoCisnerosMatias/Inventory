import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { InterfaceInventario } from 'src/app/interfaces/inventario.interface';
import { GeneralService } from 'src/app/services/general.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.page.html',
  styleUrls: ['./inventarios.page.scss'],
})
export class InventariosPage implements OnInit {
  filtroNombre: string = '';
  listaInventario: InterfaceInventario[] = [];
  InventarioFiltrados: InterfaceInventario[] = [];
  constructor(
    private http: HttpClient,
    public servG: GeneralService,
    private servInv: InventarioService,

    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarInventario();
  }
  ionViewWillEnter() {
    this.cargarInventario();
  }
  async cargarInventario() {
    let l = await this.loading.create();
    l.present();
    this.servInv.getInventario().subscribe(
      (respuesta: any) => {
        this.listaInventario = respuesta.data;
        console.log(this.listaInventario);
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
  }
  filtrarNombre() {
    this.InventarioFiltrados = this.listaInventario.filter((inventario) =>
      inventario.NombreProducto.toLowerCase().includes(
        this.filtroNombre.toLowerCase()
      )
    );
  }

  funEditar(item: InterfaceInventario, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servG.irA('/inventario/' + item.InventarioID);
  }

  async funEliminarr(
    item: InterfaceInventario,
    ionItemSliding: IonItemSliding
  ) {
    ionItemSliding.close();
    this.servInv.deleteInventario(item.InventarioID).subscribe(
      (respuesta: any) => {
        this.cargarInventario();
        this.servG.fun_Mensaje('Producto eliminado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar el producto: ' + error);
      }
    );
  }
}
