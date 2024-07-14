<?php
class proveedor_ctrl{
    public function listarProveedor($f3){
        $cadenaSql = "";
        $cadenaSql = $cadenaSql." select * ";
        $cadenaSql = $cadenaSql."  FROM proveedor ";
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

    public function getProveedorID($f3) {
        $proveedor_id = $f3->get('POST.ProveedorID');
        if (empty($proveedor_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El ProveedorID es requerido',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM proveedor WHERE ProveedorID = " . $proveedor_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el proveedor' : 'No se encontró el proveedor',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function insertProveedor($f3) {
        $nombre = $f3->get('POST.Nombre');
        $contacto = $f3->get('POST.Contacto');
        $telefono = $f3->get('POST.Telefono');
        $email = $f3->get('POST.Email');

        $cadenaSql = "INSERT INTO proveedor (Nombre, Contacto, Telefono, Email) VALUES ('" . $nombre . "', '" . $contacto . "', '" . $telefono . "', '" . $email . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se guardó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al insertar proveedor']);
        }
    }

    public function updateProveedor($f3) {
        $proveedorID = $f3->get('POST.ProveedorID');
        $nombre = $f3->get('POST.Nombre');
        $contacto = $f3->get('POST.Contacto');
        $telefono = $f3->get('POST.Telefono');
        $email = $f3->get('POST.Email');

        $cadenaSql = "UPDATE proveedor SET Nombre = '" . $nombre . "', Contacto = '" . $contacto . "', Telefono = '" . $telefono . "', Email = '" . $email . "' WHERE ProveedorID = '" . $proveedorID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se actualizó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al actualizar proveedor']);
        }
    }

    public function eliminarProveedor($f3) {
        $proveedorID = $f3->get('POST.ProveedorID');
        $cadenaSql = "DELETE FROM proveedor WHERE ProveedorID = '" . $proveedorID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se eliminó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al eliminar proveedor']);
        }
    }

}
?>