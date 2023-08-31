import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Simulando una petición que tarda 2 segundos
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

  return (
    
    <Layout className="layout">
        <Header />
        {loading ? <Loader /> : 
            <Content className="content" style={{ padding: '0 50px', margin: '50px 0' }}>
            {/* Contenido principal de la aplicación */}
            <Row>
                <div>
                    <h2>Inicio</h2>
                    <p>¡Bienvenido a mi aplicación!</p>
                </div>
            </Row>
          </Content>
        }
      <Footer />
    </Layout>
  );
}

export default App;