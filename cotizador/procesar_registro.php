<?php
// Incluir el archivo de conexión a la base de datos
require_once "db.php";

// Procesar el formulario cuando se envíe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores enviados por el usuario
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $contrasena = $_POST["contrasena"];

    // Realizar las validaciones necesarias (puedes agregar más según tus requisitos)
    if (empty($nombre) || empty($email) || empty($contrasena)) {
        // Al menos uno de los campos está vacío
        echo "Por favor, completa todos los campos.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // El formato del correo electrónico es inválido
        echo "El correo electrónico ingresado no es válido.";
    } else {
        // Todos los datos son válidos, almacenar en la base de datos

        // Escapar los valores para evitar problemas de seguridad
        $nombre = mysqli_real_escape_string($conn, $nombre);
        $email = mysqli_real_escape_string($conn, $email);
        $contrasena = mysqli_real_escape_string($conn, $contrasena);

        // Insertar los datos en la tabla de usuarios
        $query = "INSERT INTO usuarios (nombre, email, contrasena) VALUES ('$nombre', '$email', '$contrasena')";

        if (mysqli_query($conn, $query)) {
            // Redireccionar al usuario a la ruta "admin"
            header("Location: admin");
            exit; // Importante: asegúrate de agregar la instrucción exit para detener la ejecución posterior del código
        } else {
            echo "Error al registrar el usuario: " . mysqli_error($conn);
        }
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>