// config.js

let apiBaseUrl;
let basename;
let basename_admin;

if (process.env.NODE_ENV === 'production') {
  // Entorno de producción (en el servidor)
  apiBaseUrl = '/admin/v2/'; // Cambia a la ruta del servidor en producción
  basename = '/public/'; // Cambia a la ruta del servidor en producción
  basename_admin = '/admin/'; // Cambia a la ruta del servidor en producción
} else {
  // Entorno de desarrollo (localhost)
  apiBaseUrl = 'http://localhost:2000/admin/v2/'; // Cambia a la ruta local en desarrollo
  basename = '/'; // En desarrollo, no necesitas un basename
  basename_admin = '/'; // Cambia a la ruta local en desarrollo
}

const config = {
  apiBaseUrl,
  basename,
  basename_admin
  // Otras configuraciones
};

export default config;
