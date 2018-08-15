import React from "react";
import { Modal, Transfer } from "antd";

class CommonModal extends React.Component {
  constructor(props) {
    super(props);
    const { dataSource, selectedDataSource } = this.props;
    const targetKeys = selectedDataSource.map(data => {
      return data.specId;
    });
    this.state = {
      visible: false,
      selectedDataSource: [],
      dataSource,
      targetKeys
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      targetKeys: [],
      selectedDataSource: [],
      dataSource: nextProps.dataSource || []
    });
  }

  convert = selected => {
    const converted = selected.map(data => {
      return data.specId;
    });
    return converted;
  };

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk(this.state.selectedDataSource);
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
    const { dataSource } = this.props;
    const selectedDataSource = dataSource.filter(data => {
      return targetKeys.includes(data.key);
    });
    this.setState({
      targetKeys,
      selectedDataSource
    });
  };

  render() {
    const { children, title } = this.props;
    const { visible, targetKeys, dataSource } = this.state;
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
            showSearch
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.changeHandler}
            render={item => item.title}
          />
        </Modal>
      </span>
    );
  }
}

export default CommonModal;
