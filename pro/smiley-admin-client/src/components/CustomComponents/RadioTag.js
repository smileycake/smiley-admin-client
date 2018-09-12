import React from 'react';
import { Icon, Input, Popconfirm, Tag } from 'antd';
import RadioTagGroup from './RadioTagGroup';
import { Fragment } from 'react';

export default class RadioTag extends React.Component {
  static Group = RadioTagGroup;
  cacheOriginLabel = null;

  constructor(props) {
    super(props);
    const { checked, value, label, editable, closable } = this.props;
    this.state = {
      checked: checked ? checked : false,
      popupConfigVisible: false,
      editing: false,
      value,
      label,
      editable: editable || false,
      closable: closable || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
        value: nextProps.value,
        label: nextProps.label,
        editable: nextProps.editable || false,
        closable: nextProps.closable || false,
      });
    }
  }

  onClick = e => {
    e.preventDefault();
    const lastChecked = this.state.checked;
    if (lastChecked) {
      return;
    }
    const { onChange, value } = this.props;
    this.setState({
      checked: !lastChecked,
    });
    if (onChange) {
      onChange(value);
    }
  };

  onDoubleClick = e => {
    console.log(e);
  };

  afterClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
    this.toggleVisible();
  };

  toggleVisible = e => {
    if (e) {
      e.preventDefault();
    }
    const { popupConfigVisible } = this.state;
    this.setState({
      popupConfigVisible: !popupConfigVisible,
    });
  };

  toggleEdit = () => {
    const { editing, label } = this.state;
    if (!editing) {
      this.cacheOriginLabel = label;
    }
    this.setState({
      editing: !editing,
    });
  };

  cancelEdit = () => {
    this.setState({
      label: this.cacheOriginLabel,
      editing: false,
    });
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value,
    });
  };

  onLabelChangeConfirm = () => {
    const { onLabelChange } = this.props;
    const { label } = this.state;
    if (onLabelChange) {
      onLabelChange(label);
    }
    this.toggleEdit();
  };

  render() {
    const { children } = this.props;
    const { checked, popupConfigVisible, editing, label, editable, closable } = this.state;
    return (
      <Fragment>
        {!editing && (
          <Tag closable={closable} onClose={this.toggleVisible} color={checked ? '#108ee9' : null}>
            <Popconfirm
              title="确定删除嘛?~"
              visible={popupConfigVisible}
              onCancel={this.toggleVisible}
              onConfirm={this.afterClose}
            >
              <span style={{ display: 'inline-block' }} onClick={this.onClick}>
                {label}
                {editable && (
                  <Icon type="edit" style={{ marginLeft: 5 }} onClick={this.toggleEdit} />
                )}
              </span>
            </Popconfirm>
          </Tag>
        )}
        {editing && (
          <Input
            autoFocus
            type="text"
            size="small"
            value={label}
            style={{ width: 78 }}
            onChange={this.onLabelChange}
            onBlur={this.cancelEdit}
            onPressEnter={this.onLabelChangeConfirm}
            onKeyUp={e => {
              if (e.key === 'Escape') this.cancelEdit();
            }}
          />
        )}
      </Fragment>
    );
  }
}
