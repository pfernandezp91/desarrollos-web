import {
  ShareAltOutlined
} from '@ant-design/icons';
import { Card, Col, Layout, List, Row, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DividerVector from '../components/DividerVector';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import './blog.css';
const { Content } = Layout;

function formatearFecha(fecha) {
  return fecha.split('/').map(part => part.length === 1 ? '0' + part : part).join('/');
}

function trimText(htmlString) {
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = htmlString;
  
  let texto = dummyElement.textContent || dummyElement.innerText || "";

  if (texto.length > 250) {
    texto = texto.substr(0, 250) + '...';
  }

  return texto;
}

function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const [copied, setCopied] = useState(false);
  const [dataBlog, setData] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category ? category : 'Todas');

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);  // Se muestra el mensaje
        setTimeout(() => setCopied(false), 3000);  // Se oculta el mensaje después de 3 segundos
      })
      .catch(err => {
        console.error('Error al copiar texto: ', err);
      });
  }

  // Manejador de clic para las categorías.
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  // Filtra las publicaciones del blog en función de la categoría seleccionada.
  const filteredBlogData = selectedCategory === 'Todas' ? dataBlog : dataBlog.filter(item => item.categoria === selectedCategory);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <Layout className="layout">
      <Header />
        <>
          <section className="text-light bg-dark position-relative overflow-hidden">
            <div className="container position-relative py-5" style={{ zIndex: 1 }}>
              <Row>
                <Col offset={4} span={16} className="text-center">
                  <h1 className="display-4">
                    <span className="titulo d-flex justify-content-center">
                      <span className="titulo_text_PIS">PIS</span>
                      <span className="titulo_text_Blog">Blog</span>
                    </span>
                  </h1>
                  <p className="lead mb-0">El blog oficial del equipo del Puerto Inteligente Seguro brinda información sobre las nuevas funciones, mejoras y actualización del sistema y módulos.</p>
                </Col>
              </Row>
            </div>
            <DividerVector />
            <div className="d-flex align-items-center bg-dark" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0 }} >
                <img src="/assets/img/hamburg-3763443_1280.jpg" alt="" className="opacity-50" style={{ objectFit: "cover", objectPosition: "50% 50%", maxWidth: "none", position: "absolute", left: 0, mixBlendMode: "color-dodge" }} />
            </div>
          </section>
          <section>
            <div className='container'>
              <Content className="content" style={{ margin: '50px 0' }}>
                {/* Contenido principal de la aplicación */}
                <Row>
                  <Col span={16} className="px-4">
                    {filteredBlogData.map(item => (
                      <Card className="shadow mb-5" bodyStyle={{ padding: '24px' }} key={item.id} cover={null} actions={[
                        <Row className='px-4 d-flex justify-content-center' style={{ cursor: 'initial' }}>
                          <Col span={20}>
                            <div className="d-flex align-items-center me-3">
                              <div className="text-muted d-flex align-items-center">
                                <span className='mr-2'>{item.tipoNota} |</span>
                                <span className='ms-auto'>{formatearFecha(item.fecha)}</span>
                              </div>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className="d-flex align-items-center justify-content-end">
                              <a href={'/blog/post/' + item.id} onClick={(e) => {
                                e.preventDefault();
                                const urlToCopy = window.location.origin + '/blog/post/' + item.id;
                                copyToClipboard(urlToCopy);
                              }}>
                                <ShareAltOutlined className="me-1" style={{ fontSize: 24 }}/>
                              </a>
                            </div>
                          </Col>
                        </Row>
                      ]}>
                          <div className="d-flex justify-content-between mb-3">
                              <Tag className='shadow shadow-danger' color="danger" style={{ backgroundColor: '#ef4444' }}>{item.categoria}</Tag>
                          </div>
                          <h3 className="h4">
                              <a className='text-dark text-decoration-none' href={'/blog/post/' + item.id}>{item.titulo_pagina}</a>
                          </h3>
                          <hr className='hr-border my-4'/>
                          <p className="mb-4">{trimText(item.contenido)}</p>
                      </Card>
                    ))}
                  </Col>
                  <Col span={8} className='px-4'>
                    <Card className='shadow' title="Categorías" style={{ marginBottom: '16px', position: 'sticky', top: 80 }}>
                      <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                          <a className='text-dark text-decoration-none d-block' href="/blog" onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick('Todas');
                          }}>
                            <span>Todas</span>
                          </a>
                      </List.Item>
                      <List dataSource={dataCategorias} renderItem={item => (
                        <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                          <a className='text-dark text-decoration-none d-block' href="/blog" onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick(item.nombre_categoria);
                          }}>
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
          {
            copied && <div style={{
              position: 'fixed',
              bottom: '10px',
              right: '10px',
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '5px'
            }}>
              ¡URL copiada al portapapeles!
            </div>
          }
        </>
      <Footer />
    </Layout>
  );
}

export default Blog;