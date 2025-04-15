import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import "./LayoutAdmin.scss"
import Header from "./Header";
import MenuSider from "./MenuSider";
import { Outlet } from "react-router-dom";


const { Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className="layout-admin__main">
          <Sider
            breakpoint="lg"
            className="layout-admin--sider"
            theme="light"
            collapsed={collapsed}
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider />
          </Sider>
          <Content className="layout-admin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;