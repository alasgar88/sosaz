import React, { useEffect } from 'react';
import { Form, Input, Col, Row, TreeSelect, Spin, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { REQUIRED_FIELD_FILE } from '../../../utils/forms';
import { getAllCategories } from '../../../features/services/servicesSlice';

const PackageForn = ({ isEditing }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.packages);
  const { categories } = useSelector((store) => store.services);

  // select antd
  const options = [];
  for (let category of categories) {
    options.push({
      label: category.title,
      value: category.value,
    });
  }

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  //

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin
          size='large'
          direction='vertical'
          style={{
            width: '100%',
            marginTop: '20px',
          }}
        />
      ) : (
        <Row justify='space-between' style={{ margin: '20px 0px 30px 0px' }}>
          <Col span={3}></Col>
          <Col span={18}>
            <Form.Item label='Paket adı' name='title'>
              <Input placeholder='Paket adı daxil edin' />
            </Form.Item>
            <Form.Item label='Xidmətlər' name='services'>
              <Select
                mode='multiple'
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder='Xidmət əlavə edin'
                // defaultValue={['a10', 'c12']}
                defaultValue={[]}
                options={options}
              />
            </Form.Item>
            <Form.Item label='Qiymət' name='price'>
              <Input placeholder='Qiymət daxil edin' />
            </Form.Item>
            {/* {isEditing && <></>} */}
          </Col>
          <Col span={3}></Col>
        </Row>
      )}
    </>
  );
};

export default PackageForn;
