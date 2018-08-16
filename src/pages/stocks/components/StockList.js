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
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../utils/commonConstants";

function StockList({
  dispatch,
  stocks: dataSource,
  total,
  page: current,
  loading
}) {
  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/stocks",
        query: { page }
      })
    );
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

  return (
    <div>
      <Button icon="plus" style={{ marginBottom: 20 }}>
        新库存
      </Button>
      <Table
        size="small"
        bordered
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      >
        <Table.Column title="名称" dataIndex="name" width="20%" />
        <Table.Column title="剩余" dataIndex="remain" width="20%" />
        <Table.Column title="库存下限" dataIndex="lowRemain" width="20%" />
        <Table.Column title="单位" dataIndex="unit" width="15%" />
        <Table.Column title="单价" dataIndex="price" width="15%" />
        <Table.Column title="操作" render={renderOperation} width="10%" />
      </Table>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={commonConstants.PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { stocks, total, page } = state.stocks;
  return {
    stocks,
    total,
    page
  };
}

export default connect(mapStateToProps)(StockList);
