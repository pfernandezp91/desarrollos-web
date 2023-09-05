import React from 'react';
import config  from '../utils/config';

const Loader = ({ tip = "Cargando..." }) => {
    const imagePath = `${config.basename}/assets/img/loading01.gif`;

    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <img src={imagePath} width="256" height="256" alt={tip} />
        </div>
    );
}

export default Loader;