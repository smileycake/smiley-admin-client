import React from 'react';
import { Tag } from 'antd';
import RadioTagGroup from './RadioTagGroup';

export default class RadioTag extends React.Component {
  static Group = RadioTagGroup;

  constructor(props) {
    super(props);
    const { checked } = this.props;
    this.state = {
      checked: checked ? checked : false,
    };
  }

  onClick = () => {
    const lastChecked = this.state.checked;
    const { onChange, value } = this.props;
    this.setState({
      checked: !lastChecked,
    });
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { children } = this.props;
    const { checked } = this.state;
    return (
      <Tag closable={true} onClick={this.onClick} color={checked ? '#108ee9' : null}>
        {children ? <span>{children}</span> : null}
      </Tag>
    );
  }
}
