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
    this.convertedCakes = [];
    this.props.cakes.forEach(cake => {
      cake.specs.forEach(spec => {
        this.convertedCakes.push({
          id: spec.id,
          name: cake.name + "-" + spec.name,
          price: spec.price
        });
      });
    });
  }

  cakeChangeHandler = selectedCakeKeys => {
    const cakes = this.props.form.getFieldValue("cakes");
    let existingCakeKeys = cakes.map(cake => {
      return cake.specId;
    });
    let newCakes = [];
    newCakes.push(...cakes);
    this.props.cakes.forEach(cake => {
      cake.specs.forEach(spec => {
        if (
          selectedCakeKeys.includes(spec.id) &&
          !existingCakeKeys.includes(spec.id)
        ) {
          newCakes.push({
            cakeId: cake.id,
            specId: spec.id,
            name: cake.name,
            spec: spec.name,
            price: spec.price,
            quantity: 1
          });
        }
      });
    });
    this.props.form.setFieldsValue({
      cakes: newCakes
    });
    this.updateShouldPay();
  };

  deliveryTypeChange = e => {
    this.props.form.setFieldsValue({ isSelfPickUp: e.target.value });
  };

  updateShouldPay = () => {
    const cakes = this.props.form.getFieldValue("cakes");
    let shouldPay = 0;
    cakes.forEach(cake => {
      shouldPay += cake.price * cake.quantity;
    });
    this.props.form.setFieldsValue({ shouldPay });
  };

  render() {
    const isSelfPickUp = this.props.form.getFieldValue("isSelfPickUp");
    const { getFieldDecorator } = this.props.form;
    const selectedCakeKeys = (this.props.form.getFieldValue("cakes") || []).map(
      cake => {
        return cake.specId;
      }
    );
    return (
      <Form layout="vertical" hideRequiredMark>
        <CommonModal
          selectedKeys={selectedCakeKeys}
          dataSource={this.convertedCakes}
          title="选择蛋糕"
          rowKey="id"
          onOk={this.cakeChangeHandler}
          render={cake => cake.name}
        >
          <Button icon="plus" style={{ marginBottom: 10 }}>
            添加蛋糕
          </Button>
        </CommonModal>
        <Form.Item
          wrapperCol={{ span: 24, width: "100%" }}
          style={{ width: "100%" }}
        >
          {getFieldDecorator("cakes", {
            valuePropName: "dataSource"
          })(
            <Table
              size="small"
              bordered
              rowKey={record => record.specId}
              rowClassName="editable-row"
              pagination={false}
              footer={() => {
                return (
                  <span>
                    总计: ￥{this.props.form.getFieldValue("shouldPay")}
                  </span>
                );
              }}
            >
              <Table.Column title="名称" dataIndex="name" width="30%" />
              <Table.Column title="规格" dataIndex="spec" width="15%" />
              <Table.Column
                title="数量"
                dataIndex="quantity"
                width="15%"
                render={(text, record, index) => {
                  return (
                    <InputNumber
                      value={text}
                      onChange={quantity => {
                        const cakes = this.props.form.getFieldValue("cakes");
                        cakes[index].quantity = quantity;
                        this.props.form.setFieldsValue({ cakes });
                        this.updateShouldPay();
                      }}
                    />
                  );
                }}
              />
              <Table.Column title="单价" dataIndex="price" width="15%" />
              <Table.Column
                title="总价"
                width="15%"
                render={(text, record, index) => {
                  return record.price * record.quantity;
                }}
              />
              <Table.Column
                title="操作"
                width="10%"
                render={(text, record, index) => {
                  return (
                    <a
                      onClick={() => {
                        const cakes = this.props.form.getFieldValue("cakes");
                        const newCakes = [];
                        cakes.forEach((cake, i) => {
                          if (index !== i) {
                            newCakes.push(cake);
                          }
                        });
                        this.props.form.setFieldsValue({
                          cakes: newCakes
                        });
                        this.updateShouldPay();
                      }}
                    >
                      <Icon type="delete" />
                    </a>
                  );
                }}
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
