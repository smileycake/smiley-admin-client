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
  Table,
  Radio
} from "antd";
import styles from "./OrderDetail.css";

const OrderDetailForm = Form.create()(props => {
  const options = [{ label: "自提", value: 1 }, { label: "送货", value: 2 }];

  function renderFooter() {
    return <span>aaaa</span>;
  }

  return (
    <Form layout="inline" hideRequiredMark>
      <Form.Item
        wrapperCol={{ span: 24, width: "100%" }}
        style={{ width: "100%" }}
      >
        <Table
          size="small"
          bordered
          rowClassName="editable-row"
          pagination={false}
          className={styles.tableBody}
          footer={renderFooter}
        >
          <Table.Column title="名称" dataIndex="name" width="12%" />
          <Table.Column title="规格" dataIndex="name" width="10%" />
          <Table.Column title="数量" dataIndex="quantity" width="7%" />
          <Table.Column title="单价" dataIndex="price" width="7%" />
          <Table.ColumnGroup title="自选" width="46%">
            <Table.Column title="名称" />
            <Table.Column title="数量" />
            <Table.Column title="单价" />
            <Table.Column title="操作" className={styles.borderRight} />
          </Table.ColumnGroup>
          <Table.Column title="总价" dataIndex="price" width="10%" />
          <Table.Column title="操作" width="8%" />
        </Table>
        <Button icon="plus" style={{ width: "100%" }}>
          添加蛋糕
        </Button>
      </Form.Item>
      <Divider />
      <Row>
        <Col span={7}>
          <Form.Item label="收货人">
            <Input style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="联系方式">
            <InputNumber style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="取货时间">
            <DatePicker style={{ width: 120, marginRight: 10 }} />
            <TimePicker style={{ width: 120 }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item label="备注">
          <Input />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="配送方式">
          <Radio.Group options={options} />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="送货地址">
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="配送费">
          <InputNumber style={{ width: 150 }} />
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
      width={1000}
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
