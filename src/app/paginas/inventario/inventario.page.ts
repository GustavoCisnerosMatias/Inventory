import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { InterfaceInventario } from 'src/app/interfaces/inventario.interface';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { GeneralService } from 'src/app/services/general.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productoSeleccionado: number = 0;
  listaProductos: IProducto[] = [];
  objInventario: InterfaceInventario = {
    InventarioID: 0,
    ProductoID: 0,
    Cantidad: 0,
    NombreProducto: '',
    FechaUltimaActualizacion: '',
    ubicacion: '',
  };
  id: number = 0;

  constructor(
    private servInventario: InventarioService,
    private servProducto: ProductosService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['inventarioId']
      ? this.router.snapshot.params['inventarioId']
      : 0;
    console.log(this.id);
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      this.funBuscarInventario();
    }
    this.getProductos();
    l.dismiss();
  }

  async getProductos() {
    let l = await this.loading.create();
    l.present();
    this.servProducto.getProductos().subscribe(
      (respuesta: any) => {
        this.listaProductos = respuesta.data;
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
    l.dismiss();
  }

  async funBuscarInventario() {
    this.servInventario
      .getInventarioxiD(this.id)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.objInventario = respuesta.data[0];
        console.log(this.objInventario);
      });
  }

  async guardarCambios() {
    let l = await this.loading.create();
    l.present();
    this.objInventario.FechaUltimaActualizacion = new Date().toISOString();
    this.servInventario.setInventario(this.objInventario).subscribe(
      (respuesta: any) => {
        l.dismiss();
        console.log(respuesta);
        this.servG.fun_Mensaje('Inventario guardado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        l.dismiss();
      }
    );

    this.servG.irA('inventarios');
  }

  backToInventarios() {
    this.servG.irA('inventarios');
  }
}
