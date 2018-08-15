import React from "react";
import {
  Button,
  Form,
  Icon,
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
import moment from "moment";
import CommonModal from "../../../components/CommonModal";

class OrderDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelfPickUp: this.props.order.isSelfPickUp,
      allCakes: this.props.cakes
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cakes: nextProps.cakes
    });
  }

  cakeChangeHandler = selectedCakes => {
    const newCakes = [];
    selectedCakes.forEach(cake => {
      newCakes.push({
        cakeId: cake.cakeId,
        specId: cake.key,
        name: cake.cakeName,
        spec: cake.specName,
        price: cake.price,
        quantity: 1
      });
    });
    this.props.form.setFieldsValue({
      cakes: newCakes
    });
  };

  deliveryTypeChange = e => {
    this.setState({
      isSelfPickUp: e.target.value
    });
  };

  renderFooter = () => {
    return <span>aaaa</span>;
  };

  renderOperation = (text, record, index) => {
    return (
      <a
        onClick={() => {
          const cakes = this.props.form.getFieldValue("cakes");
          cakes.splice(index, 1);
          this.props.form.setFieldsValue({
            cakes
          });
        }}
      >
        <Icon type="delete" />
      </a>
    );
  };

  renderQuantity = (text, record, index) => {
    return (
      <InputNumber
        value={text}
        onChange={quantity => {
          const cakes = this.props.form.getFieldValue("cakes");
          cakes[index].quantity = quantity;
          this.props.form.setFieldsValue({ cakes });
        }}
      />
    );
  };

  renderTotalPriceEachCake = (text, record, index) => {
    return record.price * record.quantity;
  };

  render() {
    const { isSelfPickUp, allCakes } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" hideRequiredMark>
        <Form.Item
          wrapperCol={{ span: 24, width: "100%" }}
          style={{ width: "100%" }}
        >
          <CommonModal
            selectedDataSource={this.props.form.getFieldValue("cakes")}
            dataSource={allCakes}
            title="选择蛋糕"
            onOk={this.cakeChangeHandler}
          >
            <Button icon="plus" style={{ marginBottom: 10 }}>
              添加蛋糕
            </Button>
          </CommonModal>
          {getFieldDecorator("cakes", {
            valuePropName: "dataSource"
          })(
            <Table
              size="small"
              bordered
              rowClassName="editable-row"
              pagination={false}
              footer={this.renderFooter}
            >
              <Table.Column title="名称" dataIndex="name" width="30%" />
              <Table.Column title="规格" dataIndex="spec" width="15%" />
              <Table.Column
                title="数量"
                dataIndex="quantity"
                width="15%"
                render={this.renderQuantity}
              />
              <Table.Column title="单价" dataIndex="price" width="15%" />
              <Table.Column
                title="总价"
                render={this.renderTotalPriceEachCake}
                width="15%"
              />
              <Table.Column
                title="操作"
                render={this.renderOperation}
                width="10%"
              />
            </Table>
          )}
        </Form.Item>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="收货人">
              {getFieldDecorator("consignee")(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="联系方式">
              {getFieldDecorator("phone")(
                <InputNumber style={{ width: "100%" }} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="配送方式">
              {getFieldDecorator("isSelfPickUp")(
                <Radio.Group onChange={this.deliveryTypeChange}>
                  <Radio value={true}>自提</Radio>
                  <Radio value={false}>配送</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="取货时间">
              {getFieldDecorator("pickUpDate")(
                <DatePicker style={{ width: "48%", marginRight: 10 }} />
              )}
              {getFieldDecorator("pickUpTime")(
                <TimePicker style={{ width: "48%" }} format="HH:mm" />
              )}
            </Form.Item>
          </Col>
        </Row>
        {isSelfPickUp ? null : (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="送货地址">
                {getFieldDecorator("deliveryAddress")(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="配送费">
                {getFieldDecorator("deliveryFee")(
                  <InputNumber
                    formatter={value =>
                      `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        )}
        <Form.Item label="备注">
          {getFieldDecorator("remark")(<Input.TextArea />)}
        </Form.Item>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="应付">
              {getFieldDecorator("shouldPay")(
                <InputNumber
                  formatter={value =>
                    `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="实付">
              {getFieldDecorator("realPay")(
                <InputNumber
                  formatter={value =>
                    `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      cakes: Form.createFormField({
        value: props.order.cakes
      }),
      consignee: Form.createFormField({
        value: props.order.consignee
      }),
      phone: Form.createFormField({
        value: props.order.phone
      }),
      isSelfPickUp: Form.createFormField({
        value: props.order.isSelfPickUp
      }),
      pickUpDate: Form.createFormField({
        value: moment(props.order.pickUpDate, "YYYY-MM-DD")
      }),
      pickUpTime: Form.createFormField({
        value: moment(props.order.pickUpTime, "HH:mm")
      }),
      deliveryAddress: Form.createFormField({
        value: props.order.deliveryAddress
      }),
      deliveryFee: Form.createFormField({
        value: props.order.deliveryFee
      }),
      remark: Form.createFormField({
        value: props.order.remark
      }),
      shouldPay: Form.createFormField({
        value: props.order.shouldPay
      }),
      realPay: Form.createFormField({
        value: props.order.realPay
      })
    };
  }
})(OrderDetailForm);
