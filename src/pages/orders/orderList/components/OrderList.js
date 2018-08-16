import { connect } from "dva";
import {
  Divider,
  Input,
  Table,
  Pagination,
  Popconfirm,
  Button,
  Tag,
  Icon
} from "antd";
import OrderDetail from "../../components/OrderDetail";
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../../utils/commonConstants";
import styles from "./orderList.less";

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
    switch (status) {
      case 1:
        return <Tag color="#EC7063">未付款</Tag>;
      case 2:
        return <Tag color="#3498DB">已付款</Tag>;
      case 3:
        return <Tag color="#52BE80">已完成</Tag>;
    }
  }

  function renderIsSelfPickUp(isSelfPickUp) {
    return isSelfPickUp ? <span> 是 </span> : <span> 否 </span>;
  }

  function renderOperation(text, { id }) {
    return (
      <span>
        <span>
          <a>
            <Icon type="edit" />
          </a>
        </span>
        <Divider type="vertical" />
        <Popconfirm title={commonConstants.ALERT_DELETE}>
          <a href="">
            <Icon type="delete" />
          </a>
        </Popconfirm>
      </span>
    );
  }

  function renderCakes(cakes, record, index) {
    return (
      <Table dataSource={cakes} pagination={false} showHeader={false}>
        <Table.Column dataIndex="name" />
        <Table.Column dataIndex="quantity" />
      </Table>
    );
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
        expandedRowRender={renderIsSelfPickUp}
      >
        <Table.Column dataIndex="orderId" title="订单编号" width="10%" />
        <Table.Column
          dataIndex="status"
          title="状态"
          width="5%"
          render={renderStatus}
        />
        <Table.Column
          dataIndex="cakes"
          title="订单内容"
          render={renderCakes}
          className={styles.orderListCakes}
        />
        <Table.Column dataIndex="price" title="总价" width="8%" />
        <Table.Column dataIndex="pickUpDate" title="取货日期" width="14%" />
        <Table.Column title="操作" width="10%" render={renderOperation} />
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
