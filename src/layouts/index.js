import React from "react";
import { Layout, Breadcrumb, Menu, Icon } from "antd";
import Link from "umi/link";
import * as category from "./category";
import withRouter from "umi/withRouter";

function CommonLayout({ children, location }) {
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Header className="header">
        <div className="logo" />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} style={{ background: "#fff" }}>
          <Menu
            selectedKeys={[location.pathname]}
            mode="inline"
            theme="light"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home" />
                {category.HOME}
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              title={
                <span>
                  <Icon type="mail" />
                  <span>{category.CAKE_MANAGE}</span>
                </span>
              }
            >
              <Menu.Item key="/cakes/cakeList">
                <Link to="/cakes/cakeList">{category.CAKE_LIST}</Link>
              </Menu.Item>
              <Menu.Item key="/cakes/recipes">
                <Link to="/cakes/recipes">{category.CAKE_COMMON_RECIPE}</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/members">
              <Link to="/members">
                <Icon type="bars" />
                {category.MEMBER_MANAGE}
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              title={
                <span>
                  <Icon type="mail" />
                  <span>{category.ORDER_MANAGE}</span>
                </span>
              }
            >
              <Menu.Item key="/orders/orderList">
                <Link to="/orders/orderList">{category.ORDER_LIST}</Link>
              </Menu.Item>
              <Menu.Item key="/orders/orderTimeline">
                <Link to="/orders/orderTimeline">
                  {category.ORDER_TIMELINE}
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/stocks">
              <Link to="/stocks">
                <Icon type="bars" />
                {category.STOCK_MANAGE}
              </Link>
            </Menu.Item>
            <Menu.Item key="/analysis">
              <Link to="/analysis">
                <Icon type="bars" />
                {category.SALE_ANALYSIS}
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: "0 24px 24px", minHeight: "100%" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(CommonLayout);
