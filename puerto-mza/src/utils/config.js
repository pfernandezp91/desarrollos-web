// config.js

// En tu archivo de configuración config.js
const getDynamicBasePath = () => {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('/');
  const indexOfAdmin = urlParts.indexOf('admin'); // Busca 'admin' en la URL

  if (indexOfAdmin !== -1) {
    // Encuentra la posición donde 'admin' aparece en la URL
    // Combina las partes de la URL hasta 'admin'
    return urlParts.slice(0, indexOfAdmin + 1).join('/') + '/';
  } else {
    // Si 'admin' no se encuentra, usa la raíz como valor predeterminado
    return '/';
  }
};

const dynamicBasePath = getDynamicBasePath();
console.log(dynamicBasePath); // '/admin/'

let apiBaseUrl;
let basename;
let basename_admin;

// cuando se ejecuta en el servidor, process.env.NODE_ENV es 'production' y cuando sea diferente a localhost
if (process.env.NODE_ENV === 'production') {
  // Entorno de producción (en el servidor)
  apiBaseUrl = '/admin/src/server/'; // Cambia a la ruta del servidor en producción
  basename = '/public/'; // Cambia a la ruta del servidor en producción
  basename_admin = '/admin/'; // Cambia a la ruta del servidor en producción
} else {
  // Entorno de desarrollo (localhost)
  apiBaseUrl = 'http://localhost:2000/admin/src/server/'; // Cambia a la ruta local en desarrollo
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
