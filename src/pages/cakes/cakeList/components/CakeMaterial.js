import React from "react";
import { Button, Table, InputNumber, Popconfirm } from "antd";
import CakeMaterialModal from "./CakeMaterialModal";

class CakeMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  materialsChangeHandler = selectedMaterials => {
    this.props.onMaterialsChange(selectedMaterials);
  };

  renderFooter = () => {
    return <span>aaaa</span>;
  };

  renderQuantityInput = text => {
    return this.props.editing ? <InputNumber /> : text;
  };

  renderOperation = () => {
    return (
      <Popconfirm title="Sure to cancel?" onConfirm={() => {}}>
        <a>Delete</a>
      </Popconfirm>
    );
  };

  render() {
    const { selectedMaterials, cakeMaterials, editing } = this.state;
    return (
      <>
        {editing ? (
          <CakeMaterialModal
            selectedMaterials={selectedMaterials}
            cakeMaterials={cakeMaterials}
            onOk={this.materialsChangeHandler}
          >
            <Button>选择原料</Button>
          </CakeMaterialModal>
        ) : null}
        <Table
          size="small"
          bordered
          dataSource={selectedMaterials}
          rowClassName="editable-row"
          pagination={false}
          footer={this.renderFooter}
        >
          <Table.Column title="名称" dataIndex="name" width="25%" />
          <Table.Column
            title="数量"
            dataIndex="quantity"
            width="25%"
            render={this.renderQuantityInput}
          />
          <Table.Column title="单价（元）" dataIndex="price" width="25%" />
          {editing ? (
            <Table.Column
              title="操作"
              width="25%"
              render={this.renderOperation}
            />
          ) : null}
        </Table>
      </>
    );
  }
}

export default CakeMaterial;
