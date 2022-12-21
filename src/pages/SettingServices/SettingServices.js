import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Tabs } from 'antd';
import PageHeading from '../../components/lib/PageHeading';
import PageButton from '../../components/lib/PageButton';
import { PAGE_SERVICES } from '../../utils/navigation';
import Category from './Category';
import Packages from './Packages';
import PackagesForm from './PackagesForm';
import { getAllCategories } from '../../features/services/servicesSlice';
import {
  getAllPackages,
  createPackage,
  updatePackage,
} from '../../features/packages/packagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from '../../components/lib/FormModal';
import ServicesForm from './CategoryForm';
import {
  createCategory,
  setSingleCategoryStatus,
  updateCategory,
} from '../../features/services/servicesSlice';
import { AiFillEdit } from '../../utils/icons';

const SettingServices = () => {
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState(1);
  const { categories } = useSelector((store) => store.services);
  const { packages, singlePackageId } = useSelector((store) => store.packages);
  const formRef = useRef();
  console.log(tabKey, 'tabkey');
  console.log(packages, 'packages');

  const onAddClick = useCallback(() => {
    formRef.current?.open();
  }, [tabKey]);

  const onEditClick = useCallback((data) => {
    formRef.current?.setEdit(data);
  }, []);

  const onCloseClick = () => {
    formRef.current?.resetFormField();
    dispatch(setSingleCategoryStatus());
  };

  const onEdit = useCallback(
    (data) => {
      const categoryData = { ...data, photo: 'test' };
      console.log(categoryData, 'clean categry data');
      if (tabKey === '1') {
        return dispatch(updateCategory(categoryData)).unwrap();
      } else {
        let servicesOption = categoryData.services;
        if (categoryData.services[0] instanceof Object) {
          servicesOption = categoryData.services.map((item) => item.id);
        }

        return dispatch(
          updatePackage({
            id: singlePackageId,
            data: { ...categoryData, services: servicesOption },
          })
        ).unwrap();
      }
    },
    [singlePackageId, tabKey, dispatch]
  );

  const onSubmit = (data) => {
    if (tabKey === '1') {
      const categoryData = {
        ...data,
        photo: 'test photo',
      };
      return dispatch(createCategory(categoryData)).unwrap();
    } else {
      return dispatch(createPackage(data)).unwrap();
    }
  };

  useEffect(() => {
    tabKey === 1 ? dispatch(getAllCategories()) : dispatch(getAllPackages());
  }, [tabKey]);

  return (
    <>
      <PageHeading title={PAGE_SERVICES.label}>
        <div
          className='button-container'
          style={{ width: '50px', display: 'flex', gap: '0 5px' }}
        >
          <PageButton funtionProp={onAddClick} title={PAGE_SERVICES.label} />
          {tabKey === '1' && (
            <PageButton
              funtionProp={onEditClick}
              title='Kateqoriya'
              icon={<AiFillEdit />}
            />
          )}
        </div>
      </PageHeading>
      <Tabs
        defaultActiveKey='1'
        onChange={(e) => setTabKey(e)}
        items={[
          {
            label: `Kateqoriyalar`,
            key: '1',
            children: <Category data={categories} />,
          },
          {
            label: `Paketlər`,
            key: '2',
            children: <Packages data={packages} onEditClick={onEditClick} />,
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
        {tabKey === '1'
          ? (isEditing) => (
              <ServicesForm
                isEditing={isEditing}
                data={categories}
                onEditClick={onEditClick}
              />
            )
          : (isEditing) => (
              <PackagesForm
                isEditing={isEditing}
                // data={categories}
              />
            )}
      </FormModal>
    </>
  );
};

export default SettingServices;
