import { Col, Image, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function Home() {
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
    }, 1000);
  };

  return (
    <Layout className="layout">
      <Header />
        {loading ? <Loader /> : 
          <div className='container'>
            <Content className="content" style={{ margin: '50px 0' }}>
              {/* Contenido principal de la aplicación */}
              <Row>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <a href='/blog'>
                    <Image width={200} height={200} src="https://dummyimage.com/200x200/000/fff" preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  </a>
                  <p style={{ marginTop: 5 }}>PISBlog</p>
                </Col>
              </Row>
            </Content>
          </div>
        }
      <Footer />
    </Layout>
  );
}

export default Home;