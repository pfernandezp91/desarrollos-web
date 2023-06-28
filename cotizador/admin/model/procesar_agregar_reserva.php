<?php
// Incluir el archivo de conexión a la base de datos
require_once "../../db.php";

// Definir la función para insertar la nueva reserva en la base de datos
function insertarReserva($usuario_id, $mascota_id, $origen, $destino, $fecha_hora, $status) {
    global $conn; // Acceder a la conexión establecida en db.php

    // Insertar los datos en la tabla de reservas
    $query = "INSERT INTO reservas (usuario_id, mascota_id, origen, destino, fecha_hora, status) VALUES ($usuario_id, $mascota_id, '$origen', '$destino', '$fecha_hora', $status)";

    if (mysqli_query($conn, $query)) {
        // Redireccionar al usuario nuevamente a la página de confirmación de reserva
        header("Location: ../views/");
        exit;
    } else {
        echo "Error al insertar la reserva: " . mysqli_error($conn);
    }
}

// Procesar el formulario cuando se envíe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores enviados por el usuario
    $usuario_id = $_POST["usuario_id"];
    $mascota_id = $_POST["mascota_id"];
    $origen = $_POST["origen"];
    $destino = $_POST["destino"];
    $fecha_hora = date('Y-m-d H:i:s');
    $status = $_POST["status"];

    // Llamar a la función para insertar la reserva en la base de datos
    insertarReserva($usuario_id, $mascota_id, $origen, $destino, $fecha_hora, $status);
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>
