import React from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Divider,
  InputNumber,
  DatePicker,
  TimePicker,
  Table,
  Radio
} from "antd";
import CommonModal from "../../../components/CommonModal";

class OrderDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelfPickUp: true
    };
  }

  deliveryTypeChange = e => {
    this.setState({
      isSelfPickUp: e.target.value
    });
  };

  renderFooter = () => {
    return <span>aaaa</span>;
  };

  renderOperation = (text, record) => {
    return (
      <span>
        <a href="javascript:;">删除</a>
      </span>
    );
  };

  render() {
    const { isSelfPickUp } = this.state;
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
            footer={this.renderFooter}
          >
            <Table.Column title="名称" dataIndex="cakeName" />
            <Table.Column title="规格" dataIndex="specName" />
            <Table.Column title="数量" dataIndex="quantity" />
            <Table.Column title="单价" dataIndex="price" />
            <Table.Column title="总价" dataIndex="price" />
            <Table.Column title="操作" render={this.renderOperation} />
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
              <Radio.Group
                onChange={this.deliveryTypeChange}
                value={isSelfPickUp}
              >
                <Radio value={true}>自提</Radio>
                <Radio value={false}>配送</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="取货时间">
              <DatePicker style={{ width: "50%", marginRight: 10 }} />
              <TimePicker style={{ width: "45%" }} format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        {isSelfPickUp ? null : (
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
        )}

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
  }
}

export default Form.create()(OrderDetailForm);
