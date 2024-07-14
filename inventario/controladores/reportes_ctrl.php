<?php
class reportes_ctrl{

    public function listarReportes($f3) {
        $cadenaSql = "SELECT * FROM reportes";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function getReporteID($f3) {
        $reporte_id = $f3->get('POST.ReporteID');
        if (empty($reporte_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El ReporteID es requerido',
                'cantidad' => 0,
                'data' => []
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM reportes WHERE ReporteID = " . $reporte_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el reporte' : 'No se encontró el reporte',
            'cantidad' => count($items),
            'data' => $items
        ]);
    }

    public function insertReporte($f3) {
        $descripcion = $f3->get('POST.Descripcion');
        $fechaReporte = $f3->get('POST.FechaReporte');
        $tipoReporte = $f3->get('POST.TipoReporte');

        $cadenaSql = "INSERT INTO reportes (Descripcion, FechaReporte, TipoReporte) VALUES ('" . $descripcion . "', '" . $fechaReporte . "', '" . $tipoReporte . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se guardó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al insertar reporte']);
        }
    }

    public function updateReporte($f3) {
        $reporteID = $f3->get('POST.ReporteID');
        $descripcion = $f3->get('POST.Descripcion');
        $fechaReporte = $f3->get('POST.FechaReporte');
        $tipoReporte = $f3->get('POST.TipoReporte');

        $cadenaSql = "UPDATE reportes SET Descripcion = '" . $descripcion . "', FechaReporte = '" . $fechaReporte . "', TipoReporte = '" . $tipoReporte . "' WHERE ReporteID = '" . $reporteID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se actualizó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al actualizar reporte']);
        }
    }

    public function eliminarReporte($f3) {
        $reporteID = $f3->get('POST.ReporteID');
        $cadenaSql = "DELETE FROM reportes WHERE ReporteID = '" . $reporteID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode(['Mensaje' => 'Se eliminó correctamente']);
        } else {
            echo json_encode(['Mensaje' => 'Error al eliminar reporte']);
        }
    }



}
?>