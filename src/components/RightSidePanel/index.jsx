import React from 'react';

import { Button, Rate } from 'antd';
import {
  CloseOutlined,
  CheckCircleTwoTone,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { RollerCoaster } from '../../models/rollercoaster';

export const RightSidePanel = ({
  rollerCoaster,
  closePanel,
  toggleCheckin,
}) => {
  if (!rollerCoaster) return null;

  const roller = new RollerCoaster(rollerCoaster);

  const closingPanel = () => {
    closePanel(null);
  };

  const togglingCheckin = () => {
    toggleCheckin(rollerCoaster);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        right: 0,
        width: 600,
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
        textAlign: 'left',
      }}
    >
      <div style={{ margin: 20 }}>
        <CloseOutlined style={{ float: 'right' }} onClick={closingPanel} />
        <h3>
          {roller.name} <Rate allowHalf defaultValue={roller.rating} disabled />
        </h3>
        <h4>
          {roller.park}, {roller.state}
          <p style={{ float: 'right' }}>
            {roller.checkin ? (
              <span>
                Oh, you visited it before!{' '}
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  onClick={togglingCheckin}
                />
              </span>
            ) : (
              <span>
                Take a look? <CheckCircleOutlined onClick={togglingCheckin} />
              </span>
            )}
          </p>
        </h4>
        <p>{roller.description}</p>
        <img
          src={roller.image}
          alt={roller.name + ' image'}
          style={{
            textAlign: 'center',
            maxWidth: 400,
          }}
        />
      </div>
    </div>
  );
};
