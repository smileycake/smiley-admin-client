import { connect } from "dva";
import { Divider, Input, Table, Pagination, Popconfirm, Button } from "antd";
import { routerRedux } from "dva/router";
import CakeDetail from "./CakeDetail";
import styles from "./Cakes.css";
import * as constants from "../constants";
import * as commonConstants from "../../../../utils/commonConstants";

function Cakes({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
  cakeDetailVisible
}) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
  }

  function createCakeHandler() {
    dispatch({
      type: "cakeDetail/createCake"
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/cakes/cakeList",
        query: { page }
      })
    );
  }

  function cakeClickHandler() {
    dispatch({
      type: "cakeDetail/fetchCakeDetail",
      payload: {
        cakeId: 2
      }
    });
  }

  const colums = [
    {
      key: "expand",
      width: "5%"
    },
    {
      title: constants.CAKE_NAME,
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: text => {
        return <a onClick={cakeClickHandler}>{text}</a>;
      }
    },
    {
      title: constants.CAKE_TYPE,
      dataIndex: "type",
      key: "type",
      width: "15%"
    },
    {
      title: constants.CAKE_COST,
      dataIndex: "cost",
      key: "cost",
      width: "15%"
    },
    {
      title: constants.CAKE_PRICE,
      dataIndex: "price",
      key: "price",
      width: "15%"
    },
    {
      title: constants.CAKE_GROUP_PURCHASE,
      dataIndex: "isGroupPurchase",
      key: "isGroupPurchase",
      width: "15%",
      render: isGroupPurchase => {
        let text = "";
        if (isGroupPurchase !== undefined) {
          text = isGroupPurchase ? "是" : "否";
        }
        return <span>{text}</span>;
      }
    },
    {
      title: commonConstants.TABLE_OPERATION,
      key: "operation",
      width: "20%",
      render: (text, { id }) => {
        return text.type === undefined ? null : (
          <span className={styles.operation}>
            <a href="">{commonConstants.OPERATION_EDIT}</a>
            <Divider type="vertical" />
            <Popconfirm
              title={commonConstants.ALERT_DELETE}
              onConfirm={deleteHandler.bind(null, id)}
            >
              <a href="">{commonConstants.OPERATION_DELETE}</a>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  return (
    <div className={styles.normal}>
      <div className={styles.operationPanel}>
        <div className={styles.create}>
          <Button type="primary" onClick={createCakeHandler}>
            {constants.CAKE_CREATE}
          </Button>
        </div>
        <div className={styles.search}>
          <Input placeholder={constants.CAKE_SEARCH_PLACEHOLDER} />
          <Button type="primary">{constants.CAKE_SEARCH}</Button>
        </div>
      </div>
      <Table
        loading={loading}
        columns={colums}
        dataSource={dataSource}
        rowKey={record => record.id}
        rowClassName={(record, index) => {
          if (record.type === undefined) {
            return styles.subRow;
          }
        }}
        expandIconAsCell={true}
        expandIconColumnIndex={0}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={commonConstants.PAGE_SIZE}
        onChange={pageChangeHandler}
      />
      <CakeDetail visible={cakeDetailVisible} editing={true} />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, cakeDetailVisible } = state.cakes;
  return {
    list,
    total,
    page,
    cakeDetailVisible,
    loading: state.loading.models.cakes
  };
}

export default connect(mapStateToProps)(Cakes);
