import React from 'react';

const Loader = ({ tip = "Cargando..." }) => {
    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <img src="/assets/img/loading01.gif" width="256" height="256" alt={tip} />
        </div>
    );
}

export default Loader;