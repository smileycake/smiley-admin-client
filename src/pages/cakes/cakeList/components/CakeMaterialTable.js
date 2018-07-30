import React, { Component } from "react";
import {
  Button,
  Divider,
  Table,
  Input,
  Form,
  InputNumber,
  Popconfirm
} from "antd";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <Form.Item style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </Form.Item>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class CakeMaterialTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { materials: [], editingKey: "" };
    this.columns = [
      {
        title: "名称",
        dataIndex: "name",
        width: "25%",
        editable: true
      },
      {
        title: "数量",
        dataIndex: "age",
        width: "25%",
        editable: true
      },
      {
        title: "价格",
        dataIndex: "address",
        width: "25%"
      },
      {
        title: "操作",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <div>
                  <a onClick={() => this.edit(record.key)}>Edit</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </div>
              )}
            </div>
          );
        }
      }
    ];
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
      const newMaterials = [...this.state.materials];
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
        this.setState({ materials: newMaterials, editingKey: "" });
        this.props.onMaterialsChange(newMaterials);
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  addRow = () => {
    const materials = [...this.state.materials];
    let newMaterial = {
      key: materials.length,
      name: `Edrward ${materials.length}`,
      age: 32,
      address: `London Park no. ${materials.length}`
    };
    materials.push(newMaterial);
    this.setState({ materials: materials, editingKey: newMaterial.key });
    this.props.onMaterialsChange(materials);
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <div>
        <Table
          components={components}
          size="small"
          bordered
          dataSource={this.state.materials}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          footer={() => {
            return <span>aaaa</span>;
          }}
        />
        <Button
          style={{ width: "100%", marginTop: 20 }}
          type="default"
          icon="plus"
          onClick={e => {
            this.addRow();
          }}
        />
      </div>
    );
  }
}

export default CakeMaterialTable;
