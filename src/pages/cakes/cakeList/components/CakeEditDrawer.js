import { connect } from "dva";
import { Component } from "react";
import { Button, Drawer, Form, Input, Select, Col, Row } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const mockType = [{ id: 1, name: "奶油蛋糕" }, { id: 2, name: "慕斯" }];

class CakeEditDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.isEditing,
      cakeType: mockType,
      cakeDetailInfo: {}
    };
    this.cakeDetailVisibleHandler.bind(this);
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  cakeDetailVisibleHandler = () => {
    this.props.dispatch({
      type: "cakes/create",
      payload: {
        cakeDetailVisible: false
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { children, cakeDetail, cakeDetailVisible } = this.props;
    return (
      <div>
        <Drawer
          onClose={this.cakeDetailVisibleHandler}
          width={720}
          maskClosable={false}
          visible={cakeDetailVisible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="甜品名称">
                  {!this.state.isEditing
                    ? "aaa"
                    : getFieldDecorator("name", {
                        rules: [
                          { required: true, message: "please enter user name" }
                        ]
                      })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="甜品类型">
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        required: true,
                        message: "Please select your habitual residence!"
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.cakeType.map(type => {
                        return (
                          <Select.Option key={type.id} value={type.id}>
                            {type.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
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
          <div className={styles.formFooter}>
            <Button
              className={styles.cancelButton}
              onClick={this.visibleHandler}
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

function mapStateToProps(state) {
  const { cakeDetailVisible, cakeDetailInfo } = state.cakes;
  return {
    cakeDetailVisible,
    cakeDetailInfo
  };
}

export default connect(mapStateToProps)(Form.create()(CakeEditDrawer));
