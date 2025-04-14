import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',

                label: 'nav 1',
              },
              {
                key: '2',

                label: 'nav 2',
              },
              {
                key: '3',

                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#fff" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            // style={{
            //   fontSize: '16px',
            //   width: 64,
            //   height: 64,
            // }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,

            }}
          >
            Content
          </Content>
        </Layout> */}

        <Layout>
          <Sider className="layout-admin--sider">
            Menu Sider
          </Sider>
          <Content className="layout-admin--content">
            content
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;