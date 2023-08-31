import { Col, Image, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function App() {
  const [loading, setLoading] = useState(true);

  const [iframeHeight, setIframeHeight] = useState(0);

  const handleIframeHeightChange = (newHeight) => {
    if (newHeight !== iframeHeight) {
      setIframeHeight(newHeight);
    }
  };

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
          <div className='container'>
            <Content className="content" style={{ padding: '0 50px', margin: '50px 0' }}>
              {/* Contenido principal de la aplicación */}
              <Row>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Image width={200} height={200} src="https://dummyimage.com/200x200/000/fff" preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  <p style={{ marginTop: 5 }}>Vehículos</p>
                </Col>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Image width={200} height={200} src="https://dummyimage.com/200x200/000/fff" preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  <p style={{ marginTop: 5 }}>Validar vehiculos</p>
                </Col>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Image width={200} height={200} src="https://dummyimage.com/200x200/000/fff" preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  <p style={{ marginTop: 5 }}>Menu submenu ejemplo</p>
                </Col>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Image width={200} height={200} src="https://dummyimage.com/200x200/000/fff" preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  <p style={{ marginTop: 5 }}>PISCheck</p>
                </Col>
              </Row>
            </Content>
          </div>
        }
      <Footer />
    </Layout>
  );
}

export default App;