import { Component } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  Switch,
  Tabs
} from "antd";
import CakeSpecTabs from "./CakeSpecTabs";
import CakeMaterialTable from "./CakeMaterialTable";

class CakeEditDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

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
          style={{
            height: "calc(100% - 55px)",
            overflow: "auto",
            paddingBottom: 53
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <p>基本信息</p>
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
              <Form.Item label="配方">
                <CakeMaterialTable />
              </Form.Item>
            </Row>
            <Divider style={{ marginTop: 0 }} />
            <p>规格</p>
            <Row gutter={16}>
              <CakeSpecTabs>
                <Form.Item label="配方">
                  <Switch checkedChildren="有" unCheckedChildren="无" />
                  <CakeMaterialTable />
                </Form.Item>
                <Form.Item label="成本">
                  <Input placeholder="please enter user name" />
                </Form.Item>
                <Form.Item label="售价">
                  <Input placeholder="please enter user name" />
                </Form.Item>
                <Form.Item label="是否团购">
                  <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>
              </CakeSpecTabs>
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
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(CakeEditDrawer);
