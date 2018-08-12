import { connect } from "dva";
import { Button, Drawer, Spin } from "antd";
import OrderDetailForm from "./OrderDetailForm";

function OrderDetail({ dispatch, order, loading, visible }) {
  function visibleHandler(e) {
    dispatch({
      type: "orderDetail/closeOrderDetailPanel"
    });
  }

  return (
    <Drawer
      onClose={visibleHandler}
      width={720}
      maskClosable={false}
      visible={visible}
      title="编辑订单"
      style={{
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: 53
      }}
    >
      {loading ? <Spin /> : <OrderDetailForm order={order} />}
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
  );
}

function mapStateToProps(state) {
  const { order, visible } = state.orderDetail;
  return {
    order,
    visible,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(OrderDetail);
