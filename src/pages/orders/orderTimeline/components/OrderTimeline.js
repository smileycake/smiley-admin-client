import { connect } from "dva";
import { Button, Timeline, Card, Icon, DatePicker, Tag } from "antd";
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../../utils/commonConstants";
import styles from "./orderTimeline.less";
import moment from "moment";

function OrderTimeline({ dispatch, orders, date, loading }) {
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

  return (
    <>
      <DatePicker
        allowClear={false}
        style={{ marginBottom: 20 }}
        onChange={dateChangeHandler}
        value={moment(date, "YYYY-MM-DD")}
      />
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
                      {renderOrderStatus(order.status)}
                      {order.remark ? <Tag color="#F5B041">有备注</Tag> : null}
                      <span className={styles.orderCardTitleCakes}>
                        {order.cakes}
                      </span>
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
                  {order.remark ? (
                    <span>
                      <Icon type="info-circle-o" />
                      {order.remark}
                    </span>
                  ) : null}
                </div>
              </Card>
            </Timeline.Item>
          );
        })}
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
