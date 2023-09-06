import {
  ArrowLeftOutlined, ArrowRightOutlined, HomeOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Layout, List, Row, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import config  from '../utils/config';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
import Loader from '../components/Loader';
import { getCurrentToken, saveToken } from "../utils/LocalStorage";
import './blog.css';

const hash = window.location.hash;
const notaId = hash.replace('#nota', '');

const { Content } = Layout;

function formatearFecha(fecha) {
  if (typeof fecha !== 'string') {
    console.error("La fecha proporcionada no es una cadena:", fecha);
    return fecha;
  }
  if (!fecha.includes('/')) {
    console.error("El formato de fecha no es correcto:", fecha);
    return fecha;
  }
  return fecha.split('/').map(part => part.length === 1 ? '0' + part : part).join('/');
}

function BlogPost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [dataBlog, setData] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var copyToken = getCurrentToken();
  const apiToken = `${config.apiBaseUrl}`;

  useEffect(() => {
    if (token !== null) {
      saveToken(token);
    }

    var newToken = getCurrentToken();

    axios.get(`${apiToken}/token.php`, {
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

    axios.get(`${apiToken}/src/server/blog.php`)
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });

    axios.get(`${apiToken}/src/server/blog_categorias.php`)
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

  const currentIndex = dataBlog.findIndex(post => post.id === notaId);
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : dataBlog.length - 1;
  const nextIndex = currentIndex < dataBlog.length - 1 ? currentIndex + 1 : 0;
  const isFirstElement = currentIndex === 0;
  const isLastElement = currentIndex === dataBlog.length - 1;


  const previousPostId = dataBlog[previousIndex]?.notaId;
  const nextPostId = dataBlog[nextIndex]?.notaId;

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

  const postSeleccionado = dataBlog?.find(post => post.id === notaId) || {};


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
                    <div style={{ marginBottom: '16px', position: 'sticky', top: 145 }}>
                      {AccessSuccessful && (
                        <Link to={ window.location.origin + '/admin/src/views/?token=' + copyToken } target="_blank" rel="noopener noreferrer">
                          <Button className='w-100 mb-4' type='primary'>Administración</Button>
                        </Link>
                      )}
                      <Card className='shadow' title="Categorías">
                        <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                            <Link className='text-dark text-decoration-none d-block' type='link' to={'/?category=Todas'}>
                              <span>Todas</span>
                            </Link>
                        </List.Item>
                        <List dataSource={dataCategorias} renderItem={item => (
                          <List.Item className='mb-2 py-2' style={{ marginBottom: '8px', border: 0 }}>
                            <Link className='text-dark text-decoration-none d-block' type='link' to={'/?category=' + item.nombre_categoria}>
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
        </>
      {/* <Footer /> */}
    </Layout>
  );
}

export default BlogPost;