import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import shallowEqual from 'shallowequal';
import { Button, Dropdown, Icon, Row, Col, Card, Table, Input, Menu, Skeleton } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeDetail.less';
import RadioTag from '../../components/CustomComponents/RadioTag';

@connect(({ cakes, loading }) => ({
  cakes,
  loading: loading.effects['cakes/fetchCakeDetail'],
}))
export default class CakeDetail extends Component {
  state = {
    selectedTaste: null,
    selectedSpec: null,
    selectedRecipe: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakeDetail',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, cakes } = nextProps;
    const { cakeDetail } = cakes;
    if (!loading) {
      this.updateSelectedRecipe(cakeDetail.tastes[0].id, cakeDetail.specs[0].id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  updateSelectedRecipe(selectedTaste, selectedSpec) {
    let selectedRecipe = null;
    this.props.cakes.cakeDetail.recipes.forEach((recipe, index) => {
      if (recipe.tasteId === selectedTaste && recipe.specId === selectedSpec) {
        selectedRecipe = index;
        return;
      }
    });
    this.setState({
      selectedTaste,
      selectedSpec,
      selectedRecipe,
    });
  }

  onTasteChange = value => {
    this.updateSelectedRecipe(value);
  };

  onSpecChange = value => {
    this.updateSelectedRecipe(this.state.selectedTaste, value);
  };

  renderRecipeTitle = name => {
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
  };

  render() {
    const { cakes, loading } = this.props;
    const { cakeDetail } = cakes;
    const { selectedTaste, selectedSpec, selectedRecipe } = this.state;

    const action = (
      <Fragment>
        <Button icon="save" type="primary">
          保存
        </Button>
      </Fragment>
    );

    const recipeExtra = <Button icon="download">导入配方</Button>;

    const menu = (
      <Menu>
        <Menu.Item key="0">1st menu item</Menu.Item>
        <Menu.Item key="1">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

    const title = (
      <Skeleton active paragraph={false} loading={loading}>
        <Fragment>
          <Dropdown overlay={menu} trigger={['click']}>
            <span>{cakeDetail.name}</span>
          </Dropdown>
          <a style={{ marginLeft: 10 }}>
            <Icon type="edit" />
          </a>
        </Fragment>
      </Skeleton>
    );

    const extra =
      typeof loading === 'boolean' && !loading ? (
        <Row>
          <Col xs={24} sm={12}>
            <div className={styles.textSecondary}>成本</div>
            <div className={styles.heading}>¥ 30-30</div>
          </Col>
          <Col xs={24} sm={12}>
            <div className={styles.textSecondary}>售价</div>
            <div className={styles.heading}>¥ {cakeDetail.recipes[selectedRecipe].price}</div>
          </Col>
        </Row>
      ) : null;

    const description = (
      <Skeleton active loading={loading} title={false} className={styles.headerList}>
        <DescriptionList size="small" col="1">
          <DescriptionList.Description term="甜品类型">
            {cakeDetail.type}
            <a style={{ marginLeft: 10 }}>
              <Icon type="edit" />
            </a>
          </DescriptionList.Description>
          <DescriptionList.Description term="口味">
            {typeof loading === 'boolean' &&
              !loading && (
                <RadioTag.Group
                  defaultValue={selectedTaste}
                  dataSource={cakeDetail.tastes}
                  onChange={this.onTasteChange}
                />
              )}
          </DescriptionList.Description>
          <DescriptionList.Description term="规格">
            {typeof loading === 'boolean' &&
              !loading && (
                <RadioTag.Group
                  defaultValue={selectedSpec}
                  dataSource={cakeDetail.specs}
                  onChange={this.onSpecChange}
                />
              )}
          </DescriptionList.Description>
        </DescriptionList>
      </Skeleton>
    );

    return (
      <PageHeaderLayout title={title} content={description} extraContent={extra} action={action}>
        <Card title="配方" className={styles.recipeCard} bordered={false} extra={recipeExtra}>
          <Skeleton active loading={loading} title={false}>
            <Button type="dashed" icon="plus" className={styles.addRecipe}>
              添加配方
            </Button>
            {typeof loading === 'boolean' &&
              !loading &&
              cakeDetail.recipes[selectedRecipe].detail.map(recipe => {
                let { materials } = recipe;
                let totalPrice = 0;
                materials.forEach(material => {
                  totalPrice += material.quantity * material.price;
                });
                materials = materials.concat({
                  name: '总计',
                  price: totalPrice,
                });
                const renderContent = (value, row, index) => {
                  const obj = {
                    children: value,
                    props: {},
                  };
                  if (index === materials.length - 1) {
                    obj.props.colSpan = 0;
                  }
                  return obj;
                };
                const columns = [
                  {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: '25%',
                    render: (text, row, index) => {
                      if (index < materials.length - 1) {
                        return text;
                      }
                      return {
                        children: <span style={{ fontWeight: 600 }}>总计: {row.price}</span>,
                        props: {
                          colSpan: 4,
                        },
                      };
                    },
                  },
                  {
                    title: '数量',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    width: '25%',
                    render: renderContent,
                  },
                  {
                    title: '单价',
                    dataIndex: 'price',
                    key: 'price',
                    width: '25%',
                    render: renderContent,
                  },
                  {
                    title: '操作',
                    width: '25%',
                    render: renderContent,
                  },
                ];
                return (
                  <Card.Grid style={{ width: '100%', marginBottom: 24, padding: 0 }}>
                    <Table
                      title={this.renderRecipeTitle(recipe.name)}
                      size="small"
                      pagination={false}
                      loading={loading}
                      dataSource={materials}
                      columns={columns}
                      bordered
                    />
                  </Card.Grid>
                );
              })}
          </Skeleton>
        </Card>
      </PageHeaderLayout>
    );
  }
}