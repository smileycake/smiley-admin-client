import React, { Component } from "react";
import { Form, Tabs, Input, Switch, Row, Col } from "antd";
import CakeMaterial from "./CakeMaterial";

class CakeSpec extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 1;
    this.state = {
      ...this.props,
      activeKey: this.props.specs[0].name
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
      activeKey: nextProps.specs[0].name
    });
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
    const { specs } = this.state;
    const activeKey = `规格${this.newTabIndex++}`;
    specs.push({
      name: "新规格",
      price: "0.00",
      materials: [],
      isGroupPurchase: false
    });
    this.setState({ specs, activeKey });
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

  render() {
    const { editing, specs, cakeMaterials, activeKey } = this.state;
    return (
      <Tabs
        type={editing ? "editable-card" : "line"}
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {specs.map(spec => (
          <Tabs.TabPane tab={spec.name} key={spec.name} closable={false}>
            <Row>
              <Col span={10}>
                <Form.Item label="规格名称">
                  {editing ? (
                    <Input onChange={this.onPriceChange} />
                  ) : (
                    spec.name
                  )}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="售价">
                  {editing ? (
                    <Input onChange={this.onPriceChange} />
                  ) : (
                    spec.price
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="团购否">
                  {editing ? (
                    <Switch
                      onChange={this.onGroupPurchaseChange}
                      checkedChildren="是"
                      unCheckedChildren="否"
                    />
                  ) : spec.isGroupPurchase ? (
                    "是"
                  ) : (
                    "否"
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item
                style={{ width: "100%" }}
                wrapperCol={{ span: 24 }}
                label="配方"
              >
                <CakeMaterial onMaterialsChange={this.onMaterialsChange} />
              </Form.Item>
            </Row>
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default CakeSpec;
