import { connect } from "dva";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Col,
  Row,
  Spin,
  Divider,
  InputNumber,
  DatePicker,
  TimePicker,
  Radio
} from "antd";

const OrderDetailForm = Form.create()(props => {
  const options = [{ label: "自提", value: 1 }, { label: "送货", value: 2 }];
  return (
    <Form layout="inline" hideRequiredMark>
      aa
      <Divider />
      <Row>
        <Col span={12}>
          <Form.Item label="收货人">
            <Input style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="联系方式">
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item label="取货时间">
          <DatePicker style={{ width: 150 }} />
          <TimePicker style={{ width: 150 }} />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="配送方式">
          <Radio.Group options={options} />
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Col span={8}>
          <Form.Item label="应付">
            <InputNumber style={{ width: 150 }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="配送费">
            <InputNumber style={{ width: 150 }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="实付">
            <InputNumber style={{ width: 150 }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

function OrderDetail({ dispatch, orderDetailInfo, loading, editing, visible }) {
  function visibleHandler(e) {
    dispatch({
      type: "orderDetail/showOrderDetailPanel",
      payload: {
        visible: false
      }
    });
  }

  return (
    <Drawer
      onClose={visibleHandler}
      width={720}
      maskClosable={false}
      visible={visible}
      title={orderDetailInfo.name === "" ? "添加甜品" : "甜品详情"}
      style={{
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: 53
      }}
    >
      {loading ? <Spin /> : <OrderDetailForm editing={editing} />}
    </Drawer>
  );
}

function mapStateToProps(state) {
  const { orderDetailInfo, editing, visible } = state.orderDetail;
  return {
    orderDetailInfo,
    editing,
    visible,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(OrderDetail);
