import React from 'react';
import { List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export const LeftSidePanel = () => {
  const dataSource = ['RollerCoaster01', 'RollerCoaster02', 'RollerCoaster03'];

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 0,
        width: 600,
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
      }}
    >
      <List
        header={
          <div>Congrats! You have visited the list of roller coasters!</div>
        }
        bordered
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <CheckOutlined /> {item}
          </List.Item>
        )}
      />
    </div>
  );
};
