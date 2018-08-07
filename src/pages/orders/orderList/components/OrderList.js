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

  return (
    <div>
      <Button type="primary" onClick={createOrderHandler}>
        添加订单
      </Button>
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
    loading: state.loading.models.cakes
  };
}

export default connect(mapStateToProps)(OrderList);
