import {
  ArrowLeftOutlined, ArrowRightOutlined, HomeOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Layout, List, Row, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
import Loader from '../components/Loader';
import './blog.css';

const { Content } = Layout;

function formatearFecha(fecha) {
  return fecha.split('/').map(part => part.length === 1 ? '0' + part : part).join('/');
}

function BlogPost() {
  const [dataBlog, setData] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get('/assets/api/blog.php')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get('/assets/api/blog_categorias.php')
      .then(response => {
        setDataCategorias(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const currentIndex = dataBlog.findIndex(post => post.id === id);
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : dataBlog.length - 1;
  const nextIndex = currentIndex < dataBlog.length - 1 ? currentIndex + 1 : 0;
  const isFirstElement = currentIndex === 0;
  const isLastElement = currentIndex === dataBlog.length - 1;


  const previousPostId = dataBlog[previousIndex]?.id;
  const nextPostId = dataBlog[nextIndex]?.id;

  const navigate = useNavigate();

  const handlePreviousClick = () => {
    if (previousPostId) {
      navigate(`/blog/post/${previousPostId}`);
      window.scrollTo(0, 0);  // Esto desplaza la página al principio.
    }
  };

  const handleNextClick = () => {
    if (nextPostId) {
      navigate(`/blog/post/${nextPostId}`);
      window.scrollTo(0, 0);  // Esto desplaza la página al principio.
    }
  };

  const postSeleccionado = dataBlog.find(post => post.id === id);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout className="layout">
      {/* <Header /> */}
        <>
          <section className="pt-2 mb-5">
            <div className="container">
              <Content className="content" style={{ marginTop: 50 }}>
                <Row>
                  <Col span={24} className="px-4">
                    <Card className='shadow p-4' cover={
                      <div className="d-flex align-items-center p-3 p-sm-4">
                        <div className="w-100 my-auto">
                          <div className='d-flex'>
                            <Tag className='shadow shadow-danger mx-auto' color="danger" style={{ backgroundColor: '#ef4444' }}>{postSeleccionado.categoria}</Tag>
                          </div>
                          <h2 className="display-5 text-center">{postSeleccionado.titulo_pagina}</h2>
                          <div className="d-flex align-items-center me-3">
                            <div className="text-muted mx-auto mt-4">
                              <span className='me-2'>{postSeleccionado.tipoNota} |</span>
                              <span className='ms-auto'>{formatearFecha(postSeleccionado.fecha)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    bodyStyle={{ display: 'none' }}/>
                  </Col>
                </Row>
              </Content>
            </div>
          </section>
          <section>
            <div className='container'>
              <Content className="content" style={{ marginBottom: 50 }}>
                {/* Contenido principal de la aplicación */}
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 16 }} className="px-4">
                    <div dangerouslySetInnerHTML={{ __html: postSeleccionado.contenido }} />
                    <hr/>
                    <div className="d-flex justify-content-center">
                      <Button type="link" disabled={!isFirstElement} onClick={handlePreviousClick} style={{ height: 'auto' }}>
                        <ArrowLeftOutlined className="h4" />
                      </Button>
                            
                      <Button id="volver_inicio" type="link" href="/blog" style={{ height: 'auto' }}>
                        <HomeOutlined className="h4"/>
                      </Button>
                            
                      <Button type="link" disabled={!isLastElement} onClick={handleNextClick} style={{ height: 'auto' }}>
                        <ArrowRightOutlined className="h4" />
                      </Button>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }} className='px-4'>
                    <Card className='shadow' title="Categorías" style={{ marginBottom: '16px', position: 'sticky', top: 145 }}>
                      <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                          <a className='text-dark text-decoration-none d-block' href={'/blog?category=Todas'}>
                            <span>Todas</span>
                          </a>
                      </List.Item>
                      <List dataSource={dataCategorias} renderItem={item => (
                        <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                          <a className='text-dark text-decoration-none d-block' href={'/blog?category=' + item.nombre_categoria}>
                            <span>{item.nombre_categoria}</span>
                          </a>
                        </List.Item>
                      )}/>
                    </Card>
                  </Col>
                </Row>
              </Content>
            </div>
          </section>
        </>
      {/* <Footer /> */}
    </Layout>
  );
}

export default BlogPost;