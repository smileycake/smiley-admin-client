import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch } from 'dva/router';
import { Card, Form, Input, Button, Table, message } from 'antd';
import shallowEqual from 'shallowequal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';
import styles from './CakeList.less';
import RadioTag from '../../components/CustomComponents/RadioTag';

@connect(({ cakes, loading }) => ({
  cakes: cakes.cakes,
  loading: loading.effects['cakes/fetchCakes'],
}))
@Form.create()
export default class CakeList extends React.Component {
  state = {
    formValues: {},
    selectedTastes: [],
    selectedSpecs: [],
    showingPrice: [],
  };

  handleCreateCake = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/cake/list/cakeDetail'));
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakes',
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
        selectedSpecs[i] = cakes[i].specs[0].id;
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
    const { selectedTastes, selectedSpecs, showingPrice } = this.state;
    const { cakes } = this.props;
    const newShowingPrice = showingPrice.map(price => price);
    cakes.forEach((cake, index) => {
      cake.prices.forEach(price => {
        if (price.tasteId === selectedTastes[index] && price.specId === selectedSpecs[index]) {
          newShowingPrice[index] = price.price;
        }
      });
    });
    this.setState({
      showingPrice: newShowingPrice,
    });
  };

  onSpecChange = (specId, index) => {
    const { selectedSpecs } = this.state;
    const newSelectedSpecs = selectedSpecs.map(spec => spec);
    newSelectedSpecs[index] = specId;
    this.setState(
      {
        selectedSpecs: newSelectedSpecs,
      },
      this.updateShowingPrice
    );
  };

  onTasteChange = (tasteId, index) => {
    const { selectedTastes } = this.state;
    const newSelectedTastes = selectedTastes.map(taste => taste);
    newSelectedTastes[index] = tasteId;
    this.setState(
      {
        selectedTastes: newSelectedTastes,
      },
      this.updateShowingPrice
    );
  };

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

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '10%',
      },
      {
        title: '口味',
        dataIndex: 'tastes',
        render: (tastes, record, index) => {
          return (
            <RadioTag.Group
              value={selectedTastes[index]}
              dataSource={tastes}
              onChange={value => this.onTasteChange(value, index)}
            />
          );
        },
        width: '25%',
      },
      {
        title: '规格',
        dataIndex: 'specs',
        render: (specs, record, index) => {
          return (
            <RadioTag.Group
              value={selectedSpecs[index]}
              dataSource={specs}
              onChange={value => this.onSpecChange(value, index)}
            />
          );
        },
        width: '25%',
      },
      {
        title: '价格',
        width: '10%',
        render: (text, record, index) => {
          return '¥ ' + (showingPrice[index] ? showingPrice[index] : 0);
        },
      },
      {
        title: '操作',
        render: () => <a href="">删除</a>,
        width: '10%',
      },
    ];

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
              <div className={styles.tableList}>
                <Table
                  loading={loading}
                  rowKey={record => record.id}
                  dataSource={cakes}
                  columns={columns}
                />
              </div>
            </Card>
          </PageHeaderLayout>
        </>
      </Switch>
    );
  }
}
