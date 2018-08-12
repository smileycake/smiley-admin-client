import { connect } from "dva";
import {
  Button,
  Drawer,
  Form,
  Input,
  Col,
  Row,
  Spin,
  Divider,
  InputNumber,
  DatePicker,
  TimePicker,
  Table,
  Radio
} from "antd";
import CommonModal from "../../../components/CommonModal";
import styles from "./orderDetail.less";

const OrderDetailForm = Form.create()(props => {
  const options = [{ label: "自提", value: 1 }, { label: "送货", value: 2 }];

  function renderFooter() {
    return <span>aaaa</span>;
  }

  function renderOperation(text, record) {
    return (
      <span>
        <a href="javascript:;">删除</a>
      </span>
    );
  }
  return (
    <Form layout="vertical" hideRequiredMark>
      <Form.Item
        wrapperCol={{ span: 24, width: "100%" }}
        style={{ width: "100%" }}
      >
        <CommonModal>
          <Button icon="plus" style={{ marginBottom: 10 }}>
            添加蛋糕
          </Button>
        </CommonModal>
        <Table
          size="small"
          bordered
          rowClassName="editable-row"
          pagination={false}
          footer={renderFooter}
        >
          <Table.Column title="名称" dataIndex="cakeName" />
          <Table.Column title="规格" dataIndex="specName" />
          <Table.Column title="数量" dataIndex="quantity" />
          <Table.Column title="单价" dataIndex="price" />
          <Table.Column title="总价" dataIndex="price" />
          <Table.Column title="操作" render={renderOperation} />
        </Table>
      </Form.Item>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="收货人">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="联系方式">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="配送方式">
            <Radio.Group options={options} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="取货时间">
            <DatePicker style={{ width: "50%", marginRight: 10 }} />
            <TimePicker style={{ width: "45%" }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="送货地址">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="配送费">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="备注">
        <Input.TextArea />
      </Form.Item>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="应付">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="实付">
            <InputNumber style={{ width: "100%" }} />
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
      title="编辑订单"
      style={{
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: 53
      }}
    >
      {loading ? <Spin /> : <OrderDetailForm editing={editing} />}
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
  const { orderDetailInfo, editing, visible } = state.orderDetail;
  return {
    orderDetailInfo,
    editing,
    visible,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(OrderDetail);
