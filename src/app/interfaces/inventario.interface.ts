// (`InventarioID`, `ProductoID`, `Cantidad`, `FechaUltimaActualizacion`, `ubicacion`)

export interface InterfaceInventario {
  InventarioID: number;
  ProductoID: number;
  NombreProducto: string;
  Cantidad: number;
  FechaUltimaActualizacion: string;
  ubicacion: string;
}
// SELECT i.InventarioID, i.ProductoID, p.Nombre AS NombreProducto, i.Cantidad, i.FechaUltimaActualizacion, i.ubicacion FROM inventario i JOIN producto p ON i.ProductoID = p.ProductoID WHERE i.Cantidad < 10 ORDER BY i.Cantidad ASC;
