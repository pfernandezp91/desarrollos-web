<?php
  // Incluir el archivo de conexión a la base de datos
  require_once "../../db.php";

  // Consultar las reservas de ese usuario
  $query = "SELECT * FROM reservas WHERE usuario_id = 1";
  $resultado = mysqli_query($conn, $query);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Cotización de Servicios</title>
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
            <?php
            if (mysqli_num_rows($resultado) > 0) {
                echo "<h3>Mis viajes</h3>";
                while($reserva = mysqli_fetch_assoc($resultado)) {
                    // Mostrar cada reserva
                    echo "<form id='cotizacionForm'>";
                        echo "Origen: " . $reserva['origen'] . "<br>";
                        echo "Destino: " . $reserva['destino'] . "<br>";
                        echo "Fecha y Hora: " . $reserva['fecha_hora'] . "<br>";
                        echo "Estado: " . ($reserva['status'] == 0 ? "En espera" : "Confirmada") . "<br>";
                    echo "</form><hr>";
                }
            } else {
                echo "No has tenido viajes aún"; 
            }
            // Cerrar la conexión a la base de datos
            mysqli_close($conn);
            ?>
        </div>
    </div>
</body>
</html>






        
    </div>
</body>
</html>