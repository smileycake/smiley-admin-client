import { connect } from "dva";
import {
  Divider,
  Drawer,
  Table,
  Pagination,
  Popconfirm,
  Button,
  Tag,
  Icon
} from "antd";
import { routerRedux } from "dva/router";
import * as commonConstants from "../../../utils/commonConstants";
import StockForm from "./StockForm";

function StockList({
  dispatch,
  stocks: dataSource,
  total,
  page: current,
  editingPanelVisible,
  currentEditingStock,
  loading
}) {
  function editingPanelVisibleHandler(visible) {
    const type = visible
      ? "stocks/openEditingPanel"
      : "stocks/closeEditingPanel";
    dispatch({
      type
    });
  }

  function setCurrentEditingStock(currentEditingStock) {
    dispatch({
      type: "stocks/setCurrentEditingStock",
      payload: {
        currentEditingStock
      }
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/stocks",
        query: { page }
      })
    );
  }

  function renderOperation(text, record, index) {
    return (
      <span>
        <span>
          <a
            onClick={() => {
              setCurrentEditingStock(record);
              editingPanelVisibleHandler(true);
            }}
          >
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
      <Button
        icon="plus"
        onClick={() => {
          const newStock = {
            name: "",
            price: 0,
            remain: 0,
            lowRemain: 0,
            unit: ""
          };
          setCurrentEditingStock(newStock);
          editingPanelVisibleHandler(true);
        }}
        style={{ marginBottom: 20 }}
      >
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
        <Table.Column
          title="名称"
          dataIndex="name"
          width="20%"
          render={(text, record, index) => {
            return (
              <>
                {" "}
                {text}{" "}
                {record.remain > record.lowRemain ? null : (
                  <Tag color="#EC7063" style={{ marginLeft: 10 }}>
                    库存紧张
                  </Tag>
                )}
              </>
            );
          }}
        />
        <Table.Column title="剩余" dataIndex="remain" width="20%" />
        <Table.Column title="单位" dataIndex="unit" width="20%" />
        <Table.Column title="单价" dataIndex="price" width="20%" />
        <Table.Column title="操作" render={renderOperation} width="20%" />
      </Table>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={commonConstants.PAGE_SIZE}
        onChange={pageChangeHandler}
      />

      <Drawer
        onClose={() => editingPanelVisibleHandler(false)}
        width={720}
        maskClosable={false}
        visible={editingPanelVisible}
        title="编辑库存"
        style={{
          height: "calc(100% - 55px)",
          overflow: "auto",
          paddingBottom: 53
        }}
      >
        <StockForm stock={currentEditingStock} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e8e8e8",
            padding: "10px 16px",
            textAlign: "right",
            left: 0,
            background: "#fff",
            borderRadius: "0 0 4px 4px"
          }}
        >
          <Button
            style={{
              marginRight: 8
            }}
          >
            Cancel
          </Button>
          <Button type="primary">Submit</Button>
        </div>
      </Drawer>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    stocks,
    total,
    page,
    editingPanelVisible,
    currentEditingStock
  } = state.stocks;
  return {
    stocks,
    total,
    page,
    editingPanelVisible,
    currentEditingStock,
    loading: state.loading.models.stocks
  };
}

export default connect(mapStateToProps)(StockList);
