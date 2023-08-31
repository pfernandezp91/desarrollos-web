import { Col, Layout, Menu, Row } from 'antd';
import React, { useState } from 'react';

const { Header } = Layout;

const menuSecundario = [
    {
        label: 'Opción 1',
        key: '1',
        style: { paddingTop: 10, paddingBottom: 10 }
    },
    {
        label: 'Opción 2',
        key: '2',
        style: { paddingTop: 10, paddingBottom: 10 }
    }
];

const menuPrimario = [
    {
        label: 'Opción 1',
        key: '1'
    },
    {
        label: 'Opción 2',
        key: '2'
    },
    {
        label: 'Opción 3',
        key: '3'
    },
    {
        label: 'Opción 4',
        key: '4'
    }
];

function AppHeader() {
    const [current, setCurrent] = useState('opcion1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

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
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', lineHeight: 'initial', background: 'transparent' }} items={menuSecundario} selectedKeys={[]} />
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
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', lineHeight: '64px', background: 'transparent' }} onClick={onClick} selectedKeys={[]} items={menuPrimario} />
                </Col>
            </Row>
        </Header>
    );
}

export default AppHeader;
