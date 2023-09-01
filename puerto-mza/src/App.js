import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const viewsContext = require.context('./views', true, /\.js$/);

  const routes = viewsContext.keys().map((modulePath) => {
    const path = modulePath.replace(/^\.\/|\.js$/g, '');
    const component = viewsContext(modulePath).default;

    // Si es Index, asignamos la ruta raíz
    if (path === 'Index') {
      return { path: '', component };
    }

    // Si es Error404, asignamos la ruta comodín
    if (path === 'Error404') {
      return { path: '*', component };
    }

    // Si es otra ruta, asignamos la ruta correspondiente
    return { path, component };
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={`/${route.path}`} element={<route.component />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
