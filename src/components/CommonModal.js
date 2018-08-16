import React from "react";
import { Modal, Transfer } from "antd";

class CommonModal extends React.Component {
  constructor(props) {
    super(props);
    const { selectedKeys } = this.props;
    this.state = {
      visible: false,
      targetKeys: selectedKeys || []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      targetKeys: nextProps.selectedKeys || []
    });
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk(this.state.targetKeys);
    }
    this.hideModelHandler();
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  filterOption = (inputValue, option) => {
    return option.name.indexOf(inputValue) > -1;
  };

  changeHandler = targetKeys => {
    this.setState({
      targetKeys
    });
  };

  render() {
    const { children, title, rowKey, render, dataSource } = this.props;
    const { visible, targetKeys } = this.state;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={title}
          visible={visible}
          width={720}
          onOk={this.onOk}
          onCancel={this.hideModelHandler}
        >
          <Transfer
            dataSource={dataSource}
            listStyle={{
              width: 300,
              height: 300
            }}
            rowKey={record => record[rowKey]}
            showSearch
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.changeHandler}
            render={render}
          />
        </Modal>
      </span>
    );
  }
}

export default CommonModal;
