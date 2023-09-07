// config.js

let apiBaseUrl;
let basename;
let basename_admin;

if (process.env.NODE_ENV === 'production') {
  // Entorno de producción (en el servidor)
  apiBaseUrl = '/PISblog/admin/'; // Cambia a la ruta del servidor en producción
  basename = '/PISblog/public/'; // Cambia a la ruta del servidor en producción
  basename_admin = '/PISblog/admin/'; // Cambia a la ruta del servidor en producción
} else {
  // Entorno de desarrollo (localhost)
  apiBaseUrl = 'http://localhost:2000/PISblog/admin/'; // Cambia a la ruta local en desarrollo
  basename = ''; // En desarrollo, no necesitas un basename
  basename_admin = ''; // Cambia a la ruta local en desarrollo
}

const config = {
  apiBaseUrl,
  basename,
  googleAnalyticsKey: 'your-ga-key',
  // Otras configuraciones
};

export default config;
