import { Button, Col, Layout, Row, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { EditOutlined, MenuOutlined, DeleteOutlined } from '@ant-design/icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Content } = Layout;

function Tablas() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulando una petición que tarda 2 segundos
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  const dataSource = [
    {
      key: '1',
      id: '001',
      concepto: 'Falta injustificada',
      nRegistros: '001',
      fecha: '01/10/2023',
      total: 1000.00,
    },
    {
      key: '2',
      id: '002',
      concepto: 'Permiso sin goce de sueldo',
      nRegistros: '001',
      fecha: '01/10/2023',
      total: 1000.00,
    },
  ];
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Concepto',
      dataIndex: 'concepto',
      key: 'concepto',
    },
    {
      title: 'No. Registros',
      dataIndex: 'nRegistros',
      key: 'nRegistros',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => {
        const formattedTotal = parseFloat(text).toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
        return <span>{formattedTotal}</span>;
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: () => (
        <Space wrap>
          <Button className='warning-button' type="primary" icon={<EditOutlined />} />
          <Button type="primary" icon={<MenuOutlined />} />
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <Layout className="layout" style={{ backgroundColor: 'transparent' }}>
      <Header />
        {loading ? <Loader /> : 
          <div className='container'>
            <Content className="content" style={{ margin: '50px 0' }}>
              {/* Contenido principal de la aplicación */}
              <Row>
                <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Table dataSource={dataSource} columns={columns} />
                </Col>
              </Row>
            </Content>
          </div>
        }
      <Footer />
    </Layout>
  );
}

export default Tablas;