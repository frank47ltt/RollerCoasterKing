import React, { useState, useCallback } from 'react';
import './App.css';
import { Layout, Button } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
// import { HeadComponent as Header } from './components/Header';
import { MapWrapper } from './components/MapWrapper';
import { LeftSidePanel } from './components/LeftSidePanel';
import { RightSidePanel } from './components/RightSidePanel';
import { loadStorage, saveStorage } from './utils/loadLocalStorage';

import RollerCoastersJson from './data/rollercoasters.json';

const { Header, Footer, Content } = Layout;

function App() {
  // blackbox fn
  const initRollers = (function () {
    const rollers = RollerCoastersJson.features.map((feat) => feat.properties);
    const checkinInfo = loadStorage();
    if (!checkinInfo || !checkinInfo.length) return rollers;
    const t = rollers.map((roller) => {
      roller.checkin = !!checkinInfo.filter((r) => r.id === roller.id).checkin;
      return roller;
    });
    console.log(t);
    return t;
  })();

  const [rollerCoasters, setRollerCoasters] = useState(initRollers);

  const [leftSidePanelCollapsed, setLeftSidePanelCollapsed] = useState(true);

  const [rightSidePanelCollapsed, setRightSidePanelCollapsed] = useState(true);
  const [activeRollerCoaster, setActiveRollerCoaster] = useState(null);

  const toggleLeft = () => {
    setLeftSidePanelCollapsed(!leftSidePanelCollapsed);
  };

  const toggleRight = useCallback(
    (rollerCoaster) => {
      if (
        !rollerCoaster ||
        (activeRollerCoaster && rollerCoaster.id === activeRollerCoaster.id)
      ) {
        setActiveRollerCoaster(null);
        setRightSidePanelCollapsed(true);
        return;
      }

      setActiveRollerCoaster(rollerCoaster);
      setRightSidePanelCollapsed(false);
    },
    [activeRollerCoaster]
  );

  const updatingCheckin = () => {
    const updatedRoller = {
      ...activeRollerCoaster,
      checkin: !activeRollerCoaster.checkin,
    };

    // save change to specific
    setActiveRollerCoaster(updatedRoller);

    // save changes to arr
    const updatedRollers = rollerCoasters.map((item) =>
      item.id === activeRollerCoaster.id ? updatedRoller : item
    );
    setRollerCoasters(updatedRollers);

    console.log(updatedRollers);
    // save to local storage
    saveStorage(updatedRollers);
  };

  return (
    <div className="App">
      {leftSidePanelCollapsed ? null : (
        <LeftSidePanel dataSource={rollerCoasters} />
      )}
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
          <Button icon={<TrophyOutlined />} onClick={toggleLeft}></Button>
          <h3 style={{ color: 'white' }}>Roller Coaster King</h3>
        </Header>
        <Content style={{ flex: '1 0 auto' }}>
          <MapWrapper clickRollerCoaster={toggleRight} />
        </Content>
        {/* <LeftSidePanel /> */}
        <Footer>Credit by XXX</Footer>
      </Layout>
      {rightSidePanelCollapsed ? null : (
        <RightSidePanel
          rollerCoaster={activeRollerCoaster}
          closePanel={toggleRight}
          toggleCheckin={updatingCheckin}
        />
      )}
    </div>
  );
}

export default App;
