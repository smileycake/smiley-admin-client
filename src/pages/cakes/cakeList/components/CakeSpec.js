import React, { Component } from "react";
import { Form, Tabs, Input, Switch, Row, Col, InputNumber } from "antd";
import CakeMaterial from "./CakeMaterial";

class CakeSpec extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 1;
    this.state = {
      ...this.props,
      activeKey: this.props.specs[0].key
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  onChange = specs => {
    this.props.onChange(specs);
  };

  materialsChangeHandler = selectedMaterials => {
    const { specs, activeKey } = this.state;
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.materials = selectedMaterials;
      }
    });
    this.onChange(specs);
  };

  specNameChangeHandler = event => {
    const { specs, activeKey } = this.state;
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.name = event.target.value;
      }
    });
    this.onChange(specs);
  };

  priceChangeHandler = price => {
    const { specs, activeKey } = this.state;
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.price = price;
      }
    });
    this.onChange(specs);
  };

  groupPurchaseChangeHandler = isGroupPurchase => {
    const { specs, activeKey } = this.state;
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.isGroupPurchase = isGroupPurchase;
      }
    });
    this.onChange(specs);
  };

  specTabChangeHandler = activeKey => {
    this.setState({ activeKey });
  };

  editSpecTabHandler = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { specs } = this.state;
    const activeKey = `规格${++this.newTabIndex}`;
    specs.push({
      key: "规格" + this.newTabIndex,
      name: "新规格",
      price: "0.00",
      materials: [],
      isGroupPurchase: false
    });
    this.setState({ activeKey });
    this.onChange(specs);
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    const specs = this.state.specs.filter(spec => {
      return spec.key !== targetKey;
    });
    if (activeKey === targetKey) {
      activeKey = specs[specs.length - 1].key;
    }
    this.setState({ activeKey });
    this.onChange(specs);
  };

  render() {
    const { editing, specs, cakeMaterials, activeKey } = this.state;
    return (
      <Tabs
        type={editing ? "editable-card" : "line"}
        onChange={this.specTabChangeHandler}
        activeKey={activeKey}
        onEdit={this.editSpecTabHandler}
      >
        {specs.map(spec => (
          <Tabs.TabPane
            tab={spec.name || "新规格"}
            key={spec.key}
            closable={spec.key === "规格1" ? false : true}
          >
            <Row>
              <Col span={10}>
                <Form.Item label="规格名称">
                  {editing ? (
                    <Input
                      style={{ width: 200 }}
                      onChange={this.specNameChangeHandler}
                      value={spec.name}
                    />
                  ) : (
                    spec.name
                  )}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="售价">
                  {editing ? (
                    <InputNumber
                      style={{ width: 200 }}
                      onChange={this.priceChangeHandler}
                      value={spec.price}
                      formatter={value =>
                        `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  ) : (
                    spec.price
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="团购否">
                  {editing ? (
                    <Switch
                      onChange={this.groupPurchaseChangeHandler}
                      checkedChildren="是"
                      unCheckedChildren="否"
                      checked={spec.isGroupPurchase}
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
                <CakeMaterial
                  selectedMaterials={spec.materials}
                  editing={editing}
                  cakeMaterials={cakeMaterials}
                  onMaterialsChange={this.materialsChangeHandler}
                />
              </Form.Item>
            </Row>
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default CakeSpec;
