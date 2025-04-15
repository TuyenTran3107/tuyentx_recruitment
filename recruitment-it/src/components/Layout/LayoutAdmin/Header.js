import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  const { collapsed, setCollapsed } = props;

  return (
    <>
      <header className="header-admin">
        <div className={"header-admin__logo " + (collapsed && " header-admin__logo--collapsed")}>
          {collapsed ? (<span>ITA</span>) : (<span>IT Admin</span>)}
        </div>
        <div className="header-admin__buttons">
          <div className="header-admin__left" onClick={() => setCollapsed(!collapsed)}>
            <div className="header-admin__collapse">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          <div className="header-admin__right">
            <Link to="/admin">
              <Button className="header-admin__buttons--home">
                <HomeOutlined />
                Trang chủ
              </Button></Link>

            <Link to="/logout">
              <Button className="header-admin__buttons--logout">
                <LogoutOutlined />
                Đăng xuất
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
export default Header;