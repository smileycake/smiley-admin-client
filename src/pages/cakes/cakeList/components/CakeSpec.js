import React, { Component } from "react";
import {
  Form,
  Tabs,
  Input,
  Switch,
  Row,
  Col,
  Transfer,
  Table,
  InputNumber
} from "antd";
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
      ...nextProps,
      activeKey: nextProps.specs[0].key
    });
  }

  specsChangeHandler = specs => {
    const { onSpecChange } = this.props;
    if (onSpecChange) {
      onSpecChange(specs);
    }
  };

  onMaterialsChange = materialKeys => {
    const { specs, cakeMaterials, activeKey } = this.state;
    const materials = cakeMaterials.filter(material => {
      return materialKeys.includes(material.key);
    });
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.materials = materials;
      }
    });
    this.setState({ specs, selectedMaterialKeys: materialKeys });
  };

  onPriceChange = price => {
    const { specs, activeKey } = this.state;
    specs.forEach(spec => {
      if (spec.key === activeKey) {
        spec.price = price;
      }
    });
    this.setState({ specs });
  };

  onGroupPurchaseChange = () => {};

  onSpecTabChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
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
    this.setState({ specs, activeKey });
    this.specsChangeHandler(specs);
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    const specs = this.state.specs.filter(spec => {
      return spec.key !== targetKey;
    });
    if (activeKey === targetKey) {
      activeKey = specs[specs.length - 1].key;
    }
    this.setState({ specs, activeKey });
    this.specsChangeHandler(specs);
  };

  render() {
    const { editing, specs, cakeMaterials, activeKey } = this.state;
    return (
      <Tabs
        type={editing ? "editable-card" : "line"}
        onChange={this.onSpecTabChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {specs.map(spec => (
          <Tabs.TabPane
            tab={spec.name}
            key={spec.key}
            closable={spec.key === "规格1" ? false : true}
          >
            <Row>
              <Col span={10}>
                <Form.Item label="规格名称">
                  {editing ? (
                    <Input
                      style={{ width: 200 }}
                      onChange={this.onPriceChange}
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
                      onChange={this.onPriceChange}
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
                <CakeMaterial
                  selectedMaterials={spec.materials}
                  editing={editing}
                  cakeMaterials={cakeMaterials}
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
