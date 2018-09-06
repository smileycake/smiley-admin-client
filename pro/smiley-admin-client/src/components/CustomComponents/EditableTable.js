import React from 'react';
import { Divider, Input, Popconfirm, Table } from 'antd';

export default class EditableTable extends React.Component {
  cacheOriginData = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.dataSource,
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
      if (!target.isEditing) {
        this.cacheOriginData[key] = { ...target };
      }
      target.isEditing = !target.isEditing;
      this.setState({ data: newData });
    }
  };

  remove = key => {
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete();
    }
  };

  saveRow = (e, key) => {
    const { onEdit } = this.props;
    if (onEdit) {
      onEdit();
    }
  };

  render() {
    const { columns } = this.props;
    const { loading, data } = this.state;

    let editableColumns = columns;
    editableColumns.forEach(column => {
      if (column.editable) {
        column.isEditing = false;
      }
      column.render = (text, record, index) => {
        return record.editable && record.isEditing ? <Input value={text} /> : text;
      };
    });

    editableColumns.push({
      title: '操作',
      width: '25%',
      render: (text, record, index) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除嘛?~" onConfirm={() => this.remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
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
    });
    return <Table columns={editableColumns} dataSource={data} {...this.props} />;
  }
}
