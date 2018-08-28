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
  Radio,
  Cascader
} from "antd";
import moment from "moment";

class OrderDetailForm extends React.Component {
  constructor(props) {
    super(props);
    const candidateCakes = this.props.cakes.map(cake => {
      const children = cake.tastes.map(taste => {
        return { id: taste.id, name: taste.name, children: taste.specs };
      });
      return { id: cake.id, name: cake.name, children };
    });
    this.state = {
      candidateCakes,
      selectedCake: null
    };
  }

  deliveryTypeChange = e => {
    this.props.form.setFieldsValue({ isSelfPickUp: e.target.value });
  };

  addCakeHandler = () => {
    const { candidateCakes, selectedCake } = this.state;
    const { form } = this.props;
    if (!selectedCake) {
      return;
    }
    const cakes = form.getFieldValue("cakes");
    let shouldPay = form.getFieldValue("shouldPay");
    candidateCakes.forEach(cake => {
      cake.children.forEach(taste => {
        taste.children.forEach(spec => {
          if (
            cake.id === selectedCake[0] &&
            taste.id === selectedCake[1] &&
            spec.id === selectedCake[2]
          ) {
            let existing = false;
            cakes.forEach(existingCake => {
              if (
                existingCake.cakeId === cake.id &&
                existingCake.tasteId === taste.id &&
                existingCake.specId === spec.id
              ) {
                shouldPay -= existingCake.quantity * existingCake.price;
                existingCake.quantity++;
                shouldPay += existingCake.quantity * existingCake.price;
                existing = true;
              }
            });
            if (!existing) {
              cakes.push({
                cakeId: cake.id,
                tasteId: taste.id,
                specId: spec.id,
                name: cake.name,
                taste: taste.name,
                spec: spec.name,
                quantity: 1,
                price: spec.price
              });
              shouldPay += spec.price;
            }
            form.setFieldsValue({
              cakes,
              shouldPay
            });
            return;
          }
        });
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { candidateCakes, selectedCake } = this.state;
    return (
      <Form layout="vertical" hideRequiredMark>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Cascader
            options={candidateCakes}
            expandTrigger="hover"
            placeholder="Please select"
            onChange={value => {
              this.setState({
                selectedCake: value
              });
            }}
            showSearch={(inputValue, path) => {
              return path.some(
                option =>
                  option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                  -1
              );
            }}
            fieldNames={{ label: "name", value: "id", children: "children" }}
          />
          <Button icon="plus" onClick={this.addCakeHandler}>
            添加蛋糕
          </Button>
        </div>
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
              pagination={false}
              footer={() => {
                return <span>合计: ￥{form.getFieldValue("shouldPay")}</span>;
              }}
            >
              <Table.Column title="名称" dataIndex="name" width="30%" />
              <Table.Column title="口味" dataIndex="taste" width="20%" />
              <Table.Column title="规格" dataIndex="spec" width="20%" />
              <Table.Column
                title="数量"
                dataIndex="quantity"
                width="10%"
                render={(text, record, index) => {
                  return (
                    <InputNumber
                      min={1}
                      size="small"
                      value={text}
                      onChange={quantity => {
                        let shouldPay = form.getFieldValue("shouldPay");
                        const cakes = form.getFieldValue("cakes");
                        shouldPay -= cakes[index].quantity * cakes[index].price;
                        cakes[index].quantity = quantity;
                        shouldPay += cakes[index].quantity * cakes[index].price;
                        form.setFieldsValue({
                          cakes,
                          shouldPay
                        });
                      }}
                    />
                  );
                }}
              />
              <Table.Column
                title="单价"
                dataIndex="price"
                width="10%"
                render={text => "￥ " + text}
              />
              <Table.Column
                title="操作"
                width="10%"
                render={(text, record, index) => {
                  return (
                    <a
                      onClick={() => {
                        const cakes = form.getFieldValue("cakes");
                        let shouldPay = form.getFieldValue("shouldPay");
                        let cake = cakes.splice(index, 1)[0];
                        shouldPay -= cake.quantity * cake.price;
                        form.setFieldsValue({
                          cakes,
                          shouldPay
                        });
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
        <Row
          gutter={16}
          style={{ display: form.getFieldValue("isSelfPickUp") ? "none" : "" }}
        >
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
