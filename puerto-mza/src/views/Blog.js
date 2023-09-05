import {
  ShareAltOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Layout, List, Row, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DividerVector from '../components/DividerVector';
// import Fetch from '../libraries/Fetch';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
import Loader from '../components/Loader';
import { getCurrentToken, saveToken } from "../utils/LocalStorage";

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

// const miToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp2YWxlbnp1ZWxhMUB1Y29sLm14IiwiaWRVc3UiOiIzOTE4IiwiaWRBcHAiOiIxNDAiLCJub21BcHAiOiJQSVMgQmxvZyIsImlkUm9sIjoiNiIsImlkUm9sQXBwIjoiMSIsImlkUGVyc29uYSI6IjMyMTEyIiwiaWRFbXByZXNhIjoiODUiLCJpZENvbnRyYXRvIjoiMSIsImlkQVBJIjoiNyIsImF1dG9yaWRhZCI6IjEiLCJodXNvIjoiQW1lcmljYS9NZXhpY29fQ2l0eSIsImh1c28yIjoiNiIsIm5iZiI6MTY5MzU4Mzg1NywiZXhwIjoxNjkzNjEyNjU3LCJpYXQiOjE2OTM1ODM4NTcsImlzcyI6IlBJUyIsImF1ZCI6IkFQSU1BTiJ9.7wV5HnrF3B6H1L-zapAimCq3vnwXvzWJWzcFAoAM5sM';

function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const token = queryParams.get('token');
  const [copied, setCopied] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [dataBlog, setData] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category ? category : 'Todas');
  var copyToken = getCurrentToken();

  useEffect(() => {
    if (token !== null) {
      saveToken(token);
    }

    var newToken = getCurrentToken();

    axios.get('/assets/api/token.php', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + newToken
      }
    })
    .then(response => {
      setAccessToken(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });

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
  }, [token]);

  var AccessSuccessful = false
  if(
    (accessToken !== null && accessToken.acceso && accessToken.token.idRolApp === '1' && accessToken.token.idApp === '140') 
    || 
    (accessToken !== null && accessToken.acceso && accessToken.token.idRolApp === '2' && accessToken.token.idApp === '140')
  ) {
      AccessSuccessful = true;
  }

  console.log(AccessSuccessful)
  // if(accessToken) console.log(accessToken)

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
      {/* <Header /> */}
        <>
          <section className="text-light bg-dark position-relative overflow-hidden">
            <div className="container position-relative py-3" style={{ zIndex: 1 }}>
              <Row>
                <Col offset={4} span={16} className="text-center">
                  <h1 className="display-4 mb-4">
                    <span className="titulo d-flex justify-content-center">
                      <span className="titulo_text_PIS">PIS</span>
                      <span className="titulo_text_Blog">Blog</span>
                    </span>
                  </h1>
                  <p className="mb-0" style={{ fontWeight: 300 }}>
                    El PISBlog es el espacio oficial donde nos dedicamos a mantener informado al usuario, acerca de nuestras actualizaciones y desarrollos que constantemente implementamos en el Sistema del Puerto Inteligente Seguro.<br/><br/>
                    El Puerto Inteligente Seguro es una plataforma integral que ha transformado la manera en que las Administraciones del Sistema Portuario Nacional, gestionan y optimizan sus operaciones en el país.
                    En nuestro compromiso constante con la innovación y la excelencia, nos complace informar y compartir las últimas novedades que hemos incorporado para mejorar la eficiencia, la seguridad, y la rentabilidad de los puertos de todo el territorio nacional.
                  </p>
                </Col>
              </Row>
            </div>
            <DividerVector />
            <div className="d-flex align-items-center bg-dark" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0 }} >
                <img src="/assets/img/hamburg-3763443_1280.jpg" alt="" className="opacity-50" style={{ objectFit: "cover", objectPosition: "50% 50%", maxWidth: "none", width: '100%', position: "absolute", left: 0, mixBlendMode: "color-dodge" }} />
            </div>
          </section>
          <section>
            <div className='container'>
              <Content className="content" style={{ margin: '50px 0' }}>
                {/* Contenido principal de la aplicación */}
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 16 }} className="px-4">
                    {filteredBlogData.map(item => (
                      <Card className="shadow mb-5" bodyStyle={{ padding: '24px' }} key={item.id} cover={null} actions={[
                        <Row className='px-4 d-flex justify-content-center' style={{ cursor: 'initial' }}>
                          <Col span={20}>
                            <div className="d-flex align-items-center me-3">
                              <div className="text-muted d-flex align-items-center">
                                <span className='me-2'>{item.tipoNota} |</span>
                                <span className='ms-auto'>{formatearFecha(item.fecha)}</span>
                              </div>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className="d-flex align-items-center justify-content-end">
                              <Link type='link' to={'/blog/post/' + item.id} onClick={(e) => {
                                  e.preventDefault();
                                  const urlToCopy = window.location.origin + '/blog/post/' + item.id;
                                  copyToClipboard(urlToCopy);
                                }}>
                                <ShareAltOutlined className="me-1" style={{ fontSize: 24, float: 'right' }}/>
                                </Link>
                            </div>
                          </Col>
                        </Row>
                      ]}>
                          <div className="d-flex justify-content-between mb-3">
                              <Tag className='shadow shadow-danger' color="danger" style={{ backgroundColor: '#ef4444' }}>{item.categoria}</Tag>
                          </div>
                          <h3 className="h4">
                            <Link className='text-dark text-decoration-none' type='link' to={'/blog/post/' + item.id}>
                              {item.titulo_pagina}
                            </Link>
                          </h3>
                          <hr className='hr-border'/>
                          <p className="mb-4">{trimText(item.contenido)}</p>
                      </Card>
                    ))}
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 8 }} className='px-4'>
                    <div style={{ marginBottom: '16px', position: 'sticky', top: 145 }}>
                      {AccessSuccessful && (
                        <Link to={ window.location.origin + '/admin/src/views/?token=' + copyToken } target="_blank" rel="noopener noreferrer">
                          <Button className='w-100 mb-4' type='primary'>Administración</Button>
                        </Link>
                      )}
                      <Card className='shadow' title="Categorías">
                        <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                          <Link className='text-dark text-decoration-none d-block' type='link' onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick('Todas');
                            }}>
                              <span>Todas</span>
                          </Link>
                        </List.Item>
                        <List dataSource={dataCategorias} renderItem={item => (
                          <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                            <Link className='text-dark text-decoration-none d-block' type='link' onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick(item.nombre_categoria);
                            }}>
                              <span>{item.nombre_categoria}</span>
                            </Link>
                          </List.Item>
                        )}/>
                      </Card>
                    </div>
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
      {/* <Footer /> */}
    </Layout>
  );
}

export default Blog;