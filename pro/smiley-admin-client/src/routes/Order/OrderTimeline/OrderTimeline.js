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
  Collapse,
  Row,
  Col,
  Radio,
  Input,
  Menu,
} from 'antd';
import styles from './OrderTimeline.less';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

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

  renderStatistic = () => {
    const {
      orders: { orders },
    } = this.props;
    let orderCount = 0;
    let realPay = 0;
    let deliveryFee = 0;
    let cakes = {};
    orders.forEach(order => {
      orderCount += order.orders.length;
      order.orders.forEach(o => {
        o.cakes.forEach(cake => {
          let name = cake.name + ' / ' + cake.taste + ' / ' + cake.spec;
          cakes[name] = cakes[name] ? cakes[name] + cake.quantity : cake.quantity;
        });
        realPay += o.realPay;
        deliveryFee += o.deliveryFee;
      });
    });
    let dataSource = [];
    Object.getOwnPropertyNames(cakes).forEach(cake => {
      dataSource.push({ cake: cake, quantity: cakes[cake] });
    });
    return (
      <Collapse defaultActiveKey="1" bordered={false}>
        <Collapse.Panel
          header={
            <div className={styles.orderHeaderStatistic}>
              <span>今日总计：{orderCount}单</span>
              <span>
                合计: ￥ {realPay}
                {deliveryFee === 0 ? null : ' (含运费: ￥ ' + deliveryFee + ')'}
              </span>
            </div>
          }
          key="1"
          className={styles.orderHeaderStatisticPanel}
        >
          <Table
            bordered
            dataSource={dataSource}
            size="small"
            showHeader={false}
            pagination={false}
          >
            <Table.Column dataIndex="cake" title="蛋糕" width="80%" />
            <Table.Column
              dataIndex="quantity"
              title="数量"
              width="20%"
              render={quantity => 'x ' + quantity}
            />
          </Table>
        </Collapse.Panel>
      </Collapse>
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
      loading,
    } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    let dataSource = [];

    const menu = (
      <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <Menu.Item>3rd menu item</Menu.Item>
      </Menu>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <DatePicker
          allowClear={false}
          onChange={this.dateChangeHandler}
          value={moment(date, 'YYYY-MM-DD')}
          className={styles.orderHeaderDatePicker}
        />
        <Radio.Group defaultValue="all">
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="progress">进行中</Radio.Button>
          <Radio.Button value="waiting">等待中</Radio.Button>
        </Radio.Group>
        <Input.Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );
    return (
      <PageHeaderLayout>
        <div className={styles.orderTimeline}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info
                  title="今日总计"
                  value={
                    <Dropdown overlay={menu}>
                      <span>
                        9单 <Icon type="down" />
                      </span>
                    </Dropdown>
                  }
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="今日共收款" value="$1000 (含运费 $20)" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title={
              <Button onClick={this.createOrderHandler}>
                <Icon type="file-add" />添加订单
              </Button>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Timeline>
              {loading
                ? null
                : orders.map((order, index) => {
                    return (
                      <Timeline.Item
                        key={index}
                        dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
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
                              <Card.Grid key={orderIndex} className={styles.orderCardGrid}>
                                <Card
                                  actions={[<Icon type="edit" />, <Icon type="delete" />]}
                                  title={
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <div>
                                        <span style={{ marginRight: 10 }}>
                                          {order.isSelfPickUp ? '自提' : '配送'}
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
                                        <Dropdown overlay={this.statusMenu} trigger={['click']}>
                                          {this.renderOrderStatus(order.status)}
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
                                    <Table.Column dataIndex="name" title="名称" width="35%" />
                                    <Table.Column dataIndex="taste" title="口味" width="20%" />
                                    <Table.Column dataIndex="spec" title="规格" width="30%" />
                                    <Table.Column
                                      dataIndex="quantity"
                                      title="数量"
                                      width="15%"
                                      render={quantity => {
                                        return 'x ' + quantity;
                                      }}
                                    />
                                  </Table>
                                  {order.remark ? (
                                    <div
                                      style={{
                                        display: 'flex',
                                        padding: 10,
                                        boxShadow: '0px 1px 0px #e8e8e8',
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
                                  <div style={{ display: 'flex', padding: 10 }}>
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
                                </Card>
                              </Card.Grid>
                            );
                          })}
                        </Card>
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
