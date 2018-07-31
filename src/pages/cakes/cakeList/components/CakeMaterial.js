import React, { Component } from "react";
import {
  Button,
  Divider,
  Table,
  Input,
  Form,
  InputNumber,
  Popconfirm,
  Transfer
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
      return <InputNumber min={1} max={10} />;
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

class CakeMaterial extends React.Component {
  constructor(props) {
    super(props);
    const allMaterials = [
      {
        key: "m1",
        name: "面粉",
        price: 5
      },
      {
        key: "m2",
        name: "糖霜",
        price: 6
      },
      {
        key: "m3",
        name: "果茸",
        price: 10
      }
    ];
    this.state = {
      allMaterials,
      selectedMaterials: [],
      targetKeys: [],
      editingKey: "",
      isTableShow: true,
      isEditing: true
    };
    this.columns = [
      {
        title: "名称",
        dataIndex: "name",
        width: "25%"
      },
      {
        title: "数量",
        dataIndex: "quantity",
        width: "25%",
        editable: true
      },
      {
        title: "单价（元）",
        dataIndex: "price",
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

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };

  handleChange = targetKeys => {
    const { allMaterials } = this.state;
    const selectedMaterials = allMaterials
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
    this.props.onMaterialsChange(selectedMaterials);
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
          inputType: col.dataIndex === "quantity" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.state.isEditing
        })
      };
    });

    return (
      <div>
        <Transfer
          dataSource={this.state.allMaterials}
          listStyle={{
            width: "46.5%",
            height: 300
          }}
          showSearch
          filterOption={this.filterOption}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={item => item.name}
        />
        <Table
          components={components}
          size="small"
          bordered
          dataSource={this.state.selectedMaterials}
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
          onClick={e => {}}
        />
      </div>
    );
  }
}

export default CakeMaterial;
