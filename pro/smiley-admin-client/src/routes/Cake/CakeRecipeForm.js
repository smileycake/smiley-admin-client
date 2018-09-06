import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Icon } from 'antd';
import styles from './CakeRecipeForm.less';

export default class CakeRecipeForm extends PureComponent {
  cacheOriginData = {};

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      loading: false,
      data: recipe.materials,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  remove = key => {};

  saveRow = (e, key) => {
    const { onEdit } = this.props;
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.quantity) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const { data } = this.state;
      const { onChange } = this.props;
      delete target.isNew;
      this.toggleEditable(e, key);
      if (onChange) {
        onChange(data);
      }
      this.setState({
        loading: false,
      });
    }, 500);
  };

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  onQuantityChange = (e, fieldName, key) => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { data, loading } = this.state;

    const { recipe } = this.props;
    let { materials, name } = recipe;
    let totalPrice = 0;
    materials.forEach(material => {
      totalPrice += material.quantity * material.price;
    });
    const columns = [
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
            <Input value={text} onChange={e => this.onQuantityChange(e, 'quantity', record.key)} />
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
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="确定删除嘛?~" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    return (
      <Fragment>
        <Table
          title={() => {
            return (
              <div className={styles.recipeTitle}>
                <div className={styles.name}>
                  <span>{name}</span>
                  <a>
                    <Icon type="edit" />
                  </a>
                </div>
                <div>
                  <Button icon="plus" style={{ marginRight: 10 }}>
                    添加原料
                  </Button>
                  <Button icon="export">存为常用配方</Button>
                </div>
              </div>
            );
          }}
          size="small"
          bordered
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
          footer={() => {
            return <span style={{ fontWeight: 600 }}>总计: {totalPrice}</span>;
          }}
        />
      </Fragment>
    );
  }
}
