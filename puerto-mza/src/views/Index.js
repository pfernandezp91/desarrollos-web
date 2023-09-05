import { Col, Image, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config  from '../utils/config';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function Home() {
  const [loading, setLoading] = useState(true);
  const imagePath = `${config.basename}/assets/img/PIS ASSETSxhdpi.png`;

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
      {/* <Header /> */}
        {loading ? <Loader /> : 
          <div className='container'>
            <Content className="content" style={{ margin: '50px 0' }}>
              {/* Contenido principal de la aplicación */}
              <Row>
                <Col span={8} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Link type='link' to={'/blog'}>
                    <Image width={200} height={200} src={imagePath} preview={false} style={{ borderRadius: '15px' }} alt=""/>
                  </Link>
                  <p style={{ marginTop: 5 }}>PIS Blog</p>
                </Col>
              </Row>
            </Content>
          </div>
        }
      {/* <Footer /> */}
    </Layout>
  );
}

export default Home;