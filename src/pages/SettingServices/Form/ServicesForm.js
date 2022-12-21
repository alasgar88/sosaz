import { useEffect, useState } from 'react';
import { Form, Input, Col, Row, TreeSelect, Spin, Button } from 'antd';
import {
  getSingleCategory,
  changeCategoryStatus,
  setSingleCategoryStatus,
} from '../../../features/services/servicesSlice';

import {
  REQUIRED_FIELD_FILE,
  REQUIRED_FIELD_EMAIL_RULES,
  SETTING_USER_OPTIONS,
} from '../../../utils/forms';
import { useDispatch, useSelector } from 'react-redux';

const { Item } = Form;

const ServicesForm = ({ isEditing, data, onEditClick }) => {
  const [isMainCategory, setIsMainCategory] = useState(false);
  const dispatch = useDispatch();
  const { singleCategory, isLoading, singleCategoryStatus } = useSelector(
    (store) => store.services
  );

  const handleChange = (e) => {
    if (e === 0) {
      setIsMainCategory(true);
    } else {
      setIsMainCategory(false);
    }
    isEditing &&
      dispatch(getSingleCategory({ id: e }))
        .unwrap()
        .then((data) => {
          dispatch(setSingleCategoryStatus(data.status));
          onEditClick(data);
        });
  };

  const treeSelectData = [
    { key: 0, value: 0, title: 'Əsas kateqoriya' },
    ...data,
  ];

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
            <Form.Item
              label={`${
                isEditing ? 'Redaktə etmək üçün kateqoriya seçin' : 'Kateqoriya'
              }`}
              name='parent_id'
            >
              <TreeSelect
                treeData={isEditing ? data : treeSelectData}
                onChange={(e) => handleChange(e)}
                placeholder='Kateqoriya daxil edin'
              />
            </Form.Item>

            <Item
              name='name'
              label={`${
                isEditing
                  ? ' Yeni kateqoriya adı'
                  : isMainCategory
                  ? 'Əsas kateqoriya adı'
                  : 'Sub kateqoriya adı'
              }`}
              rules={REQUIRED_FIELD_FILE}
            >
              <Input placeholder='Sub kateqoriya daxil edin' />
            </Item>
            <Item name='price' label='Tarif'>
              <Input placeholder='Qiymət  daxil edin' />
            </Item>
            {isEditing && (
              <>
                {singleCategoryStatus && (
                  <Button
                    danger
                    style={{ marginTop: '15px' }}
                    disabled={isLoading}
                    onClick={() =>
                      dispatch(
                        changeCategoryStatus({ id: singleCategoryStatus })
                      )
                    }
                  >
                    {`${
                      singleCategoryStatus
                        ? 'Kateqoriyanı deaktiv et'
                        : 'Kateqoriyanı aktiv et'
                    }`}
                  </Button>
                )}
              </>
            )}
          </Col>
          <Col span={3}></Col>
        </Row>
      )}
    </>
  );
};

export default ServicesForm;
