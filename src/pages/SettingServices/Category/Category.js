import React, { useState, forwardRef } from 'react';
import style from './category.module.scss';
import { Card, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiFillEdit } from '../../../utils/icons';

const Category = ({ data, onEditClick }, ref) => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={style.category_container}>
        {data?.map((category, index) => {
          return (
            <Card
              title={category.title}
              bordered={false}
              style={{ width: 300 }}
              key={index}
            >
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                treeData={category?.children}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default forwardRef(Category);
