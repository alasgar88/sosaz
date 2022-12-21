import React from 'react';
import style from './packages.module.scss';
import { Card, Tooltip } from 'antd';
import { AiFillEdit } from '../../../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSinglePackageId } from '../../../features/packages/packagesSlice';

const Packages = ({ data, onEditClick }) => {
  const { categories } = useSelector((store) => store.services);
  const dispatch = useDispatch();

  const options = [];
  for (let category of categories) {
    options.push({
      label: category.title,
      value: category.value,
    });
  }
  return (
    <div className={style.packages_container}>
      {data.map((item, index) => {
        return (
          <Card
            className={style.package}
            key={index}
            title={item?.name}
            bordered={false}
            // style={{ width: 300 }}
            // bodyStyle
            extra={
              <Tooltip
                title={`${item?.name}i redaktə et `}
                onClick={() => {
                  dispatch(setSinglePackageId(item.id));
                  const { name, ...rest } = item;
                  onEditClick({ ...rest, title: name });
                }}
              >
                <AiFillEdit style={{ cursor: 'pointer' }} />
              </Tooltip>
            }
          >
            <ul className={style.package_body}>
              {item.services.map((item, index) => {
                return (
                  <li className={style.package_name} key={index}>
                    {item.service_id}
                  </li>
                );
              })}
            </ul>
          </Card>
        );
      })}
    </div>
  );
};

export default Packages;
