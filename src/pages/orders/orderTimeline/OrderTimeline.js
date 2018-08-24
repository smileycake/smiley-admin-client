import { connect } from "dva";
import {
  Dropdown,
  Menu,
  Button,
  Timeline,
  Card,
  Icon,
  DatePicker,
  Tag,
  Table,
  Collapse,
  BackTop
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
    let orderCount = 0;
    let totalPrice = 0;
    let paidPrice = 0;
    orders.forEach(order => {
      totalPrice += order.shouldPay - order.deliveryFee;
      paidPrice += order.realPay;
      orderCount += order.orders.length;
    });
    const customPanelStyle = {
      borderRadius: 4,
      border: "1px solid #e8e8e8",
      overflow: "hidden"
    };
    return (
      <Collapse defaultActiveKey="1" bordered={false}>
        <Collapse.Panel
          header={
            <div className={styles.orderTimelineHeaderStatistic}>
              <span>今日总计：{orderCount}单</span>
              <span>应收: ￥ {totalPrice}</span>
              <span>实收: ￥ {paidPrice}</span>
            </div>
          }
          key="1"
          style={customPanelStyle}
        >
          <Table
            bordered
            dataSource={[
              { cake: "爆浆海盐奶盖 / 巧克力 / 6寸", quantity: 4 },
              { cake: "爆浆海盐奶盖 / 抹茶 / 8寸 + 装饰", quantity: 1 }
            ]}
            size="small"
            showHeader={false}
            pagination={false}
          >
            <Table.Column dataIndex="cake" title="蛋糕" width="80%" />
            <Table.Column
              dataIndex="quantity"
              title="数量"
              width="20%"
              render={quantity => "x " + quantity}
            />
          </Table>
        </Collapse.Panel>
      </Collapse>
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
      <BackTop target={() => document.getElementById("content")} />
      <OrderDetail />
      <div className={styles.orderTimelineHeader}>
        <div>
          <DatePicker
            allowClear={false}
            style={{ marginBottom: 20 }}
            onChange={dateChangeHandler}
            value={moment(date, "YYYY-MM-DD")}
            className={styles.orderTimelineHeaderDatePicker}
          />
        </div>
        {renderStatistic()}
        <Button onClick={createOrderHandler}>
          <Icon type="file-add" />添加订单
        </Button>
      </div>
      <Timeline>
        {orders.map((order, index) => {
          return (
            <Timeline.Item
              key={index}
              dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
            >
              <Card
                className={styles.orderCard}
                bordered={false}
                title={
                  <div>
                    <h2>{order.pickUpTime}</h2>
                  </div>
                }
              >
                {order.orders.map((order, orderIndex) => {
                  return (
                    <Card.Grid
                      key={orderIndex}
                      className={styles.orderCardGrid}
                    >
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
                              <span style={{ marginRight: 10 }}>
                                {order.isSelfPickUp ? "自提" : "配送"}
                              </span>
                              <span style={{ marginRight: 10, fontSize: 12 }}>
                                合计: ¥ {order.realPay}
                              </span>
                              {order.isSelfPickUp ? null : (
                                <span style={{ fontSize: 12 }}>
                                  (含运费: ¥ {order.deliveryFee})
                                </span>
                              )}
                            </div>
                            <div>
                              <Dropdown
                                overlay={statusMenu}
                                trigger={["click"]}
                              >
                                {renderOrderStatus(order.status)}
                              </Dropdown>
                            </div>
                          </div>
                        }
                        className={styles.orderItem}
                      >
                        <Table
                          size="small"
                          dataSource={order.cakes}
                          pagination={false}
                          className={styles.orderItemCakeTable}
                          showHeader={false}
                        >
                          <Table.Column
                            dataIndex="name"
                            title="名称"
                            width="35%"
                          />
                          <Table.Column
                            dataIndex="taste"
                            title="口味"
                            width="20%"
                          />
                          <Table.Column
                            dataIndex="spec"
                            title="规格"
                            width="30%"
                          />
                          <Table.Column
                            dataIndex="quantity"
                            title="数量"
                            width="15%"
                            render={quantity => {
                              return "x " + quantity;
                            }}
                          />
                        </Table>
                        {order.remark ? (
                          <div
                            style={{
                              display: "flex",
                              padding: 10,
                              boxShadow: "0px 1px 0px #e8e8e8"
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                alignSelf: "center",
                                textAlign: "center"
                              }}
                            >
                              <Icon
                                type="info-circle-o"
                                style={{ fontSize: 15 }}
                              />
                            </div>
                            <div style={{ flex: 9, paddingRight: 10 }}>
                              <span>{order.remark}</span>
                            </div>
                          </div>
                        ) : null}
                        <div style={{ display: "flex", padding: 10 }}>
                          <div
                            style={{
                              flex: 1,
                              alignSelf: "center",
                              textAlign: "center"
                            }}
                          >
                            <Icon
                              type="environment-o"
                              style={{ fontSize: 20 }}
                            />
                          </div>
                          <div style={{ flex: 9, paddingRight: 10 }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <span>收货人: {order.consignee}</span>
                              <span>{order.phone}</span>
                            </div>
                            {order.isSelfPickUp ? null : (
                              <div>
                                <span>收货地址: {order.deliveryAddress}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Card.Grid>
                  );
                })}
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
