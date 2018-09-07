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
    const { children } = this.props;
    if (this.props.value) {
      value = this.props.value;
    } else if (this.props.defaultValue) {
      value = this.props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      inputVisible: false,
      inputValue: '',
      value,
    };
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

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => (this.input = input);

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    let { children, dataSource } = this.props;
    const { inputValue, inputVisible, value } = this.state;
    if (dataSource) {
      children = dataSource.map(tag => {
        return (
          <RadioTag
            value={tag.id}
            onChange={this.onRadioChange}
            checked={tag.id === value}
            key={tag.id}
          >
            {tag.name}
          </RadioTag>
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
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}
