import React, { useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import style from './Sidebar.module.scss';
import { getMenuItems } from './constant';
import logo from '../../../assets/sosaz logo.png';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    return getMenuItems();
  }, []);

  return (
    <Layout.Sider
      className={style.menu}
      collapsible
      collapsed={open}
      onCollapse={() => setOpen(!open)}
    >
      <div className={style.logo}>
        <img className={style.img} src={logo} alt='img' />
      </div>
      <Menu
        className={style.menutable}
        mode='inline'
        items={items}
        theme='light'
      />
    </Layout.Sider>
  );
}
