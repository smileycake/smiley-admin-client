import React from "react";
import { Button, Table, InputNumber, Popconfirm, Transfer } from "antd";
import CakeMaterialModal from "./CakeMaterialModal";

class CakeMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      targetKeys: [],
      editingKey: "",
      isTableShow: true,
      isEditing: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newMaterials = [...this.state.selectedMaterials];
      const index = newMaterials.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newMaterials[index];
        newMaterials.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ materials: newMaterials, editingKey: "" });
        this.props.onMaterialsChange(newMaterials);
      } else {
        newMaterials.push(row);
        this.setState({ selectedMaterials: newMaterials, editingKey: "" });
        this.props.onMaterialsChange(newMaterials);
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  handleChange = selectedMaterials => {
    this.setState({
      selectedMaterials
    });
    //this.props.onMaterialsChange(selectedMaterials);
  };

  render() {
    const { selectedMaterials, cakeMaterials, editing } = this.state;
    return (
      <>
        {editing ? (
          <CakeMaterialModal
            selectedMaterials={selectedMaterials}
            cakeMaterials={cakeMaterials}
            onOk={this.handleChange}
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
          footer={() => {
            return <span>aaaa</span>;
          }}
        >
          <Table.Column title="名称" dataIndex="name" width="25%" />
          <Table.Column
            title="数量"
            dataIndex="quantity"
            width="25%"
            render={(text, record, index) => {
              return editing ? <InputNumber /> : text;
            }}
          />
          <Table.Column title="单价（元）" dataIndex="price" width="25%" />
          {editing ? (
            <Table.Column
              title="操作"
              width="25%"
              render={() => {
                return (
                  <Popconfirm title="Sure to cancel?" onConfirm={() => {}}>
                    <a>Delete</a>
                  </Popconfirm>
                );
              }}
            />
          ) : null}
        </Table>
      </>
    );
  }
}

export default CakeMaterial;
