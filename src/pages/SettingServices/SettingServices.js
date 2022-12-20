import React, { useRef, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import PageHeading from '../../components/lib/PageHeading';
import PageButton from '../../components/lib/PageButton';
import { PAGE_SERVICES } from '../../utils/navigation';
import Category from './Category';
import { getAllCategories } from '../../features/services/servicesSlice';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from '../../components/lib/FormModal';
import ServicesForm from './Form';
import { createCategory } from '../../features/services/servicesSlice';

const SettingServices = () => {
  const dispath = useDispatch();
  const { categories } = useSelector((store) => store.services);
  const formRef = useRef(null);

  // const detailRef = useRef(null);

  // const { users, totalUser, singleUser } = useSelector((store) => store.user);

  const onAddClick = () => {
    formRef.current?.open();
  };

  const onEditClick = useCallback((data) => {
    console.log(data, 'dataonEditClick');
    formRef.current?.setEdit(data);
  }, []);

  // const onChange = useCallback((data = {}));

  const onEdit = useCallback(async (id, data) => {
    console.log(data, 'data');
    // return dispath(updateUser(updateData)).unwrap();
  }, []);

  const onSubmit = useCallback((data) => {
    const categoryData = {
      ...data,
      parent_id: data.parant_id === 0 ? null : data.parent_id,
    };
    return dispath(createCategory(categoryData)).unwrap();
  }, []);

  useEffect(() => {
    dispath(getAllCategories());
  }, []);

  return (
    <>
      <PageHeading title={PAGE_SERVICES.label}>
        <PageButton onAddClick={onAddClick} title={PAGE_SERVICES.label} />
      </PageHeading>
      <Tabs
        defaultActiveKey='1'
        // onChange={onChange}
        items={[
          {
            label: `Kateqoriyalar`,
            key: '1',
            children: <Category data={categories} onEditClick={onEditClick} />,
          },
          {
            label: `Paketlər`,
            key: '2',
            children: 'category element',
          },
        ]}
      />
      <FormModal
        ref={formRef}
        titleEdit={PAGE_SERVICES.label}
        title={PAGE_SERVICES.label}
        onEdit={onEdit}
        onSubmit={onSubmit}
      >
        {(isEditing) => (
          <ServicesForm
            isEditing={isEditing}
            data={categories}
            onEditClick={onEditClick}
          />
        )}
      </FormModal>
    </>
  );
};

export default SettingServices;
