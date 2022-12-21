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
import {
  createCategory,
  setSingleCategoryStatus,
  updateCategory,
} from '../../features/services/servicesSlice';
import { AiFillEdit } from '../../utils/icons';

const SettingServices = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.services);
  const formRef = useRef();

  // const detailRef = useRef(null);

  // const { users, totalUser, singleUser } = useSelector((store) => store.user);

  const onAddClick = useCallback(() => {
    formRef.current?.open();
  }, []);

  const onEditClick = useCallback((data) => {
    formRef.current?.setEdit(data);
  }, []);

  const onCloseClick = useCallback(() => {
    formRef.current?.resetFormField();
    dispatch(setSingleCategoryStatus());
  }, []);

  const onEdit = useCallback((data) => {
    console.log(data, 'data onEdit');
    const categoryData = { ...data, photo: 'test' };
    return dispatch(updateCategory(categoryData)).unwrap();
  }, []);

  const onSubmit = (data) => {
    const categoryData = {
      ...data,
      parent_id: data.parant_id === 0 ? null : data.parent_id,
      photo: 'test photo',
    };
    return dispatch(createCategory(categoryData)).unwrap();
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <PageHeading title={PAGE_SERVICES.label}>
        <div
          className='button-container'
          style={{ width: '50px', display: 'flex', gap: '0 5px' }}
        >
          <PageButton onAddClick={onAddClick} title={PAGE_SERVICES.label} />
          <PageButton
            onAddClick={onEditClick}
            title='Kateqoriya'
            // icon={<AiFillEdit />}
          />
        </div>
      </PageHeading>
      <Tabs
        defaultActiveKey='1'
        // onChange={onChange}
        items={[
          {
            label: `Kateqoriyalar`,
            key: '1',
            children: <Category data={categories} />,
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
        onCloseClick={onCloseClick}
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
