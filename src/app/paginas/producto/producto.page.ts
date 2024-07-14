import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { IProveedor } from 'src/app/interfaces/proveedor.interface';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  proveedorSeleccionado: number = 0;
  listaProveedores: IProveedor[] = [];
  objProducto: IProducto = {
    ProductoID: 0,
    ProveedorId: 0,
    Descripcion: '',
    Nombre: '',
    Precio: 0,
  };
  id: number = 0;
  constructor(
    private servP: ProductosService,
    private servProveedor: ProveedorService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['productoId']
      ? this.router.snapshot.params['productoId']
      : 0;
    console.log(this.id);
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      this.funBuscarProducto();
    }
    this.getProveedores();
    l.dismiss();
  }

  async getProveedores() {
    let l = await this.loading.create();
    l.present();
    this.servProveedor.getProveedores().subscribe(
      (respuesta: any) => {
        this.listaProveedores = respuesta.data;
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
    l.dismiss();
  }
  async funBuscarProducto() {
    this.servP.getProductoxiD(this.id).subscribe((respuesta: any) => {
      console.log(respuesta);
      this.objProducto = respuesta.data[0];
      console.log(this.objProducto);
    });
  }
  async guardarCambios() {
    let l = await this.loading.create();
    l.present();
    // this.servP.setProducto(this.objProducto);
    this.servP.setProducto(this.objProducto).subscribe(
      (respuesta: any) => {
        l.dismiss();
        console.log(respuesta);
        this.servG.fun_Mensaje('Producto guardado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        l.dismiss();
      }
    );

    this.servG.irA('productos');
  }
  backToProductos() {
    this.servG.irA('productos');
  }
}
