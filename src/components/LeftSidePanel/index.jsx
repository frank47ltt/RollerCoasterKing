import React from 'react';
import { List } from 'antd';

export const LeftSidePanel = ({ dataSource }) => {
  let visited = false;
  if (dataSource && dataSource.length) {
    visited = dataSource.some((el) => el.checkin);
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 0,
        width: 400,
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
      }}
    >
      {!visited ? (
        <h4>Sorry, you have not visited any roller coasters...</h4>
      ) : (
        <List
          header={
            <h4>Congrats! You have visited the list of roller coasters!</h4>
          }
          bordered
          dataSource={dataSource}
          renderItem={(item) =>
            item.checkin ? <List.Item>{item.name}</List.Item> : null
          }
        />
      )}
    </div>
  );
};
