import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Layout, Menu, Row } from 'antd';


const { Header, Content } = Layout;

// const menuPrimario = [
//     {
//         label: 'Opción 1',
//         key: '1',
//         to: '/',
//     },
//     {
//         label: 'Opción 2',
//         key: '2',
//         to: '/',
//     },
//     {
//         label: 'Opción 3',
//         key: '3',
//         to: '/',
//     },
//     {
//         label: 'Opción 4',
//         key: '4',
//         to: '/',
//     }
// ];

function AppHeader() {

    const menu = (
        <Menu>
          <Menu.Item key="1">Acción</Menu.Item>
          <Menu.Item key="2">Otra acción</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">Algo más aquí</Menu.Item>
        </Menu>
      );

    const [current, setCurrent] = useState('1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };

    return (
        <Header className="mt-0" style={{ backgroundColor: '#13322b', height: 'auto' }}>
            <div className='container'>
                <Row style={{ background: '#13322b' }}>
                    <Col span={8}>
                        <a className="navbar-brand" href="/" style={{ width: '50%', color: 'white', fontSize: '1.5em' }}>
                        Manzanillo
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', background: 'transparent' }} selectedKeys={[]}>
                            <Menu.Item key="enlace1">Enlace</Menu.Item>
                            <Dropdown overlay={menu} placement="bottomLeft">
                            <a className="ant-dropdown-link" href="/" onClick={(e) => e.preventDefault()}>
                                Desplegable <DownOutlined />
                            </a>
                            </Dropdown>
                            <Menu.Item key="enlace2">Enlace</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </Header>
    );

    // return ( 
    //     <Router>
    //         <Layout>
    //             <Header style={{ padding: 0, background: 'transparent', height: 'auto' }}>
    //                 <Row style={{ background: '#13322b', padding: '0 24px' }}>
    //                     {/* Logo */}
    //                     <Col span={8}>
    //                         <div className="logo" style={{ width: '50%', color: 'white', fontSize: '1.5em' }}>
    //                             Sitio
    //                         </div>
    //                     </Col>

    //                     {/* Menú primario */}
    //                     <Col span={16}>
    //                         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', display: 'flex', justifyContent: 'end', background: 'transparent' }} selectedKeys={[]}>
    //                             {menuPrimario.map(option => (
    //                                 <Menu.Item key={option.key} style={{ lineHeight: '64px' }}>
    //                                     <Link to={option.to}>{option.label}</Link>
    //                                 </Menu.Item>
    //                             ))}
    //                         </Menu>
    //                     </Col>
    //                 </Row>
    //             </Header>
    //         </Layout>
    //     </Router>
    // );
}

export default AppHeader;
