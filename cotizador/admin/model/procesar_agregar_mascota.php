<?php
// Incluir el archivo de conexión a la base de datos
require_once "../../db.php";

// Definir la función para insertar la nueva mascota en la base de datos
function insertarMascota($nombre, $raza, $edad, $tamanio, $usuario_id) {
    global $conn; // Acceder a la conexión establecida en db.php

    // Realizar las validaciones necesarias y asegurar los datos ingresados

    // Insertar los datos en la tabla de mascotas
    $query = "INSERT INTO mascotas (nombre, raza, edad, tamanio, usuario_id) VALUES ('$nombre', '$raza', $edad, '$tamanio', $usuario_id)";

    if (mysqli_query($conn, $query)) {
        // Redireccionar al usuario nuevamente a la página de administración de mascotas
        header("Location: ../views/mascotas.php");
        exit;
    } else {
        echo "Error al insertar la mascota: " . mysqli_error($conn);
    }
}

// Procesar el formulario cuando se envíe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores enviados por el usuario
    $nombre = $_POST["nombre"];
    $raza = $_POST["raza"];
    $edad = $_POST["edad"];
    $tamanio = $_POST["tamanio"];
    $usuario_id = $_POST["usuario_id"];

    // Llamar a la función para insertar la mascota en la base de datos
    insertarMascota($nombre, $raza, $edad, $tamanio, $usuario_id);
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>
