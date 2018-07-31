import React, { Component } from "react";
import { Form, Tabs, Input, Switch, Row, Col } from "antd";
import CakeMaterial from "./CakeMaterial";

class CakeSpec extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 2;
    const panes = [{ title: "新规格", key: "规格1", closable: false }];
    const specs = {};
    specs[panes[0].key] = this.getNewSpec();
    this.state = {
      specs,
      panes,
      activeKey: panes[0].key
    };
  }

  specsChangeHandler = specs => {
    const { onSpecChange } = this.props;
    if (onSpecChange) {
      onSpecChange(specs);
    }
  };

  onMaterialsChange = materials => {
    const { specs, activeKey } = this.state;
    specs[activeKey].materials = materials;
    this.setState({ specs });
    this.specsChangeHandler(specs);
  };

  onPriceChange = () => {};

  onGroupPurchaseChange = () => {};

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes, specs } = this.state;
    const activeKey = `规格${this.newTabIndex++}`;
    panes.push({
      title: "新规格",
      key: activeKey
    });
    specs[activeKey] = this.getNewSpec();
    this.setState({ specs, panes, activeKey });
    this.specsChangeHandler(specs);
  };

  remove = targetKey => {
    let specs = this.state.specs;
    let activeKey = this.state.activeKey;
    delete specs[targetKey];
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (activeKey === targetKey) {
      activeKey = panes[panes.length - 1].key;
    }
    this.setState({ specs, panes, activeKey });
    this.specsChangeHandler(specs);
  };

  getNewSpec = () => {
    return {
      name: "新规格",
      materials: [],
      price: null,
      isGroupPurchase: false
    };
  };

  render() {
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => (
          <Tabs.TabPane
            tab={pane.title}
            key={pane.key}
            closable={pane.closable}
          >
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item label="规格名称">
                  <Input
                    onChange={this.onPriceChange}
                    placeholder="please enter user name"
                  />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item label="售价">
                  <Input
                    onChange={this.onPriceChange}
                    placeholder="please enter user name"
                  />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="团购否">
                  <Switch
                    onChange={this.onGroupPurchaseChange}
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="配方">
              <CakeMaterial onMaterialsChange={this.onMaterialsChange} />
            </Form.Item>
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default CakeSpec;
