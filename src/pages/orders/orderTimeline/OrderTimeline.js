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

function OrderTimeline({ dispatch, orders, cakes, date, loading }) {
  const statusMenu = (
    <Menu>
      <Menu.Item key="noPay">未付款</Menu.Item>
      <Menu.Item key="paid">已付款</Menu.Item>
      <Menu.Item key="done">已完成</Menu.Item>
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

  function orderDetailHandler(index) {
    dispatch({
      type: "orderDetail/editOrder",
      payload: { order: orders[index], cakes }
    });
  }

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
      totalPrice += order.shouldPay - order.deliveryFee;
      paidPrice += order.realPay;
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
    let date = new Date();
    date.setHours(date.getHours() + 8);
    const order = {
      orderId: null,
      cakes: [],
      consignee: null,
      phone: null,
      isSelfPickUp: true,
      pickUpDate: date.toJSON().substring(0, 10),
      pickUpTime: date.toJSON().substring(11, 16),
      deliveryAddress: null,
      deliveryFee: 0,
      remark: null,
      shouldPay: 0,
      realPay: 0
    };
    dispatch({
      type: "orderDetail/editOrder",
      payload: { order, cakes }
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
        {orders.map((order, index) => {
          return (
            <Timeline.Item
              key={order.orderId}
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
                          <div
                            key={cake.specId}
                            className={styles.orderCardTitleCakes}
                          >
                            <Badge
                              count={cake.quantity}
                              style={{ backgroundColor: "#FFAEB9AA" }}
                            >
                              {cake.name + " - " + cake.spec}
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
                      onClick={orderDetailHandler.bind(null, index)}
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
                    {order.shouldPay}
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
  const { orders, date, cakes } = state.orderTimeline;

  return {
    orders,
    date,
    cakes,
    loading: state.loading.models.orderTimeline
  };
}

export default connect(mapStateToProps)(OrderTimeline);
