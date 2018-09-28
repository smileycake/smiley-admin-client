import React, { Component } from 'react';
import {
  Dropdown,
  Button,
  Timeline,
  Card,
  Icon,
  DatePicker,
  Tag,
  Table,
  Row,
  Col,
  Radio,
  Input,
  Menu,
  List,
} from 'antd';
import styles from './OrderTimeline.less';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { Fragment } from 'react';

@connect(({ orders, loading }) => ({
  orders,
  loading: loading.models.order,
}))
export default class OrderTimeline extends Component {
  state = {
    date: '2018-08-29',
  };

  statusMenu = (
    <Menu>
      <Menu.Item key="noPay">未付款</Menu.Item>
      <Menu.Item key="paid">已付款</Menu.Item>
      <Menu.Item key="done">已完成</Menu.Item>
    </Menu>
  );

  componentDidMount() {
    const { dispatch } = this.props;
    const { date } = this.state;
    dispatch({
      type: 'orders/fetchOrders',
      payload: {
        date,
      },
    });
  }

  dateChangeHandler = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  orderDetailHandler = index => {
    dispatch({
      type: 'orderDetail/editOrder',
      payload: { order: orders[index], cakes },
    });
  };

  renderOrderStatus = status => {
    switch (status) {
      case 1:
        return <Tag color="#EC7063">未付款</Tag>;
      case 2:
        return <Tag color="#3498DB">已付款</Tag>;
      case 3:
        return <Tag color="#52BE80">已完成</Tag>;
    }
  };

  renderHeader = () => {
    const {
      orders: { orders },
    } = this.props;

    let orderCount = 0;
    let realPay = 0;
    let deliveryFee = 0;
    let cakes = {};
    let cakeCount = 0;
    let selfPickUpOrderCount = 0;
    let deliveryOrderCount = 0;
    orders.forEach(order => {
      orderCount += order.orders.length;
      order.orders.forEach(o => {
        o.cakes.forEach(cake => {
          let name = cake.name + ' / ' + cake.taste + ' / ' + cake.spec;
          cakes[name] = cakes[name] ? cakes[name] + cake.quantity : cake.quantity;
          cakeCount += cake.quantity;
        });
        realPay += o.realPay;
        deliveryFee += o.deliveryFee;
        selfPickUpOrderCount += o.isSelfPickUp ? 1 : 0;
        deliveryOrderCount += o.isSelfPickUp ? 0 : 1;
      });
    });

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (
      <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <Info
              title="今日总计"
              value={
                orderCount +
                '单' +
                ' (自提' +
                selfPickUpOrderCount +
                '单' +
                ' 配送' +
                deliveryOrderCount +
                '单)'
              }
              bordered
            />
          </Col>
          <Col sm={8} xs={24}>
            <Info
              title="今日共计"
              value={
                <Dropdown
                  overlay={
                    <Menu>
                      {Object.keys(cakes).map(key => {
                        return (
                          <Menu.Item>
                            <div className={styles.cakeStatistic}>
                              <span>{key}</span>
                              <span>{'x ' + cakes[key]}</span>
                            </div>
                          </Menu.Item>
                        );
                      })}
                    </Menu>
                  }
                >
                  <span>
                    {cakeCount + '个甜品'} <Icon type="down" />
                  </span>
                </Dropdown>
              }
              bordered
            />
          </Col>
          <Col sm={8} xs={24}>
            <Info
              title="今日共收款"
              value={
                '￥' + realPay + (deliveryFee === 0 ? null : ' (含运费:￥' + deliveryFee + ')')
              }
            />
          </Col>
        </Row>
      </Card>
    );
  };

  createOrderHandler = () => {
    let date = new Date();
    date.setHours(date.getHours() + 8);
  };

  render() {
    const { date } = this.state;
    const {
      orders: { orders },
    } = this.props;

    const extraContent = (
      <Fragment>
        <DatePicker
          className={styles.datePicker}
          allowClear={false}
          onChange={this.dateChangeHandler}
          value={moment(date, 'YYYY-MM-DD')}
        />
        <Radio.Group defaultValue="all">
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="progress">自提</Radio.Button>
          <Radio.Button value="waiting">配送</Radio.Button>
        </Radio.Group>
        <Input.Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </Fragment>
    );

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: (name, record) => {
          return (
            <Fragment>
              <div>
                <span>{name}</span>
              </div>
              <Tag>{record.taste}</Tag>
              <Tag>{record.spec}</Tag>
            </Fragment>
          );
        },
      },
      {
        dataIndex: 'quantity',
        render: quantity => {
          return (
            <Fragment>
              <div>
                <span>¥ 201</span>
              </div>
              x {quantity}
            </Fragment>
          );
        },
      },
    ];

    return (
      <PageHeaderLayout>
        <div className={styles.orderTimeline}>
          {this.renderHeader()}
          <Card
            bordered={false}
            title={
              <Button type="primary" icon="file-add" onClick={this.createOrderHandler}>
                添加订单
              </Button>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Timeline>
              {orders.map((order, index) => {
                return (
                  <Timeline.Item
                    key={index}
                    dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
                  >
                    <h2>{order.pickUpTime}</h2>
                    <List
                      rowKey="id"
                      grid={{ gutter: 24, md: 2, sm: 1, xs: 1 }}
                      dataSource={order.orders}
                      renderItem={order => (
                        <List.Item key={order.id}>
                          <Card
                            hoverable
                            className={styles.orderCard}
                            actions={[<Icon type="edit" />, <Icon type="delete" />]}
                            title={
                              <div className={styles.title}>
                                <div>
                                  <Tag color="#543219">{order.isSelfPickUp ? '自提' : '配送'}</Tag>
                                  <div className={styles.orderInfo}>
                                    <span>订单编号: {order.orderId}</span>
                                    <span style={{ fontSize: 12 }}>
                                      合计: ¥ {order.realPay}
                                      {!order.isSelfPickUp &&
                                        '(含运费: ¥ ' + order.deliveryFee + ')'}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <Dropdown overlay={this.statusMenu} trigger={['click']}>
                                    {this.renderOrderStatus(order.status)}
                                  </Dropdown>
                                </div>
                              </div>
                            }
                          >
                            <Table
                              className={styles.cakeTable}
                              size="small"
                              dataSource={order.cakes}
                              pagination={false}
                              showHeader={false}
                              columns={columns}
                            />
                            <div
                              style={{
                                display: 'flex',
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                borderBottom: '1px solid #e8e8e8',
                              }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  alignSelf: 'center',
                                  textAlign: 'center',
                                }}
                              >
                                <Icon type="environment-o" style={{ fontSize: 20 }} />
                              </div>
                              <div style={{ flex: 9, paddingRight: 10 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
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
                            {order.remark ? (
                              <div
                                style={{
                                  display: 'flex',
                                  padding: 10,
                                  borderBottom: '1px solid #e8e8e8',
                                }}
                              >
                                <div
                                  style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Icon type="info-circle-o" style={{ fontSize: 15 }} />
                                </div>
                                <div style={{ flex: 9, paddingRight: 10 }}>
                                  <span>{order.remark}</span>
                                </div>
                              </div>
                            ) : null}
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Timeline.Item>
                );
              })}
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                <p style={{ paddingLeft: 16, paddingTop: 8 }}>没有更多了呦~</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
