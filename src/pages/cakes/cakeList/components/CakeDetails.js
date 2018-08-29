import React from "react";
import { Drawer, Collapse, Table, Tabs } from "antd";

class CakeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  visibleHandler = visible => {
    this.setState({
      visible
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <Drawer
        onClose={this.visibleHandler(false)}
        width={720}
        maskClosable={false}
        visible={visible}
      >
        <Tabs />
      </Drawer>
    );
  }
}

export default CakeDetails;
