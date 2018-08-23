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
  Tag,
  Table
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

  const data = [
    { name: "爆浆海盐奶盖", taste: "巧克力", size: "8寸", quantity: 1 },
    { name: "爆浆海盐奶盖", taste: "酸奶奶油", size: "6寸", quantity: 2 }
  ];

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
        <Timeline.Item
          key="1"
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <Card
            className={styles.orderCard}
            bordered={false}
            title={
              <div>
                <h2>11:00</h2>
              </div>
            }
          >
            <Card.Grid style={{ width: "30%", padding: 0, margin: 10 }}>
              <Card
                actions={[
                  <Icon type="profile" />,
                  <Icon type="edit" />,
                  <Icon type="delete" />
                ]}
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center"
                    }}
                  >
                    <div>
                      <span style={{ marginRight: 10 }}>配送</span>
                      <span style={{ marginRight: 10, fontSize: 12 }}>
                        合计: ¥ 196.00
                      </span>
                      <span style={{ fontSize: 12 }}>(含运费: ¥ 12.00)</span>
                    </div>
                    <div>
                      <Dropdown overlay={statusMenu} trigger={["click"]}>
                        {renderOrderStatus(2)}
                      </Dropdown>
                    </div>
                  </div>
                }
                className={styles.orderItem}
              >
                <Table
                  size="small"
                  dataSource={data}
                  pagination={false}
                  className={styles.orderItemCakeTable}
                >
                  <Table.Column dataIndex="name" title="名称" width="30%" />
                  <Table.Column dataIndex="taste" title="口味" width="30%" />
                  <Table.Column dataIndex="size" title="规格" width="20%" />
                  <Table.Column dataIndex="quantity" title="数量" width="20%" />
                </Table>
                <div style={{ padding: 8 }}>
                  <div style={{ padding: 8 }}>
                    <span style={{ marginRight: 40 }}>
                      <Icon type="user" />
                      张三
                    </span>
                    <span>
                      <Icon type="phone" />
                      17777772222
                    </span>
                  </div>
                  <div style={{ padding: 8 }}>
                    <span>
                      <Icon type="environment-o" />
                      南开区鞍山西道天津大学北五村3-4-501
                    </span>
                  </div>
                </div>
              </Card>
            </Card.Grid>
            <Card.Grid style={{ width: "30%", padding: 0, margin: 10 }}>
              <Card
                actions={[
                  <Icon type="profile" />,
                  <Icon type="edit" />,
                  <Icon type="delete" />
                ]}
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center"
                    }}
                  >
                    <span>自提</span>
                    <div>
                      <Dropdown overlay={statusMenu} trigger={["click"]}>
                        {renderOrderStatus(2)}
                      </Dropdown>
                    </div>
                  </div>
                }
              >
                爆浆海盐奶盖 - 巧克力 x 1
                <span>
                  <br />
                  <Icon type="info-circle-o" />
                  aaa
                </span>
              </Card>
            </Card.Grid>
          </Card>
        </Timeline.Item>
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
