<?php
class usuario_ctrl {
    public function login($f3) {
        $usuario = $f3->get('POST.Usuario');
        $password = $f3->get('POST.Password');

        if (empty($usuario)) {
            echo json_encode([
                'Mensaje' => 'Error: El Usuario es requerido',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        if (empty($password)) {
            echo json_encode([
                'Mensaje' => 'Error: La contraseña es requerida',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = "SELECT `UsuarioID`, `Nombre`, `usuario`, `password`, `Admin` FROM `usuario`";
        $cadenaSql .= " WHERE  usuario = '".$usuario;
        $cadenaSql .= "' AND  password = '".$password."';";


        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se inicio Sesion' : 'Credenciales erroneas',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }
    public function listarUsuarios($f3) {
        $cadenaSql = "SELECT * FROM usuario";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function getUsuarioID($f3) {
        $usuario_id = $f3->get('POST.UsuarioID');
        if (empty($usuario_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El UsuarioID es requerido',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM usuario WHERE UsuarioID = " . $usuario_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el usuario' : 'No se encontró el usuario',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function insertUsuario($f3) {
        $nombre = $f3->get('POST.Nombre');
        $usuario = $f3->get('POST.usuario');
        $password = $f3->get('POST.password');
        $admin = $f3->get('POST.Admin');

        $cadenaSql = "INSERT INTO usuario (Nombre, usuario, password, Admin) VALUES ('" . $nombre . "', '" . $usuario . "', '" . $password . "', '" . $admin . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se guardó correctamente']);
        } else {
            echo json_encode(['Mensaje' => $cadenaSql]);
        }
    }

    public function updateUsuario($f3) {
        $usuarioID = $f3->get('POST.UsuarioID');
        $nombre = $f3->get('POST.Nombre');
        $usuario = $f3->get('POST.usuario');
        $password = $f3->get('POST.password');
        $admin = $f3->get('POST.Admin');

        $cadenaSql = "UPDATE usuario SET Nombre = '" . $nombre . "', usuario = '" . $usuario . "', password = '" . $password . "', Admin = '" . $admin . "' WHERE UsuarioID = '" . $usuarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se actualizó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al actualizar usuario']);
        }
    }

    public function eliminarUsuario($f3) {
        $usuarioID = $f3->get('POST.UsuarioID');
        $cadenaSql = "DELETE FROM usuario WHERE UsuarioID = '" . $usuarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se eliminó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al eliminar usuario']);
        }
    }
}
?>
