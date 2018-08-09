import { connect } from "dva";
import {
  Menu,
  Collapse,
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
  Tabs,
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
  const gridStyle = {
    flex: 1
  };
  const customPanelStyle = {
    borderRadius: 4,
    border: 1,
    overflow: "hidden"
  };
  return (
    <>
      <DatePicker style={{ marginBottom: 20 }} />
      <Timeline mode="alternate">
        <Timeline.Item
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <Card
            className={styles.orderCard}
            bordered={false}
            title={
              <div>
                <h1 style={{ marginBottom: 0 }}>12:30</h1>
                <div className={styles.orderCardTitle}>
                  <div style={{ marginRight: "8px", fontSize: 14 }}>
                    爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 巧克力 x 1
                  </div>
                  <Tag color="#87d068">已完成</Tag>
                  <Tag color="#F5B041">有备注</Tag>
                  <Tag color="#F5B041">有自选</Tag>
                </div>
              </div>
            }
            bodyStyle={{ padding: "8px" }}
            extra={
              <>
                <Button
                  shape="circle"
                  style={{ marginRight: 10 }}
                  icon="down"
                />
                <Button
                  shape="circle"
                  style={{ marginRight: 10 }}
                  icon="edit"
                />
                <Button shape="circle" icon="delete" />
              </>
            }
          />
        </Timeline.Item>
        <Timeline.Item
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <Card
            className={styles.orderCard}
            bordered={false}
            title={
              <div>
                <h1 style={{ marginBottom: 0 }}>12:30</h1>
                <div className={styles.orderCardTitle}>
                  <div style={{ marginRight: "8px", fontSize: 14 }}>
                    爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 巧克力 x 1
                  </div>
                  <Tag color="#87d068">已完成</Tag>
                  <Tag color="#F5B041">有备注</Tag>
                  <Tag color="#F5B041">有自选</Tag>
                </div>
              </div>
            }
            bodyStyle={{ padding: "8px" }}
            extra={
              <>
                <Button shape="circle" style={{ marginRight: 10 }} icon="up" />
                <Button
                  shape="circle"
                  style={{ marginRight: 10 }}
                  icon="edit"
                />
                <Button shape="circle" icon="delete" />
              </>
            }
          >
            <p>
              <Icon type="user" style={{ marginRight: 10 }} />李
            </p>
            <p>
              <Icon type="phone" style={{ marginRight: 10 }} />17729405831
            </p>
            <p>
              <Icon type="environment-o" style={{ marginRight: 10 }} />上海市
            </p>
          </Card>
        </Timeline.Item>
      </Timeline>
    </>
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
