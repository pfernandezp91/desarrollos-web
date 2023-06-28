<!DOCTYPE html>
<html>
<head>
  <title>Listado de Mascotas</title>
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .sidebar {
      background-color: #f2f2f2;
      padding: 20px;
    }

    .main-content {
      padding: 20px;
    }
  </style>
</head>
<body>
  <h2>
  <?php
        echo "¡Bienvenido!";
    ?>
  </h2>

  <div class="grid-container">
    <div class="sidebar">
      <h3>Mi menú</h3>
      <ul>
        <li><a href="./">Inicio</a></li>
        <li><a href="mascotas.php">Mis mascotas</a></li>
        <li><a href="mis_viajes.php">Mis viajes</a></li>
      </ul>
    </div>

    <div class="main-content">
    <h2>Listado de Mascotas</h2>

<!-- Agregar botón "Registrar mi mascota" -->
<a href="agregar_mascota.php">Registrar otra mascota</a>

<!-- Mostrar la tabla de registros de mascotas -->
<?php
// Incluir el archivo de conexión a la base de datos
require_once "../../db.php";

// Obtener el ID del usuario actual (puedes obtenerlo de tu lógica de autenticación o sesión)
$usuario_id = 1; // Ejemplo: ID de usuario fijo (modifícalo según tus necesidades)

// Consulta SQL para obtener las mascotas del usuario actual
$query = "SELECT * FROM mascotas WHERE usuario_id = $usuario_id";

// Ejecutar la consulta
$resultado = mysqli_query($conn, $query);

// Verificar si se encontraron resultados
if (mysqli_num_rows($resultado) > 0) {
  // Crear la tabla para mostrar los registros de mascotas
  echo "<table>";
  echo "<tr>";
  echo "<th>ID</th>";
  echo "<th>Nombre</th>";
  echo "<th>Raza</th>";
  echo "<th>Edad</th>";
  echo "<th>Tamaño</th>";
  echo "</tr>";

  // Recorrer los resultados y mostrar los registros en la tabla
  while ($fila = mysqli_fetch_assoc($resultado)) {
      echo "<tr>";
      echo "<td>" . $fila["id"] . "</td>";
      echo "<td>" . $fila["nombre"] . "</td>";
      echo "<td>" . $fila["raza"] . "</td>";
      echo "<td>" . $fila["edad"] . "</td>";
      echo "<td>" . $fila["tamanio"] . "</td>";
      echo "</tr>";
  }

  echo "</table>";
} else {
  echo "No se encontraron mascotas para este usuario.";
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>
    </div>
  </div>
</body>
</html>
