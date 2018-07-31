import { Component } from "react";
import { Button, Drawer, Form, Input, Select, Col, Row } from "antd";
import CakeSpec from "./CakeSpec";

class CakeEditDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fields: {
        name: {
          value: "benjycui"
        }
      }
    };
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  visibleHandler = event => {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { children } = this.props;
    return (
      <div>
        <span onClick={this.visibleHandler}>{children}</span>
        <Drawer
          onClose={this.visibleHandler}
          width={720}
          maskClosable={false}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="甜品名称">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "please enter user name" }
                    ]
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="甜品类型">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "Please select your habitual residence!"
                        }
                      ]
                    })(
                      <Select
                        style={{ flex: 5 }}
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                        <Select.Option value="tom">Tom</Select.Option>
                      </Select>
                    )}
                    <div style={{ flex: 1, marginLeft: 20 }}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon="plus"
                        size="small"
                      />
                    </div>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {getFieldDecorator("specs", {
                valuePropName: "specs",
                initialValue: {}
              })(
                <CakeSpec
                  onSpecChange={specs => {
                    this.props.form.setFieldsValue({
                      specs: specs
                    });
                  }}
                />
              )}
            </Row>
          </Form>
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
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(CakeEditDrawer);
