import React, { useState } from 'react';
import './App.css';
import { Layout, Button } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
// import { HeadComponent as Header } from './components/Header';
import { MapWrapper } from './components/MapWrapper';
import { LeftSidePanel } from './components/LeftSidePanel';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [leftSidePanelCollapsed, setLeftSidePanelCollapsed] = useState(true);

  const toggle = () => {
    setLeftSidePanelCollapsed(!leftSidePanelCollapsed);
  };

  return (
    <div className="App">
      {leftSidePanelCollapsed ? null : <LeftSidePanel />}
      <Layout
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: red.primary,
          }}
        >
          <Button icon={<TrophyOutlined />} onClick={toggle}></Button>
          <h3 style={{ color: 'white' }}>Roller Coaster King</h3>
        </Header>
        <Content style={{ flex: '1 0 auto' }}>
          <MapWrapper />
        </Content>
        {/* <LeftSidePanel /> */}
        <Footer>Credit by XXX</Footer>
      </Layout>
    </div>
  );
}

export default App;
