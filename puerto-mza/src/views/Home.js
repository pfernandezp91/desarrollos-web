import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header />
      <Content className="content" style={{ padding: '0 50px', marginTop: 50, marginBottom: 50 }}>
        {/* Contenido principal de la aplicación */}
        <div>
            <h2>Inicio</h2>
            <p>¡Bienvenido a mi aplicación!</p>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;