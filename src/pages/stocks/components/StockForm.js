import React from "react";
import { Form, Icon, Input, Col, Row, InputNumber } from "antd";

class StockForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="名称">
              {getFieldDecorator("name")(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="单价">
              {getFieldDecorator("price")(
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="剩余">
              {getFieldDecorator("remain")(
                <InputNumber style={{ width: "100%" }} />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="单位">
              {getFieldDecorator("unit")(<Input />)}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="库存下限">
          {getFieldDecorator("lowRemain")(
            <InputNumber style={{ width: "100%" }} />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        value: props.stock.name
      }),
      price: Form.createFormField({
        value: props.stock.price
      }),
      unit: Form.createFormField({
        value: props.stock.unit
      }),
      remain: Form.createFormField({
        value: props.stock.remain
      }),
      lowRemain: Form.createFormField({
        value: props.stock.lowRemain
      })
    };
  }
})(StockForm);
