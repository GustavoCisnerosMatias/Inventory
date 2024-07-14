import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InterfaceInventario } from 'src/app/interfaces/inventario.interface';
import { GeneralService } from 'src/app/services/general.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventariocant',
  templateUrl: './inventariocant.page.html',
  styleUrls: ['./inventariocant.page.scss'],
})
export class InventariocantPage implements OnInit {
  filtroNombre: string = '';
  listaInventario: InterfaceInventario[] = [];
  cantidad: number = 0;
  constructor(
    private http: HttpClient,
    public servG: GeneralService,
    private servInv: InventarioService,

    private loading: LoadingController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {}
  async cargarInventario() {
    let l = await this.loading.create();
    l.present();
    this.servInv.getInventarioCant(this.cantidad).subscribe(
      (respuesta: any) => {
        this.listaInventario = respuesta.data;
        console.log(respuesta);
        this.servG.fun_Mensaje(JSON.stringify(respuesta.Mensaje));
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje(
          'Error al cargar los datos : ' + JSON.stringify(error)
        );
      }
    );
  }
  buscarPorCantidad() {
    this.cargarInventario();
  }
}
