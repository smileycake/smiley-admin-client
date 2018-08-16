import React from "react";
import { Tree } from "antd";

class CommonTree extends React.Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: []
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data => {
    const { title, key, children } = this.props;
    return data.map(item => {
      if (item[children]) {
        return (
          <Tree.TreeNode title={item[title]} key={item[key]}>
            {this.renderTreeNodes(item[children])}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item[title]} key={item[key]} />;
    });
  };

  render() {
    const { dataSource } = this.props;
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(dataSource)}
      </Tree>
    );
  }
}

export default CommonTree;
