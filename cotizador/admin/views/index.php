<?php
  // Incluir el archivo de conexión a la base de datos
  require_once "../../db.php";

  // Obtener el id del usuario actualmente conectado
  // $usuario_id = $_SESSION['usuario_id']; // Asegúrate de tener una sesión iniciada y que 'usuario_id' sea la clave correcta

  // Consultar las reservas de ese usuario
  $query = "SELECT * FROM reservas WHERE usuario_id = 1 && status != 3";
  $resultado = mysqli_query($conn, $query);
  $reserva = mysqli_fetch_assoc($resultado);
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
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9A-NoxLYkiQyX2f2lRwJwAqA6aUYWLwo&libraries=places&callback=initMap&v=weekly" defer></script>
  <script>
    let map;
    let directionsService;
    let directionsRenderer;

    const TARIFA_BASE = 8.0; // Cambia este valor según tu tarifa base
    const COSTO_POR_MINUTO = 2.50; // Cambia este valor según tu costo por minuto
    const COSTO_POR_KM = 4.50; // Cambia este valor según tu costo por kilómetro
    const FACTOR_TARIFA_PICO = 1.5;  // Este es el multiplicador para las tarifas en tiempo pico

    function initMap() {
      // Inicializar el mapa
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      });

      // Inicializar el servicio de direcciones
      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      
    }

    function animateRoute(directions) {
      const polylinePath = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      const legs = directions.routes[0].legs;
      for (let i=0; i<legs.length; i++) {
        const steps = legs[i].steps;
        for (let j=0; j<steps.length; j++) {
          const nextSegment = steps[j].path;
          const stepPolyline = new google.maps.Polyline(polylinePath);
          for (let k=0; k<nextSegment.length; k++) {
            stepPolyline.getPath().push(nextSegment[k]);
          }
        }
      }
      polylinePath.setMap(map);
    }

    function animarZoom(map, destino, zoomInicial, zoomFinal, delay) {
        setTimeout(function() {
            map.setCenter(destino);
            map.setZoom(zoomInicial);
            setTimeout(function() {
                map.setZoom(zoomFinal);
            }, 2000);  // 2000 milisegundos de retraso
        }, delay);
    }

    function esHoraPico() {
      const ahora = new Date();
      const hora = ahora.getHours();

      // Definimos hora pico como entre las 7 y las 10 de la mañana, y las 5 y las 8 de la tarde
      return (hora >= 7 && hora < 10) || (hora >= 17 && hora < 20);
    }

    function calcularDistancia(status) {
      const cotizacionStatus = status;
      // Obtener los valores de origen y destino del usuario
      const origen = document.getElementById("origen").value;
      const destino = document.getElementById("destino").value;

      // Crear la solicitud de ruta entre los puntos
      const request = {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Calcular la ruta utilizando el servicio de direcciones
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            // Mostrar la ruta en el mapa
          directionsRenderer.setDirections(result);

            // Obtener la distancia entre los puntos en kilómetros
            const distancia = result.routes[0].legs[0].distance.value / 1000;

            // Obtener la duración del viaje en minutos
            const duracion = result.routes[0].legs[0].duration.value / 60;

            // Calcular la tarifa
            let tarifa = TARIFA_BASE + (COSTO_POR_MINUTO * duracion) + (COSTO_POR_KM * distancia);

            // Aplicar el factor de tarifa pico si estamos en hora pico
            if (esHoraPico()) {
            tarifa *= FACTOR_TARIFA_PICO;
            }

            // Mostrar la distancia y la tarifa en los elementos HTML correspondientes
            document.getElementById("distancia").textContent = "Distancia: " + distancia.toFixed(2) + " km";
            document.getElementById("tarifa").textContent = "Tarifa estimada: $" + tarifa.toFixed(2);

            // Obtener el origen y el destino
            const origen = result.routes[0].legs[0].start_location;
            const destino = result.routes[0].legs[0].end_location;
            
            // Mostrar el contenedor del mapa
			document.getElementById("showMap").style.display = "block";


            if(cotizacionStatus<1){
              // Esperar 2 segundos, hacer zoom al punto A
              animarZoom(map, origen, 12, 8, 2000);

              // Después de 2 segundos, alejar y centrar el mapa entre ambos puntos
              animarZoom(map, { lat: (origen.lat() + destino.lat()) / 2, lng: (origen.lng() + destino.lng()) / 2 }, 8, 12, 4000);

              // Acercar zoom al punto B después de 2 segundos
              animarZoom(map, destino, 12, 8, 6000);

              // Después de 2 segundos, alejar y centrar el mapa entre ambos puntos
              animarZoom(map, { lat: (origen.lat() + destino.lat()) / 2, lng: (origen.lng() + destino.lng()) / 2 }, 12, 8, 8000);

              // Anima la ruta en el mapa
              setTimeout(function() {
                  animateRoute(result);
              }, 10000); // iniciar animación de la ruta después de 10 segundos
              
            } else {
              animateRoute(result);
            }
        } else {
            // Manejar el error si la solicitud de ruta falla
            alert("Error al calcular la distancia.");
        }
      });
    }

    function reservarTransporte() {
        const origen = document.getElementById("origen").value;
        const destino = document.getElementById("destino").value;
        const distancia = document.getElementById("distancia").textContent.split(": ")[1].split(" ")[0];
        const tarifa = document.getElementById("tarifa").textContent.split(": $")[1];
        
        window.location.href = `reserva_transporte.php?origen=${origen}&destino=${destino}&distancia=${distancia}&tarifa=${tarifa}`;

        setTimeout(function() {
          // Mostrar el formulario de cotización
          document.getElementById("showMap").style.display = "block";
        }, 2000); // iniciar animación de la ruta después de 10 segundos
    }

    <?php
      if (mysqli_num_rows($resultado) > 0) {
        ?>
          // Cuando la página se cargue, calcular la distancia
          window.onload = function() {
            calcularDistancia(1);
          }
        <?php
      }
    ?>

  </script>
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
    <?php
      // Verificar si el usuario tiene reservas
      if (mysqli_num_rows($resultado) > 0) {
        ?>
        <h3>Mi servicio activo</h3>
        <form id="cotizacionForm">
          <?php
            // Mostrar cada reserva
            echo "Origen: " . $reserva['origen'] . "<br>";
            echo "Destino: " . $reserva['destino'] . "<br>";
            echo "Fecha y Hora: " . $reserva['fecha_hora'] . "<br>";
            echo "Estado: " . ($reserva['status'] == 0 ? "En espera" : "Confirmada") . "<br>";
            echo "<hr>";
          ?>
          <input type="hidden" id="origen" name="origen" value="<?php echo $reserva['origen']; ?>">
          <input type="hidden" id="destino" name="destino" value="<?php echo $reserva['destino']; ?>">

          <div id="map" style="height: 400px;"></div>
          <div id="distancia"></div>
          <div id="tarifa"></div>
        </form>
        <?php
      } else {
        ?>
          <h3>Cotización de Servicios</h3>
          <!-- Formulario de cotización de servicios -->
          <form id="cotizacionForm" onsubmit="event.preventDefault(); calcularDistancia(0);">
              <!-- Campos para la cotización (origen, destino, etc.) -->
              <label for="origen">Origen:</label>
              <input type="text" id="origen" name="origen" required>
              <br><br>

              <label for="destino">Destino:</label>
              <input type="text" id="destino" name="destino" required>
              <br><br>
              <input type="submit" value="Cotizar">
              <br><br>
              <div id="showMap" style="display: none;">
                <div id="map" style="height: 400px;"></div>
                <div id="distancia"></div>
                <div id="tarifa"></div>
                <button id="reservarbutton" onclick="reservarTransporte()">Reservar transporte ahora</button>
              </div>
          </form>
        <?php
      }

        // Cerrar la conexión a la base de datos
        mysqli_close($conn);
      ?>





        
    </div>
</body>
</html>