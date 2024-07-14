import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inventario/:inventarioId',
    loadChildren: () =>
      import('./paginas/inventario/inventario.module').then(
        (m) => m.InventarioPageModule
      ),
  },
  {
    path: 'inventarios',
    loadChildren: () =>
      import('./paginas/inventarios/inventarios.module').then(
        (m) => m.InventariosPageModule
      ),
  },
  {
    path: 'producto/:productoId',
    loadChildren: () =>
      import('./paginas/producto/producto.module').then(
        (m) => m.ProductoPageModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./paginas/productos/productos.module').then(
        (m) => m.ProductosPageModule
      ),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./paginas/proveedores/proveedores.module').then(
        (m) => m.ProveedoresPageModule
      ),
  },
  {
    path: 'proveedor/:proveedorId',
    loadChildren: () =>
      import('./paginas/proveedor/proveedor.module').then(
        (m) => m.ProveedorPageModule
      ),
  },
  {
    path: 'usuario/:usuarioId',
    loadChildren: () =>
      import('./paginas/usuario/usuario.module').then(
        (m) => m.UsuarioPageModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./paginas/usuarios/usuarios.module').then(
        (m) => m.UsuariosPageModule
      ),
  },

  {
    path: 'inventariocant',
    loadChildren: () =>
      import('./paginas/inventariocant/inventariocant.module').then(
        (m) => m.InventariocantPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
