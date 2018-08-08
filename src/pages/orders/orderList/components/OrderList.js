import { connect } from "dva";
import { Divider, Input, Table, Pagination, Popconfirm, Button } from "antd";
import OrderDetail from "./OrderDetail";
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../../utils/commonConstants";

function OrderList({
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

  return (
    <div>
      <Button type="primary" onClick={createOrderHandler}>
        添加订单
      </Button>
      <Table
        bordered
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      >
        <Table.Column dataIndex="orderId" title="订单编号" />
        <Table.Column dataIndex="status" title="状态" render={renderStatus} />
        <Table.ColumnGroup title="订单内容">
          <Table.Column title="蛋糕" />
          <Table.Column title="规格" />
          <Table.Column title="数量" />
          <Table.Column title="总价" />
        </Table.ColumnGroup>
        <Table.Column dataIndex="pickUpTime" title="取货时间" />
        <Table.Column
          dataIndex="isSelfPickUp"
          title="自提否"
          render={renderIsSelfPickUp}
        />
        <Table.Column title="操作" />
      </Table>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={commonConstants.PAGE_SIZE}
        onChange={pageChangeHandler}
      />
      <OrderDetail />
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

export default connect(mapStateToProps)(OrderList);
