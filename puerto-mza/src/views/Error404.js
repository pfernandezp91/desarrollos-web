import { Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function Error404() {
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
      {/* <Header /> */}
        {loading ? <Loader /> : 
          <div className='container'>
            <Content className="content" style={{ padding: '0 50px', margin: '50px 0' }}>
              {/* Contenido principal de la aplicación */}
              <Row>
                <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <h2>404</h2>
                </Col>
              </Row>
            </Content>
          </div>
        }
      {/* <Footer /> */}
    </Layout>
  );
}

export default Error404;