import React, { PureComponent, Fragment } from 'react';
import { Table, Tooltip, Button, Input, message, Popconfirm, Divider, Icon, Select } from 'antd';
import styles from './CakeRecipeForm.less';

export default class CakeRecipeForm extends PureComponent {
  cacheOriginMaterials = {};
  cacheOriginRecipeName = null;

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        const { allMaterials } = this.state;
        let existingMaterials = this.getExistingMaterials();
        return record.editable ? (
          <Select
            showSearch
            style={{ width: 150 }}
            placeholder="选择原料"
            optionFilterProp="children"
            defaultValue={record.id}
            onChange={value => this.onMaterialChange(value, index)}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {allMaterials.map(material => {
              let disabled = material.id !== record.id && existingMaterials.includes(material.id);
              return (
                <Select.Option value={material.id} disabled={disabled} key={material.id}>
                  {material.name}
                </Select.Option>
              );
            })}
          </Select>
        ) : (
          text
        );
      },
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: '20%',
      render: (text, record, index) => {
        return record.editable ? (
          <Input value={text} onChange={e => this.onQuantityChange(e, index)} />
        ) : (
          text + record.unit
        );
      },
    },
    {
      title: '单价',
      dataIndex: 'price',
      width: '20%',
      render: text => '¥ ' + text,
    },
    {
      title: '金额',
      width: '20%',
      render: (text, record) => '¥ ' + record.quantity * record.price,
    },
    {
      title: '操作',
      width: '20%',
      render: (text, record, index) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, index)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(index)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, index)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, index)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, index)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除嘛?~" onConfirm={() => this.remove(index)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    const { recipe, materials } = this.props;
    this.state = {
      loading: false,
      materials: recipe.materials,
      name: recipe.name,
      allMaterials: materials,
      editingRecipeName: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      materials: nextProps.recipe.materials,
      name: nextProps.recipe.name,
    });
  }

  copyMaterials = () => {
    const { materials } = this.state;
    return materials.map(material => ({ ...material }));
  };

  getRowByIndex = (index, materials) => {
    return materials.filter((material, i) => i === index)[0];
  };

  getMaterialById = id => {
    const { allMaterials } = this.state;
    return allMaterials.filter(material => material.id === id)[0];
  };

  getExistingMaterials = () => {
    let { materials } = this.state;
    return materials.map(material => material.id);
  };

  getAvailableMaterials = () => {
    let { allMaterials } = this.state;
    let existingMaterials = this.getExistingMaterials();
    return allMaterials.filter(material => !existingMaterials.includes(material.id));
  };

  // Delete Recipe
  deleteRecipe = () => {
    const { deleteRecipe } = this.props;
    if (deleteRecipe) {
      deleteRecipe();
    }
  };

  // Save Recipe
  saveRecipe = () => {};

  // Recipe Name Operation
  onRecipeNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  saveRecipeName = () => {
    const { onChange } = this.props;
    const { name, materials } = this.state;
    this.setState({
      editingRecipeName: false,
    });
    if (onChange) {
      onChange(name, materials);
    }
  };

  cancelEditRecipeName = () => {
    this.setState({
      editingRecipeName: false,
      name: this.cacheOriginRecipeName,
    });
  };

  editRecipeName = () => {
    const { name, editingRecipeName } = this.state;
    this.cacheOriginRecipeName = name;
    this.setState({
      editingRecipeName: !editingRecipeName,
    });
  };

  // Materials Operation
  newMaterial = () => {
    let availableMaterials = this.getAvailableMaterials();
    if (availableMaterials.length === 0) {
      message.info('所有原料都在列表里了哦!');
      return;
    }
    const newMaterials = this.copyMaterials();
    newMaterials.push({
      ...availableMaterials[0],
      quantity: 0,
      editable: true,
      isNew: true,
    });
    //this.index += 1;
    this.setState({ materials: newMaterials });
  };

  toggleEditable = (e, index) => {
    e.preventDefault();
    const newMaterials = this.copyMaterials();
    const target = this.getRowByIndex(index, newMaterials);
    if (target) {
      if (!target.editable) {
        this.cacheOriginMaterials[index] = { ...target };
        target.editable = true;
      } else {
        delete target.editable;
        const { onChange } = this.props;
        if (onChange) {
          onChange(this.state.name, newMaterials);
        }
      }
      this.setState({ materials: newMaterials });
    }
  };

  remove = index => {
    const { name, materials } = this.state;
    const newMaterials = materials.filter((material, i) => i !== index);
    this.setState({ materials: newMaterials });
    const { onChange } = this.props;
    if (onChange) {
      onChange(name, newMaterials);
    }
  };

  saveRow = (e, index) => {
    const { name, materials } = this.state;
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByIndex(index, materials) || {};
      if (!target.name || !target.quantity || target.quantity <= 0) {
        message.error('原料信息有误哦');
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, index);
      this.setState({
        loading: false,
      });
    }, 500);
  };

  cancel = (e, index) => {
    this.clickedCancel = true;
    e.preventDefault();
    const newMaterials = this.copyMaterials();
    const target = this.getRowByIndex(index, newMaterials);
    if (this.cacheOriginMaterials[index]) {
      Object.assign(target, this.cacheOriginMaterials[index]);
      delete target.editable;
      delete this.cacheOriginMaterials[index];
    }
    this.setState({ materials: newMaterials });
    this.clickedCancel = false;
  };

  onQuantityChange = (e, index) => {
    if (e.target.value !== '' && !Number(e.target.value)) {
      return;
    }
    const newMaterials = this.copyMaterials();
    const target = this.getRowByIndex(index, newMaterials);
    if (target) {
      target.quantity = Number(e.target.value);
      this.setState({ materials: newMaterials });
    }
  };

  onMaterialChange = (value, index) => {
    const newMaterials = this.copyMaterials();
    const target = this.getRowByIndex(index, newMaterials);
    const material = this.getMaterialById(value);
    if (target) {
      target.id = material.id;
      target.name = material.name;
      target.price = material.price;
      target.unit = material.unit;
      this.setState({ materials: newMaterials });
    }
  };

  render() {
    const { materials, name, loading, editingRecipeName } = this.state;
    let totalPrice = 0;
    materials.forEach(material => {
      totalPrice += material.quantity * material.price;
    });

    return (
      <Fragment>
        <Table
          title={() => {
            return (
              <div className={styles.recipeTitle}>
                <div className={styles.name}>
                  {editingRecipeName && (
                    <Fragment>
                      <Input
                        style={{ width: 100 }}
                        autoFocus
                        value={name}
                        onChange={this.onRecipeNameChange}
                        onPressEnter={this.saveRecipeName}
                        onKeyUp={e => {
                          if (e.key === 'Escape') this.cancelEditRecipeName();
                        }}
                        onBlur={this.cancelEditRecipeName}
                      />
                    </Fragment>
                  )}
                  {!editingRecipeName && (
                    <Fragment>
                      <span>{name}</span>
                      <a onClick={this.editRecipeName}>
                        <Icon type="edit" />
                      </a>
                    </Fragment>
                  )}
                </div>
                <div className={styles.operation}>
                  <Tooltip title="添加原料">
                    <Button icon="plus" shape="circle" onClick={this.newMaterial} />
                  </Tooltip>
                  <Tooltip title="存为常用配方">
                    <Button icon="upload" shape="circle" onClick={this.saveRecipe} />
                  </Tooltip>
                  <Popconfirm title="是否要删除此配方？" onConfirm={this.deleteRecipe}>
                    <Button icon="delete" shape="circle" />
                  </Popconfirm>
                </div>
              </div>
            );
          }}
          size="small"
          bordered
          rowKey={record => record.id}
          columns={this.columns}
          dataSource={materials}
          pagination={false}
          loading={loading}
          footer={() => {
            return <span style={{ fontWeight: 600 }}>总计: ¥ {totalPrice}</span>;
          }}
        />
      </Fragment>
    );
  }
}
