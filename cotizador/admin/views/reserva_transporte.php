<?php
    $origen = $_GET['origen'];
    $destino = $_GET['destino'];
    $distancia = $_GET['distancia'];
    $tarifa = $_GET['tarifa'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Reservación de Transporte</title>
</head>
<body>
    <h2>Reservación de Transporte</h2>
    <form method="POST" action="../model/procesar_agregar_reserva.php">
        <label for="usuario_id"><b>Usuario:</b></label><br>
        <input type="text" id="usuario_id" name="usuario_id" value="1" readonly><br>
        <label for="mascota_id"><b>Mascota:</b></label><br>
        <input type="text" id="mascota_id" name="mascota_id" value="1" readonly><br>
        <label for="origen"><b>Origen:</b></label><br>
        <input type="text" id="origen" name="origen" value="<?php echo $origen; ?>" readonly><br>
        <label for="destino"><b>Destino:</b></label><br>
        <input type="text" id="destino" name="destino" value="<?php echo $destino; ?>" readonly><br>
        <label for="costo"><b>Costo:</b></label><br>
        <input type="text" id="costo" name="costo" value="<?php echo $tarifa; ?>" readonly><br>
        <input type="hidden" id="status" name="status" value="0"><br>

        <!-- Asegúrate de tener los campos necesarios para mostrar al usuario -->
        <label for="confirmacion">Confirmar reserva:</label><br>
        <input type="submit" value="Confirmar">
    </form>
</body>
</html>
