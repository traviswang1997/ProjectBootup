import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import {
  HomeOutlined,
  DashboardOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="inline"
        >
            <Menu.Item key="/">
            <HomeOutlined />
            <span>Home</span>
            <Link to="/home"></Link>
            </Menu.Item>

            <Menu.Item key="/login">
            <TeamOutlined />
            <span>Login</span>
            <Link to="/login"></Link>
            </Menu.Item>

            <Menu.Item key="/Project">
            <DashboardOutlined />
            <span>Project</span>
            <Link to="/project"></Link>
            </Menu.Item>

            <Menu.Item key="/Bitbucket">
            <DashboardOutlined />
            <span>Bitbucket</span>
            <Link to="/bitbucket"></Link>
            </Menu.Item>

            <Menu.Item key="/Slack">
            <DashboardOutlined />
            <span>Slack</span>
            <Link to="/slack"></Link>
            </Menu.Item>
        </Menu>
        </Sider>
  );
};

export default SideMenu;