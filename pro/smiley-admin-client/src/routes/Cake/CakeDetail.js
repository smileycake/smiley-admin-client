import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import shallowEqual from 'shallowequal';
import { Button, Dropdown, Icon, Row, Col, Card, Menu, Skeleton } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeDetail.less';
import RadioTag from '../../components/CustomComponents/RadioTag';
import CakeRecipeForm from './CakeRecipeForm';

@connect(({ materials, cakes, loading }) => ({
  cakeDetail: cakes.cakeDetail,
  materials,
  loading: loading.effects['cakes/fetchCakeDetail'] || loading.effects['materials/fetchMaterials'],
}))
export default class CakeDetail extends PureComponent {
  newRecipeItemId = 0;

  constructor(props) {
    super(props);
    this.state = {
      selectedTaste: null,
      selectedSpec: null,
      selectedRecipe: null,
      id: null,
      name: null,
      type: null,
      tastes: [],
      specs: [],
      recipes: [],
      cakeDetail: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'materials/fetchMaterials',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, cakeDetail } = nextProps;
    if (!loading) {
      this.updateSelectedRecipe(cakeDetail.tastes[0].id, cakeDetail.specs[0].id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  updateSelectedRecipe(selectedTaste, selectedSpec) {
    let selectedRecipe = null;
    const { cakeDetail } = this.props;
    cakeDetail.recipes.forEach((recipe, index) => {
      if (recipe.tasteId === selectedTaste && recipe.specId === selectedSpec) {
        selectedRecipe = index;
        return;
      }
    });
    this.newRecipeItemId = cakeDetail.recipes[selectedRecipe].detail.length;
    this.setState({
      selectedTaste,
      selectedSpec,
      selectedRecipe,
      ...cakeDetail,
    });
  }

  copyRecipes = () => {
    const { recipes } = this.state;
    return recipes.map(recipe => ({ ...recipe }));
  };

  addRecipeItem = () => {
    const { selectedRecipe } = this.state;
    const newRecipes = this.copyRecipes();
    newRecipes[selectedRecipe].detail.unshift({
      id: this.newRecipeItemId++,
      name: '新配方',
      materials: [],
    });
    this.setState({
      recipes: newRecipes,
    });
  };

  deleteRecipeItem = id => {
    const { selectedRecipe } = this.state;
    const newRecipes = this.copyRecipes();
    newRecipes[selectedRecipe].detail = newRecipes[selectedRecipe].detail.filter(
      recipe => id !== recipe.id
    );
    this.setState({
      recipes: newRecipes,
    });
  };

  onTasteChange = value => {
    this.updateSelectedRecipe(value, this.state.selectedSpec);
  };

  onSpecChange = value => {
    this.updateSelectedRecipe(this.state.selectedTaste, value);
  };

  onMaterialsChange = (name, materials, index) => {
    const { selectedRecipe } = this.state;
    const newRecipes = this.copyRecipes();
    newRecipes[selectedRecipe].detail[index].name = name;
    newRecipes[selectedRecipe].detail[index].materials = materials;
    this.setState({
      recipes: newRecipes,
    });
  };

  getTotalCost = () => {
    const { loading } = this.props;
    if (loading) {
      return 0;
    }
    const { recipes, selectedRecipe } = this.state;
    let totalCost = 0;
    recipes[selectedRecipe].detail.forEach(recipe => {
      recipe.materials.forEach(material => {
        totalCost += material.quantity * material.price;
      });
    });
    return totalCost;
  };

  render() {
    const { loading, materials } = this.props;
    const {
      selectedTaste,
      selectedSpec,
      selectedRecipe,
      name,
      type,
      tastes,
      specs,
      recipes,
    } = this.state;

    let totalCost = this.getTotalCost();

    const action = (
      <Fragment>
        <Button icon="save" type="primary">
          保存
        </Button>
      </Fragment>
    );

    const recipeExtra = loading ? null : (
      <Fragment>
        <Button icon="plus" className={styles.addRecipeItem} onClick={this.addRecipeItem}>
          添加配方
        </Button>
        <Button icon="download">导入配方</Button>
      </Fragment>
    );

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
            <span>{!loading && name}</span>
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
          <div className={styles.heading}>¥ {recipes[selectedRecipe].price}</div>
        </Col>
      </Row>
    );

    const description = (
      <Skeleton active loading={loading} title={false} className={styles.headerList}>
        {!loading && (
          <DescriptionList size="small" col="1">
            <DescriptionList.Description term="甜品类型">
              {type}
              <a style={{ marginLeft: 10 }}>
                <Icon type="edit" />
              </a>
            </DescriptionList.Description>
            <DescriptionList.Description term="口味">
              <RadioTag.Group
                defaultValue={selectedTaste}
                dataSource={tastes}
                onChange={this.onTasteChange}
                newTagPlaceholder="新口味"
              />
            </DescriptionList.Description>
            <DescriptionList.Description term="规格">
              <RadioTag.Group
                defaultValue={selectedSpec}
                dataSource={specs}
                onChange={this.onSpecChange}
                newTagPlaceholder="新规格"
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
            {!loading &&
              recipes[selectedRecipe].detail.map((recipe, index) => {
                return (
                  <Card.Grid style={{ width: '100%', marginBottom: 24, padding: 0 }} key={index}>
                    <CakeRecipeForm
                      recipe={recipe}
                      materials={materials.materials}
                      onChange={(name, materials) => {
                        this.onMaterialsChange(name, materials, index);
                      }}
                      deleteRecipe={() => this.deleteRecipeItem(recipe.id)}
                    />
                  </Card.Grid>
                );
              })}
            {!loading &&
              recipes[selectedRecipe].detail.length === 0 && (
                <div className={styles.noData}>暂无配方...</div>
              )}
          </Skeleton>
        </Card>
      </PageHeaderLayout>
    );
  }
}
