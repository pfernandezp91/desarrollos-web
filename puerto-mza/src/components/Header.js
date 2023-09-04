import React from 'react';
import { HomeOutlined, AppstoreOutlined, SwapOutlined } from '@ant-design/icons';

import { Col, Dropdown, Layout, Menu, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;


const { Header } = Layout;

function AppHeader() {

    const cambioPuertoMenu = (
        <Menu>
          <Menu.Item key="1">MANZANILLO</Menu.Item>
        </Menu>
      );
    
      const userMenu = (
        <Menu>
          <Menu.Item key="1">Cambiar Contraseña</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">Salir</Menu.Item>
        </Menu>
      );

    return (
        <Header className="position-sticky mt-0" style={{ backgroundColor: '#13322b', height: 'auto', zIndex: 1000, top: 58 }}>
            <div className='container'>
                <Row style={{ background: '#13322b' }}>
                    <Col span={8}>
                        <Link className='text-decoration-none d-flex align-items-center' to="/">
                            <span className='my-auto'>
                                <img className='me-2' src="/assets/img/logoAPI.png" height="32" width="32" alt="Logo Puerto Inteligente Seguro" />
                                <Text className="ant-logo-text text-light" style={{ fontSize: '1.5em', fontWeight: 300 }}>MANZANILLO</Text>
                            </span>
                        </Link>
                    </Col>
                    <Col span={16}>
                        <Menu theme="dark" mode="horizontal" style={{ width: '100%', display: 'flex', justifyContent: 'end', background: 'transparent' }} selectedKeys={[]}> 
                            <Menu.Item key="inicio" icon={<HomeOutlined />}>
                                Inicio
                            </Menu.Item>
                            <Menu.Item key="panel" icon={<AppstoreOutlined />}>
                                Panel
                            </Menu.Item>
                            <Menu.Item key="cambiarPuerto">
                                <Dropdown overlay={cambioPuertoMenu} trigger={['click']}>
                                    <a href='/' className="ant-dropdown-link text-decoration-none" onClick={e => e.preventDefault()}>
                                        <SwapOutlined /> Cambiar puerto <span className="caret"></span>
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Dropdown overlay={userMenu} trigger={['click']}>
                                    <a href='/' className="ant-dropdown-link text-decoration-none" onClick={e => e.preventDefault()}>
                                        NOMBRE COMPLETO USUARIO <span className="caret"></span>
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </Header>
    );
}

export default AppHeader;
