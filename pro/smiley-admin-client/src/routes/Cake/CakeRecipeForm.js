import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Icon } from 'antd';
import styles from './CakeRecipeForm.less';

export default class CakeRecipeForm extends PureComponent {
  cacheOriginMaterials = {};
  cacheOriginRecipeName = null;

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '25%',
      render: (text, record, index) => {
        return record.editable ? (
          <Input value={text} onChange={e => this.onQuantityChange(e, 'quantity', record.id)} />
        ) : (
          text
        );
      },
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
      render: text => '¥ ' + text,
    },
    {
      title: '操作',
      width: '25%',
      render: (text, record, index) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.id)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, record.id)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, record.id)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除嘛?~" onConfirm={() => this.remove(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      loading: false,
      materials: recipe.materials,
      name: recipe.name,
      editingRecipeName: false,
    };
  }

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
      onChange({ name, materials });
    }
  };

  cancelEditRecipeName = () => {
    this.setState({
      editingRecipeName: false,
      name: this.cacheOriginRecipeName,
    });
  };

  editRecipeName = () => {
    this.cacheOriginRecipeName = name;
    const { editingRecipeName } = this.state;
    this.setState({
      editingRecipeName: !editingRecipeName,
    });
  };

  // Materials Operation
  getRowById(id, newMaterials) {
    const { materials } = this.state;
    return (newMaterials || materials).filter(material => material.id === id)[0];
  }

  toggleEditable = (e, id) => {
    e.preventDefault();
    const { materials } = this.state;
    const newMaterials = materials.map(material => ({ ...material }));
    const target = this.getRowById(id, newMaterials);
    if (target) {
      if (!target.editable) {
        this.cacheOriginMaterials[id] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ materials: newMaterials });
    }
  };

  remove = id => {
    const { materials } = this.state;
    const { onChange } = this.props;
    const newMaterials = materials.filter(material => material.id !== id);
    this.setState({ materials: newMaterials });
    if (onChange) {
      onChange(newMaterials);
    }
  };

  saveRow = (e, id) => {
    const { onChange } = this.props;
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowById(id) || {};
      if (!target.quantity || target.quantity <= 0) {
        message.error('数量不能为空哦');
        this.setState({
          loading: false,
        });
        return;
      }
      const { name, materials } = this.state;
      delete target.isNew;
      this.toggleEditable(e, id);
      if (onChange) {
        onChange({ name, materials });
      }
      this.setState({
        loading: false,
      });
    }, 500);
  };

  cancel(e, id) {
    this.clickedCancel = true;
    e.preventDefault();
    const { materials } = this.state;
    const newMaterials = materials.map(material => ({ ...material }));
    const target = this.getRowById(id, newMaterials);
    if (this.cacheOriginMaterials[id]) {
      Object.assign(target, this.cacheOriginMaterials[id]);
      target.editable = false;
      delete this.cacheOriginMaterials[id];
    }
    this.setState({ materials: newMaterials });
    this.clickedCancel = false;
  }

  onQuantityChange = (e, fieldName, id) => {
    if (e.target.value !== '' && !Number(e.target.value)) {
      return;
    }
    const { materials } = this.state;
    const newMaterials = materials.map(material => ({ ...material }));
    const target = this.getRowById(id, newMaterials);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ materials: newMaterials });
    }
  };

  render() {
    const { materials, name, loading, editingRecipeName } = this.state;
    const { recipe } = this.props;
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
                        value={name}
                        onChange={this.onRecipeNameChange}
                      />
                      <a onClick={this.saveRecipeName}>
                        <Icon type="check" />
                      </a>
                      <a onClick={this.cancelEditRecipeName}>
                        <Icon type="stop" />
                      </a>
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
                <div>
                  <Button icon="plus" style={{ marginRight: 10 }}>
                    添加原料
                  </Button>
                  <Button icon="export" style={{ marginRight: 10 }}>
                    存为常用配方
                  </Button>
                  <Button icon="close">删除</Button>
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
