<?php
class productos_ctrl{

    public function listarProducto($f3){
        $cadenaSql = "";
        $cadenaSql = $cadenaSql." select * ";
        $cadenaSql = $cadenaSql."  FROM producto ";
        // $cadenaSql = $cadenaSql." where estado = 'A' ";

        $items = $f3->DB->exec($cadenaSql);
        echo json_encode(
            [
                'Mensaje' => count($items)>0? 'Operacion Exitosa ': 'No Hay regustro para la consulta',
                'cantidad' => count($items),
                'data' => $items
            ]
        );
    }

  

    public function getProductoID($f3){
        $producto_id = $f3->get('POST.productoID'); 
        if (empty($producto_id)) {
            echo json_encode(
                [
                    'Mensaje' => 'Error: El producto es requerido',
                    'cantidad' => 0,
                    'data' => []
                ]
            );
            exit; 
        }
        $cadenaSql = "";
        $cadenaSql = $cadenaSql." select * ";
        $cadenaSql = $cadenaSql."  FROM producto  ";
        $cadenaSql = $cadenaSql." where ProductoID = ". $producto_id . ";";

        $items = $f3->DB->exec($cadenaSql);
        echo json_encode(
            [
                'Mensaje' => count($items)>0? 'Se encontro el Producto ': 'No se encontro el Producto',
                'cantidad' => count($items),
                'data' => $items
            ]
        );
      
    }



    public function insertProducto($f3){
        $productoID = $f3->get('POST.productoID');
        $nombre = $f3->get('POST.nombre');
        $descripcion = $f3->get('POST.descripcion');
        $precio = $f3->get('POST.precio');
        $proveedorId = $f3->get('POST.proveedorId');
        
        // Construir la consulta SQL
        $cadenaSql = "INSERT INTO producto ( Nombre, Descripcion, Precio, ProveedorId) ";
        $cadenaSql .= "VALUES ('" . $nombre . "', '" . $descripcion . "', '" . $precio . "', '" . $proveedorId . "')";

        $result = $f3->DB->exec($cadenaSql);
        
        // Verificar el resultado
        if ($result !== false) {
            // La inserción fue exitosa
            echo json_encode(
                [
                'Mensaje' => 'Se guardo correctamente',

                ]
            );
        } else {
            // La inserción falló
            echo json_encode(
                [
                    'Mensaje' => 'Error al insertar Producto',
                ]
            );
        }
    }

    public function updateProducto($f3){
        $productoID = $f3->get('POST.productoID');
        $nombre = $f3->get('POST.nombre');
        $descripcion = $f3->get('POST.descripcion');
        $precio = $f3->get('POST.precio');
        $proveedorId = $f3->get('POST.proveedorId');
        
        // Construir la consulta SQL
        $cadenaSql = "UPDATE producto SET ";
        $cadenaSql .= "Nombre = '" . $nombre . "', ";
        $cadenaSql .= "Descripcion = '" . $descripcion . "', ";
        $cadenaSql .= "Precio = '" . $precio . "', ";
        $cadenaSql .= "ProveedorId = '" . $proveedorId . "' ";
        $cadenaSql .= "WHERE ProductoID = '" . $productoID . "'";
    
        // Ejecutar la consulta
        $result = $f3->DB->exec($cadenaSql);
        
        // Verificar el resultado
        if ($result !== false) {
            // La actualización fue exitosa
            echo json_encode([
                'Mensaje' => 'Se actualizo correctamente Producto'
            ]);
        } else {
            // La actualización falló
            echo json_encode([
                'Mensaje' => 'Error al actualizar Producto'
            ]);
        }
    }

    public function eliminarProducto($f3){
        // Obtener el ProductoID del formulario o de donde sea que lo estés recibiendo
        $productoID = $f3->get('POST.productoID');
        
        // Construir la consulta SQL para eliminar el producto
        $cadenaSql = "DELETE FROM producto WHERE ProductoID = '" . $productoID . "'";
        
        // Ejecutar la consulta
        $result = $f3->DB->exec($cadenaSql);
        
        // Verificar el resultado
        if ($result !== false) {
            // La eliminación fue exitosa
            echo json_encode([
                'Mensaje' => $cadenaSql
            ]);
        } else {
            // La eliminación falló
            echo json_encode([
                'Mensaje' => 'Error al eliminar Producto'
            ]);
        }

    }


}

?>


 