// INSERT INTO `producto`(`ProductoID`, `Nombre`, `Descripcion`, `Precio`, `ProveedorId`)

export interface IProducto {
  ProductoID: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  ProveedorId: number;
}
