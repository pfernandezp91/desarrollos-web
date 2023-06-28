<!DOCTYPE html>
<html>
    <head>
        <title>Registro de Usuario</title>
    </head>
    <body>
        <h2>Registro de Usuario</h2>
        <form method="POST" action="procesar_registro.php">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <br><br>
            
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required>
            <br><br>
            
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required>
            <br><br>
            
            <input type="submit" value="Registrarse">
        </form>
    </body>
</html>
