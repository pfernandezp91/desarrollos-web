<?php
    // Configuración de la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "transportes";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Error en la conexión: " . $conn->connect_error);
    }
?>
