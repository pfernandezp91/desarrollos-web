<?php
// Incluir el archivo de conexión a la base de datos
require_once "../../db.php";

// Definir la función para editar un registro de mascota en la base de datos
function editarMascota($id, $nombre, $raza, $edad) {
    global $conn; // Acceder a la conexión establecida en db.php

    // Realizar las validaciones necesarias y asegurar los datos ingresados

    // Actualizar los datos en la tabla de mascotas
    $query = "UPDATE mascotas SET nombre='$nombre', raza='$raza', edad=$edad WHERE id=$id";

    if (mysqli_query($conn, $query)) {
        // Redireccionar al usuario nuevamente a la página de administración de mascotas
        header("Location: ../views/admin_mascotas.php");
        exit;
    } else {
        echo "Error al editar la mascota: " . mysqli_error($conn);
    }
}

// Procesar el formulario cuando se envíe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores enviados por el usuario
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $raza = $_POST["raza"];
    $edad = $_POST["edad"];

    // Llamar a la función para editar el registro de mascota en la base de datos
    editarMascota($id, $nombre, $raza, $edad);
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>
