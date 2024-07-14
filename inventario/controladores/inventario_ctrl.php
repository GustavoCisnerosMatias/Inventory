<?php
class inventario_ctrl{
    public function listarInventario($f3){
        $cadenaSql = "";
        $cadenaSql = $cadenaSql." SELECT i.InventarioID, i.ProductoID, p.Nombre AS NombreProducto, i.Cantidad, i.FechaUltimaActualizacion, i.ubicacion FROM inventario i JOIN producto p ON i.ProductoID = p.ProductoID; ";


        $items = $f3->DB->exec($cadenaSql);
        echo json_encode(
            [
                'Mensaje' => count($items)>0? 'Operacion Exitosa ': 'No Hay regustro para la consulta',
                'cantidad' => count($items),
                'data' => $items
            ]
        );
    }


    public function getInventarioID($f3) {
        $inventario_id = $f3->get('POST.InventarioID');
        if (empty($inventario_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El inventarioID es requerido',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM inventario WHERE InventarioID = " . $inventario_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el inventario' : 'No se encontró el inventario',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }
    public function getInventarioBajo($f3) {
        $cant = $f3->get('POST.Cant');
        if (empty($cant)) {
            echo json_encode([
                'Mensaje' => 'Error: Ingrese la Cantidad',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = " SELECT i.InventarioID, i.ProductoID, p.Nombre AS NombreProducto, i.Cantidad, i.FechaUltimaActualizacion, i.ubicacion ";
        $cadenaSql .= " FROM inventario i JOIN producto p ON i.ProductoID = p.ProductoID ";
        $cadenaSql .= " WHERE i.Cantidad < " . $cant . "";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            // 'Mensaje' =>$cadenaSql,
            'Mensaje' => count($items) > 0 ? 'Se encontro los datos' : 'No se encontró con la cantidad indicada',

            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function insertInventario($f3) {
        $productoID = $f3->get('POST.ProductoID');
        $cantidad = $f3->get('POST.Cantidad');
        $fechaUltimaActualizacion = $f3->get('POST.FechaUltimaActualizacion');
        $ubicacion = $f3->get('POST.ubicacion');

        $cadenaSql = "INSERT INTO inventario (ProductoID, Cantidad, FechaUltimaActualizacion, ubicacion) VALUES ('" . $productoID . "', '" . $cantidad . "', '" . $fechaUltimaActualizacion . "', '" . $ubicacion . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se guardó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al insertar inventario']);
        }
    }

    public function updateInventario($f3) {
        $inventarioID = $f3->get('POST.InventarioID');
        $productoID = $f3->get('POST.ProductoID');
        $cantidad = $f3->get('POST.Cantidad');
        $fechaUltimaActualizacion = $f3->get('POST.FechaUltimaActualizacion');
        $ubicacion = $f3->get('POST.ubicacion');

        $cadenaSql = "UPDATE inventario SET ProductoID = '" . $productoID . "', Cantidad = '" . $cantidad . "', FechaUltimaActualizacion = '" . $fechaUltimaActualizacion . "', ubicacion = '" . $ubicacion . "' WHERE InventarioID = '" . $inventarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se actualizó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al actualizar inventario']);
        }
    }

    public function eliminarInventario($f3) {
        $inventarioID = $f3->get('POST.InventarioID');
        $cadenaSql = "DELETE FROM inventario WHERE InventarioID = '" . $inventarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            // echo json_encode(['Mensaje' => 'Se eliminó correctamente']);
            echo json_encode([
                'Mensaje' => $cadenaSql
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error al eliminar inventario']);
        }
    }
}
?>