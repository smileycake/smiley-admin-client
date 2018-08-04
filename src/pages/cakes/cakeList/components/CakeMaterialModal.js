import React from "react";
import { Modal, Transfer } from "antd";

class CakeMaterialModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      targetKeys: [],
      selectedMaterials: []
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk(this.state.selectedMaterials);
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

  materialsChangeHandler = targetKeys => {
    const { cakeMaterials } = this.props;
    const selectedMaterials = cakeMaterials
      .filter(material => {
        return targetKeys.includes(material.key);
      })
      .map(material => {
        material.quantity = 0;
        return material;
      });
    this.setState({
      targetKeys,
      selectedMaterials
    });
  };

  render() {
    const { cakeMaterials, children } = this.props;
    const { targetKeys, visible } = this.state;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="选择原料"
          visible={visible}
          width={720}
          onOk={this.onOk}
          onCancel={this.hideModelHandler}
        >
          <Transfer
            dataSource={cakeMaterials}
            listStyle={{
              width: 300,
              height: 300
            }}
            showSearch
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.materialsChangeHandler}
            render={item => item.name}
          />
        </Modal>
      </span>
    );
  }
}

export default CakeMaterialModal;
