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
import CommonModal from "../../../../components/CommonModal";
import styles from "./orderDetail.less";

const dataSource = {
  orderId: 1,
  cakes: [
    {
      cakeId: 2,
      cakeName: "爆浆海盐奶盖",
      specId: "2-1",
      specName: "巧克力",
      quantity: 1,
      price: 98,
      customize: [
        {
          materialId: 4,
          name: "草莓",
          price: 40,
          quantity: 2,
          totalPrice: 80
        },
        {
          materialId: 2,
          name: "糖",
          price: 20,
          quantity: 2,
          totalPrice: 40
        }
      ],
      totalPrice: 218
    }
  ],
  deliveryInfo: {
    receiverName: "aaa",
    phone: 17722222222,
    date: "2018.08.07",
    time: "12:08",
    isSelfPickUp: false,
    address: "地址地址地址地址地址地址",
    deliverFee: 20
  },
  pay: {
    amountPayable: 238,
    actuallyPayed: 238
  }
};

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
  const formItemLayout = {};
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
          dataSource={dataSource.cakes}
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
          <Form.Item {...formItemLayout} label="收货人">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="联系方式">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="配送方式">
            <Radio.Group options={options} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="取货时间">
            <DatePicker style={{ width: "50%", marginRight: 10 }} />
            <TimePicker style={{ width: "45%" }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="送货地址">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayout} label="配送费">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...formItemLayout} label="备注">
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
      className={styles.orderDetailPanel}
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
