import React, { Component } from 'react';
import { Tag, Icon, Input } from 'antd';
import RadioTag from './RadioTag';

const getCheckedValue = children => {
  let value = null;
  let matched = false;
  React.Children.forEach(children, radio => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
};

export default class RadioTagGroup extends Component {
  constructor(props) {
    super(props);
    let value;
    const { children, defaultValue, dataSource, showNewTag, editable, closable } = this.props;
    if (this.props.value) {
      value = this.props.value;
    } else if (defaultValue) {
      value = defaultValue;
    } else {
      const checkedValue = getCheckedValue(children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      inputVisible: false,
      inputValue: '',
      value,
      dataSource,
      showNewTag: showNewTag || false,
      editable: editable || false,
      closable: closable || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let value;
    const { children, defaultValue, dataSource, showNewTag, editable, closable } = nextProps;
    if (nextProps.value) {
      value = nextProps.value;
    } else if (defaultValue) {
      value = defaultValue;
    } else {
      const checkedValue = getCheckedValue(children);
      value = checkedValue && checkedValue.value;
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
      value,
      dataSource,
      showNewTag: showNewTag || false,
      editable: editable || false,
      closable: closable || false,
    });
  }

  onRadioChange = value => {
    const lastValue = this.state.value;
    const { onChange } = this.props;
    if (onChange && value !== lastValue) {
      this.setState({
        value,
      });
      onChange(value);
    }
  };

  onDeleteTag = id => {
    const { onDeleteTag } = this.props;
    if (onDeleteTag) {
      onDeleteTag(id);
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => (this.input = input);

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  confirmInput = () => {
    const { onAddTag } = this.props;
    if (onAddTag) {
      onAddTag(this.input.props.value);
    }
    this.cancelInput();
  };

  cancelInput = () => {
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  onLabelChange = (id, label) => {
    const { onLabelChange } = this.props;
    if (onLabelChange) {
      onLabelChange(id, label);
    }
  };

  render() {
    let { children, newTagPlaceholder } = this.props;
    const {
      inputValue,
      inputVisible,
      value,
      dataSource,
      showNewTag,
      editable,
      closable,
    } = this.state;
    if (dataSource) {
      children = dataSource.map(tag => {
        return (
          <RadioTag
            value={tag.id}
            label={tag.name}
            onChange={this.onRadioChange}
            onClose={() => this.onDeleteTag(tag.id)}
            onLabelChange={label => this.onLabelChange(tag.id, label)}
            checked={tag.id === value}
            key={tag.id}
            editable={editable}
            closable={closable}
          />
        );
      });
    }
    return (
      <div>
        {children}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.cancelInput}
            onPressEnter={this.confirmInput}
            onKeyUp={e => {
              if (e.key === 'Escape') this.cancelInput();
            }}
          />
        )}
        {showNewTag &&
          !inputVisible && (
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" /> {newTagPlaceholder ? newTagPlaceholder : 'New Tag'}
            </Tag>
          )}
      </div>
    );
  }
}
