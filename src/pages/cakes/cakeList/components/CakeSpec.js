import React, { Component } from "react";
import { Icon, Form, Tabs, Input, Switch } from "antd";
import CakeMaterialTable from "./CakeMaterialTable";

class TabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  editHandler = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  render() {
    const { onPressEnter, title } = this.props;
    const { editing } = this.state;

    return (
      <>
        {editing ? null : <label>{title}</label>}
        {editing ? (
          <Input
            style={{ width: 100 }}
            onPressEnter={() => {
              this.editHandler();
              if (onPressEnter) {
                onPressEnter();
              }
            }}
            placeholder={title}
          />
        ) : null}
        {editing ? null : (
          <Icon
            type="edit"
            style={{ marginLeft: 10 }}
            onClick={this.editHandler}
          />
        )}
      </>
    );
  }
}

class CakeSpec extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [{ title: "新规格", key: "0", closable: false }];
    const specs = [
      {
        name: "",
        materials: [],
        price: 0.0,
        isGroupPuchase: false
      }
    ];
    this.state = {
      specs: specs,
      activeKey: panes[0].key,
      panes
    };
    this.specsChangeHandler(specs);
  }

  specsChangeHandler = specs => {
    this.props.onSpecChange(specs);
  };

  onMaterialsChange = materials => {
    const specs = this.state.specs;
    specs[this.state.activeKey].materials = materials;
    this.setState({
      specs: specs
    });
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
    const panes = this.state.panes;
    const activeKey = ++this.newTabIndex;
    panes.push({
      title: "新规格",
      key: "" + activeKey
    });
    this.setState({ panes, activeKey: "" + activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
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
            tab={<TabPane onPressEnter={() => {}} title={pane.title} />}
            key={pane.key}
            closable={pane.closable}
          >
            <Form.Item label="配方">
              <CakeMaterialTable onMaterialsChange={this.onMaterialsChange} />
            </Form.Item>
            <Form.Item label="售价">
              <Input
                onChange={this.onPriceChange}
                placeholder="please enter user name"
              />
            </Form.Item>
            <Form.Item label="团购否">
              <Switch
                onChange={this.onGroupPurchaseChange}
                checkedChildren="是"
                unCheckedChildren="否"
              />
            </Form.Item>
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}

export default CakeSpec;
