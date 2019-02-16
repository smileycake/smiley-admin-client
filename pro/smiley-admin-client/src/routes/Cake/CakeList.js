import React from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch } from 'dva/router';
import { Card, Input, Button, Table, Popconfirm } from 'antd';
import shallowEqual from 'shallowequal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import RadioTag from '../../components/CustomComponents/RadioTag';

@connect(({ cakes, loading }) => ({
  cakes: cakes.cakes,
  loading: loading.effects['cakes/fetchCakeList'],
}))
export default class CakeList extends React.Component {
  state = {
    selectedTastes: [],
    selectedSpecs: [],
    showingPrice: [],
  };

  handleCreateCake = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/cake/list/cakeDetail'));
  };

  showCakeDetail = id => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/cake/list/cakeDetail'));
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakeList',
      payload: {
        count: 5,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { cakes } = nextProps;
    const { selectedTastes, selectedSpecs } = this.state;
    if (cakes.length !== 0) {
      for (let i = 0; i < cakes.length; ++i) {
        selectedTastes[i] = cakes[i].tastes[0].id;
        selectedSpecs[i] = cakes[i].tastes[0].specs[0].id;
      }
      this.setState(
        {
          selectedTastes,
          selectedSpecs,
        },
        this.updateShowingPrice
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  updateShowingPrice = () => {
    const { selectedTastes, selectedSpecs } = this.state;
    const { cakes } = this.props;
    const showingPrice = cakes.map((cake, index) => {
      return cake.tastes
        .filter(taste => taste.id === selectedTastes[index])[0]
        .specs.filter(spec => spec.id === selectedSpecs[index])[0].price;
    });
    this.setState({
      showingPrice,
    });
  };

  onSpecChange = (specId, index) => {
    const { selectedSpecs } = this.state;
    selectedSpecs[index] = specId;
    this.setState(
      {
        selectedSpecs,
      },
      this.updateShowingPrice
    );
  };

  onTasteChange = (tasteId, index) => {
    const { selectedTastes, selectedSpecs } = this.state;
    const { cakes } = this.props;
    selectedTastes[index] = tasteId;
    selectedSpecs[index] = cakes[index].tastes.filter(taste => taste.id === tasteId)[0].specs[0].id;
    this.setState(
      {
        selectedTastes,
        selectedSpecs,
      },
      this.updateShowingPrice
    );
  };

  onDeleteCake = (id, index) => {};

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  render() {
    const { cakes, loading, match, routerData } = this.props;
    const { selectedTastes, selectedSpecs, showingPrice } = this.state;

    return (
      <Switch>
        {getRoutes(match.path, routerData).map(item => (
          <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
        ))}
        <>
          <PageHeaderLayout>
            <Card
              bordered={false}
              title={
                <Button icon="plus" type="primary" onClick={this.handleCreateCake}>
                  新建
                </Button>
              }
              extra={<Input.Search placeholder="请输入" />}
            >
              <Table loading={loading} rowKey={record => record.id} dataSource={cakes}>
                <Table.Column
                  title="名称"
                  dataIndex="name"
                  width="20%"
                  render={(name, record) => {
                    return <a onClick={e => this.showCakeDetail(record.id)}>{name}</a>;
                  }}
                />
                <Table.Column title="类型" dataIndex="type" width="10%" />
                <Table.Column
                  title="口味"
                  dataIndex="tastes"
                  width="25%"
                  render={(tastes, record, index) => {
                    return (
                      <RadioTag.Group
                        value={selectedTastes[index]}
                        dataSource={tastes}
                        onChange={value => this.onTasteChange(value, index)}
                      />
                    );
                  }}
                />
                <Table.Column
                  title="规格"
                  dataIndex="tastes"
                  width="20%"
                  render={(tastes, record, index) => {
                    const specs = tastes.filter(taste => taste.id === selectedTastes[index])[0]
                      .specs;
                    return (
                      <RadioTag.Group
                        value={selectedSpecs[index]}
                        dataSource={specs}
                        onChange={value => this.onSpecChange(value, index)}
                      />
                    );
                  }}
                />
                <Table.Column
                  title="价格"
                  width="10%"
                  render={(text, record, index) => {
                    return '¥ ' + (showingPrice[index] ? showingPrice[index] : 0);
                  }}
                />
                <Table.Column
                  title="操作"
                  width="10%"
                  render={(text, record, index) => (
                    <Popconfirm
                      title="确定删除嘛?~"
                      onConfirm={() => {
                        this.onDeleteCake(record.id, index);
                      }}
                    >
                      <a href="">删除</a>
                    </Popconfirm>
                  )}
                />
              </Table>
            </Card>
          </PageHeaderLayout>
        </>
      </Switch>
    );
  }
}
