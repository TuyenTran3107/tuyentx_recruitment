import { Menu } from "antd";
import { BarsOutlined, ExceptionOutlined, FileSearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
function MenuSider() {
  const location = useLocation();
  const items =
    [
      {
        key: '/admin',
        icon: <FileSearchOutlined />,
        label: <Link to="/admin">Tổng quan</Link>
      },
      {
        key: "/info-company",
        icon: <UserOutlined />,
        label: <Link to="/info-company">Thông tin công ty</Link>
      },
      {
        key: "/job-manage",
        icon: <BarsOutlined />,
        label: <Link to="/job-manage">Quản lý việc làm</Link>
      },
      {
        key: '/cv-manage',
        label: <Link to="/cv-manage">Quản lý CV</Link>,
        icon: <ExceptionOutlined />
      }
    ]

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        // defaultSelectedKeys={['2']}
        selectedKeys={[location.pathname]}

        items={items}
      />
    </>
  )
}
export default MenuSider;