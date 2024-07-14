import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  listaProductos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];
  filtroNombre: string = '';
  constructor(
    public servG: GeneralService,
    private servP: ProductosService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }
  ionViewWillEnter() {
    this.cargarProductos();
  }

  async cargarProductos() {
    let l = await this.loading.create();
    l.present();
    this.servP.getProductos().subscribe(
      (respuesta: any) => {
        this.listaProductos = respuesta.data;
        console.log(this.listaProductos);
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
  }
  filtrarProductos() {
    this.productosFiltrados = this.listaProductos.filter((producto) =>
      producto.Nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  funEditar(item: IProducto, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servG.irA('/producto/' + item.ProductoID);
  }

  funEliminarr(item: IProducto, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servP.deleteProducto(item.ProductoID).subscribe(
      (respuesta: any) => {
        this.listaProductos = this.listaProductos.filter(
          (producto) => producto.ProductoID !== item.ProductoID
        );
        this.servG.fun_Mensaje('Producto eliminado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar el producto: ' + error);
      }
    );
  }
}
