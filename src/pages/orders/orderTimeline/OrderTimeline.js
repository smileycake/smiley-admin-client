import { connect } from "dva";
import {
  Dropdown,
  Menu,
  Badge,
  Button,
  Timeline,
  Card,
  Icon,
  DatePicker,
  Tag
} from "antd";
import { routerRedux } from "dva/router";
import OrderDetail from "../components/OrderDetail";
import styles from "./orderTimeline.less";
import moment from "moment";

function OrderTimeline({ dispatch, orders, date, loading }) {
  const statusMenu = (
    <Menu>
      <Menu.Item>未付款</Menu.Item>
      <Menu.Item>已付款</Menu.Item>
      <Menu.Item>已完成</Menu.Item>
    </Menu>
  );

  function dateChangeHandler(date, dateString) {
    dispatch(
      routerRedux.push({
        pathname: "/orders/orderTimeline",
        query: { date: dateString }
      })
    );
  }

  function orderDetailHandler(orderId) {}

  function renderOrderStatus(status) {
    switch (status) {
      case 1:
        return <Tag color="#EC7063">未付款</Tag>;
      case 2:
        return <Tag color="#3498DB">已付款</Tag>;
      case 3:
        return <Tag color="#52BE80">已完成</Tag>;
    }
  }

  function renderStatistic() {
    let totalPrice = 0;
    let paidPrice = 0;
    orders.forEach(order => {
      totalPrice += order.price;
      paidPrice += order.status === 3 ? order.price : 0;
    });
    return (
      <div className={styles.orderTimelineHeaderStatistic}>
        <span>今日总计：{orders.length}单</span>
        <span>应收: {totalPrice}￥</span>
        <span>实收: {paidPrice}￥</span>
      </div>
    );
  }

  function createOrderHandler() {
    dispatch({
      type: "orderDetail/createOrder"
    });
  }

  return (
    <>
      <OrderDetail />
      <div className={styles.orderTimelineHeader}>
        <DatePicker
          allowClear={false}
          style={{ marginBottom: 20 }}
          onChange={dateChangeHandler}
          value={moment(date, "YYYY-MM-DD")}
          className={styles.orderTimelineHeaderDatePicker}
        />
        {renderStatistic()}
        <Button onClick={createOrderHandler}>
          <Icon type="file-add" />添加订单
        </Button>
      </div>
      <Timeline>
        {orders.map(order => {
          return (
            <Timeline.Item
              dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
            >
              <Card
                className={styles.orderCard}
                bordered={false}
                title={
                  <div>
                    <h2>{order.pickUpTime}</h2>
                    <div className={styles.orderCardTitle}>
                      <Dropdown overlay={statusMenu} trigger={["click"]}>
                        {renderOrderStatus(order.status)}
                      </Dropdown>
                      {order.remark ? <Tag color="#F5B041">有备注</Tag> : null}
                      {order.cakes.map(cake => {
                        return (
                          <div className={styles.orderCardTitleCakes}>
                            <Badge
                              count={cake.quantity}
                              style={{ backgroundColor: "#FFAEB9AA" }}
                            >
                              {cake.name}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
                bodyStyle={{ padding: "8px" }}
                extra={
                  <>
                    <Button
                      shape="circle"
                      style={{ marginRight: 10 }}
                      icon="edit"
                    />
                    <Button shape="circle" icon="delete" />
                  </>
                }
              >
                <div className={styles.orderCardContent}>
                  <span>
                    <Icon type="user" />
                    {order.consignee}
                  </span>
                  <span>
                    <Icon type="phone" />
                    {order.phone}
                  </span>
                  <span>
                    <Icon type="environment-o" />
                    {order.deliveryAddress}
                  </span>
                  <br />
                  <span>
                    <Icon type="pay-circle-o" />
                    {order.price}
                  </span>
                  {order.remark ? (
                    <span>
                      <br />
                      <Icon type="info-circle-o" />
                      {order.remark}
                    </span>
                  ) : null}
                </div>
              </Card>
            </Timeline.Item>
          );
        })}
        <Timeline.Item
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <p style={{ paddingLeft: 16, paddingTop: 8 }}>没有更多了呦~</p>
        </Timeline.Item>
      </Timeline>
    </>
  );
}

function mapStateToProps(state) {
  const { orders, date } = state.orderTimeline;
  return {
    orders,
    date,
    loading: state.loading.models.orderTimeline
  };
}

export default connect(mapStateToProps)(OrderTimeline);
