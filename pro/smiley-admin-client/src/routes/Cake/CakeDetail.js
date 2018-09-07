import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import shallowEqual from 'shallowequal';
import { Button, Dropdown, Icon, Row, Col, Card, Menu, Skeleton } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeDetail.less';
import RadioTag from '../../components/CustomComponents/RadioTag';
import CakeRecipeForm from './CakeRecipeForm';

@connect(({ materials, cakes, loading }) => ({
  cakes,
  materials,
  loading: loading.effects['cakes/fetchCakeDetail'] || loading.effects['materials/fetchMaterials'],
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
      type: 'materials/fetchMaterials',
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
    this.updateSelectedRecipe(value, this.state.selectedSpec);
  };

  onSpecChange = value => {
    this.updateSelectedRecipe(this.state.selectedTaste, value);
  };

  getTotalCost = selectedRecipe => {
    let totalCost = 0;
    selectedRecipe.detail.forEach(recipe => {
      recipe.materials.forEach(material => {
        totalCost += material.quantity * material.price;
      });
    });
    return totalCost;
  };

  render() {
    const { cakes, materials } = this.props;
    const { cakeDetail } = cakes;
    const { selectedTaste, selectedSpec, selectedRecipe } = this.state;
    let { loading } = this.props;
    loading = typeof loading === 'boolean' ? loading : true;

    let totalCost = loading ? 0 : this.getTotalCost(cakeDetail.recipes[selectedRecipe]);

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
            <span>{!loading && cakeDetail.name}</span>
          </Dropdown>
          <a style={{ marginLeft: 10 }}>
            <Icon type="edit" />
          </a>
        </Fragment>
      </Skeleton>
    );

    const extra = loading ? null : (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>成本</div>
          <div className={styles.heading}>¥ {totalCost}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>售价</div>
          <div className={styles.heading}>¥ {cakeDetail.recipes[selectedRecipe].price}</div>
        </Col>
      </Row>
    );

    const description = (
      <Skeleton active loading={loading} title={false} className={styles.headerList}>
        {!loading && (
          <DescriptionList size="small" col="1">
            <DescriptionList.Description term="甜品类型">
              {cakeDetail.type}
              <a style={{ marginLeft: 10 }}>
                <Icon type="edit" />
              </a>
            </DescriptionList.Description>
            <DescriptionList.Description term="口味">
              <RadioTag.Group
                defaultValue={selectedTaste}
                dataSource={cakeDetail.tastes}
                onChange={this.onTasteChange}
              />
            </DescriptionList.Description>
            <DescriptionList.Description term="规格">
              <RadioTag.Group
                defaultValue={selectedSpec}
                dataSource={cakeDetail.specs}
                onChange={this.onSpecChange}
              />
            </DescriptionList.Description>
          </DescriptionList>
        )}
      </Skeleton>
    );

    return (
      <PageHeaderLayout title={title} content={description} extraContent={extra} action={action}>
        <Card title="配方" className={styles.recipeCard} bordered={false} extra={recipeExtra}>
          <Skeleton active loading={loading} title={false}>
            <Button type="dashed" icon="plus" className={styles.addRecipe}>
              添加配方
            </Button>
            {!loading &&
              cakeDetail.recipes[selectedRecipe].detail.map(recipe => {
                return (
                  <Card.Grid style={{ width: '100%', marginBottom: 24, padding: 0 }}>
                    <CakeRecipeForm recipe={recipe} materials={materials.materials} />
                  </Card.Grid>
                );
              })}
          </Skeleton>
        </Card>
      </PageHeaderLayout>
    );
  }
}
