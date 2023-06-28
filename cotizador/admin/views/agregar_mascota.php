<!DOCTYPE html>
<html>
<head>
  <title>Agregar Mascota</title>
</head>
<body>
  <h2>Agregar Mascota</h2>

  <!-- Formulario para agregar una nueva mascota -->
  <form method="POST" action="../model/procesar_agregar_mascota.php">
    <input type="text" id="usuario_id" name="usuario_id" value="1" hidden>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required>
    <br><br>

    <label for="raza">Raza:</label>
    <input type="text" id="raza" name="raza">
    <br><br>

    <label for="edad">Edad:</label>
    <input type="number" id="edad" name="edad">
    <br><br>

    <label for="raza">Tamaño:</label>
    <input type="text" id="tamanio" name="tamanio">
    <br><br>

    <input type="submit" value="Agregar Mascota">
  </form>
</body>
</html>
