import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Puerto Inteligente ©2023
    </AntFooter>
  );
}

export default Footer;
