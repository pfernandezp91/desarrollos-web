import React from 'react';
import { Row, Col, Layout, Menu } from 'antd';

const { Header } = Layout;

function AppHeader() {
  return ( 
    <Header style={{ padding: 0, background: 'transparent', height: 'auto' }}>
        <Row style={{ background: '#0c231e', padding: '0 24px' }}>
            {/* Icono */}
            <Col span={8}>
                <div className="logo" style={{ width: '50%', color: 'white', fontSize: '14px', lineHeight: 'initial', paddingTop: 10, paddingBottom: 10 }}>
                    Icono
                </div>
            </Col>

            {/* Menú secundario */}
            <Col span={16}>
                <Menu theme="transparent" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', lineHeight: 'initial', paddingTop: 10, paddingBottom: 10 }}>
                    <Menu.Item key="1" style={{ color: 'white' }}>
                        Opción 1
                    </Menu.Item>
                    <Menu.Item key="2" style={{ color: 'white' }}>
                        Opción 2
                    </Menu.Item>
                    {/* Agrega más items de menú si lo deseas */}
                </Menu>
            </Col>
        </Row>
        <Row style={{ background: '#13322b', padding: '0 24px' }}>
            {/* Logo */}
            <Col span={8}>
                <div className="logo" style={{ width: '50%', color: 'white', fontSize: '1.5em' }}>
                    Sitio
                </div>
            </Col>

            {/* Menú primario */}
            <Col span={16}>
                <Menu theme="transparent" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', lineHeight: '64px' }}>
                    <Menu.Item key="1" style={{ color: 'white' }}>
                        Opción 1
                    </Menu.Item>
                    <Menu.Item key="2" style={{ color: 'white' }}>
                        Opción 2
                    </Menu.Item>
                    <Menu.Item key="3" style={{ color: 'white' }}>
                        Opción 3
                    </Menu.Item>
                    <Menu.Item key="4" style={{ color: 'white' }}>
                        NOMBRE ADMINISTRADOR
                    </Menu.Item>
                    {/* Agrega más items de menú si lo deseas */}
                </Menu>
            </Col>
        </Row>
    </Header>
  );
}

export default AppHeader;
