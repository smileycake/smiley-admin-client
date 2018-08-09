import { connect } from "dva";
import {
  Menu,
  Divider,
  Input,
  Table,
  Dropdown,
  Popconfirm,
  Button,
  Timeline,
  Card,
  Icon,
  Avatar,
  Row,
  Col,
  DatePicker,
  Form,
  Tag
} from "antd";
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../../utils/commonConstants";
import styles from "./orderTimeline.less";

function OrderTimeline({
  dispatch,
  list: dataSource,
  total,
  page: current,
  loading
}) {
  function createOrderHandler() {
    dispatch({
      type: "orderDetail/createOrder"
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/orders/orderList",
        query: { page }
      })
    );
  }

  function renderStatus(status) {
    let text = "";
    switch (status) {
      case 2:
        text = "已付款";
        break;
      case 3:
        text = "已完成";
        break;
      case 4:
        text = "已退款";
        break;
      default:
        text = "已下单";
    }
    return <span> {text} </span>;
  }

  function renderIsSelfPickUp(isSelfPickUp) {
    return isSelfPickUp ? <span> 是 </span> : <span> 否 </span>;
  }
  const mock = [
    {
      name: "爆浆海盐奶盖 - 巧克力",
      quantity: 1
    },
    {
      name: "爆浆海盐奶盖 - 抹茶",
      quantity: 1
    }
  ];
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <DatePicker style={{ marginBottom: 20 }} />
      <Timeline mode="alternate">
        <Timeline.Item
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <div style={{ display: "flex" }}>
            <Card
              className={styles.orderCard}
              bordered={false}
              title={
                <div className={styles.orderCardTitle}>
                  <div style={{ marginRight: "8px" }}>12:30</div>
                  <Tag color="#87d068">已完成</Tag>
                  <Tag color="#F5B041">有备注</Tag>
                  <Tag color="#F5B041">有自选</Tag>
                </div>
              }
              bodyStyle={{ padding: "8px" }}
              extra={
                <Dropdown overlay={menu} placement="bottomRight">
                  <Icon className={styles.orderCardMenu} type="ellipsis" />
                </Dropdown>
              }
            >
              <p>
                <Icon type="shopping-cart" style={{ marginRight: 10 }} />爆浆海盐奶盖
                - 巧克力 x 1、爆浆海盐奶盖 - 巧克力 x 1
              </p>
              <p>
                <Icon type="user" style={{ marginRight: 10 }} />李
              </p>
              <p>
                <Icon type="phone" style={{ marginRight: 10 }} />17717022621
              </p>
              <p>
                <Icon type="environment-o" style={{ marginRight: 10 }} />17717022621
              </p>
            </Card>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.orderList;
  return {
    list,
    total,
    page,
    loading: state.loading.models.orderList
  };
}

export default connect(mapStateToProps)(OrderTimeline);
