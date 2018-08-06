import { connect } from "dva";
import { Divider, Input, Table, Pagination, Popconfirm, Button } from "antd";
import { routerRedux } from "dva/router";

function OrderList({
  dispatch,
  list: dataSource,
  total,
  page: current,
  loading
}) {}

function mapStateToProps(state) {
  const { list, total, page } = state.cakes;
  return {
    list,
    total,
    page,
    loading: state.loading.models.cakes
  };
}

export default connect(mapStateToProps)(OrderList);
