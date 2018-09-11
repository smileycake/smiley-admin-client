import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import shallowEqual from 'shallowequal';
import { Button, Icon, Input, Row, Col, Card, Skeleton } from 'antd';
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
export default class CakeDetail extends Component {
  newRecipeItemId = 0;
  newTasteId = 0;
  newSpecId = 0;
  cacheOriginName = null;
  cacheOriginPrice = null;

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
      editingName: false,
      editingPrice: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'materials/fetchMaterials',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, cakeDetail, defaultTaste, defaultSpec } = nextProps;
    if (!loading) {
      let selectedTaste = defaultTaste || cakeDetail.tastes[0].id;
      let selectedSpec = defaultSpec || cakeDetail.specs[0].id;
      let selectedRecipe = null;
      cakeDetail.recipes.forEach((recipe, index) => {
        if (recipe.tasteId === selectedTaste && recipe.specId === selectedSpec) {
          selectedRecipe = index;
        }
      });
      this.newRecipeItemId = cakeDetail.recipes[selectedRecipe].detail.length;
      this.newTasteId = cakeDetail.tastes.length;
      this.newSpecId = cakeDetail.specs.length;
      this.setState({
        selectedTaste,
        selectedSpec,
        selectedRecipe,
        ...cakeDetail,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  updateSelectedRecipe(selectedTaste, selectedSpec) {
    const { recipes } = this.state;
    let selectedRecipe = null;
    recipes.forEach((recipe, index) => {
      if (recipe.tasteId === selectedTaste && recipe.specId === selectedSpec) {
        selectedRecipe = index;
      }
    });
    this.newRecipeItemId = recipes[selectedRecipe].detail.length;
    this.newTasteId = cakeDetail.tastes.length;
    this.newSpecId = cakeDetail.specs.length;
    this.setState({
      selectedTaste,
      selectedSpec,
      selectedRecipe,
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
      id: ++this.newRecipeItemId,
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

  onNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  saveName = () => {
    this.toggleEditName();
  };

  cancelEditName = () => {
    this.setState({
      editingName: false,
      name: this.cacheOriginName,
    });
  };

  toggleEditName = () => {
    const { name, editingName } = this.state;
    if (!editingName) {
      this.cacheOriginName = name;
    }
    this.setState({
      editingName: !editingName,
    });
  };

  onPriceChange = e => {
    if (e.target.value !== '' && !Number(e.target.value)) {
      return;
    }
    const { selectedRecipe } = this.state;
    const newRecipes = this.copyRecipes();
    newRecipes[selectedRecipe].price = Number(e.target.value);
    this.setState({
      recipes: newRecipes,
    });
  };

  savePrice = () => {
    this.toggleEditPrice();
  };

  cancelEditPrice = () => {
    const { selectedRecipe } = this.state;
    const newRecipes = this.copyRecipes();
    newRecipes[selectedRecipe].price = this.cacheOriginPrice;
    this.setState({
      editingPrice: false,
      recipes: newRecipes,
    });
  };

  toggleEditPrice = () => {
    const { recipes, selectedRecipe, editingPrice } = this.state;
    if (!editingPrice) {
      this.cacheOriginPrice = recipes[selectedRecipe].price;
    }
    this.setState({
      editingPrice: !editingPrice,
    });
  };

  onAddNewTaste = taste => {
    const { tastes } = this.state;
    const newTastes = tastes.map(taste => ({ ...taste }));
    newTastes.push({ id: ++this.newTasteId, name: taste });
    this.setState({
      tastes: newTastes,
    });
  };

  onAddNewSpec = spec => {
    const { specs } = this.state;
    const newSpecs = specs.map(spec => ({ ...spec }));
    newSpecs.push({ id: ++this.newSpecId, name: spec });
    this.setState({
      specs: newSpecs,
    });
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
      editingName,
      editingPrice,
    } = this.state;

    let totalCost = this.getTotalCost();

    const action = loading ? null : (
      <Fragment>
        <Button type="primary">保存</Button>
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

    const title = loading ? null : (
      <Skeleton active paragraph={false} loading={loading}>
        {editingName && (
          <Input
            style={{ width: 150 }}
            autoFocus
            value={name}
            onChange={this.onNameChange}
            onPressEnter={this.saveName}
            onKeyUp={e => {
              if (e.key === 'Escape') this.cancelEditName();
            }}
            onBlur={this.cancelEditName}
          />
        )}
        {!editingName && (
          <Fragment>
            <span>{name}</span>
            <a style={{ marginLeft: 10 }} onClick={this.toggleEditName}>
              <Icon type="edit" />
            </a>
          </Fragment>
        )}
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
          <div className={styles.heading}>
            {editingPrice && (
              <Input
                style={{ width: 75 }}
                autoFocus
                value={recipes[selectedRecipe].price}
                onChange={this.onPriceChange}
                onPressEnter={this.savePrice}
                onKeyUp={e => {
                  if (e.key === 'Escape') this.cancelEditPrice();
                }}
                onBlur={this.cancelEditPrice}
              />
            )}
            {!editingPrice && (
              <Fragment>
                ¥ {recipes[selectedRecipe].price}
                <a style={{ marginLeft: 10 }} onClick={this.toggleEditPrice}>
                  <Icon type="edit" />
                </a>
              </Fragment>
            )}
          </div>
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
                onAddTag={this.onAddNewTaste}
                newTagPlaceholder="新口味"
              />
            </DescriptionList.Description>
            <DescriptionList.Description term="规格">
              <RadioTag.Group
                defaultValue={selectedSpec}
                dataSource={specs}
                onChange={this.onSpecChange}
                onAddTag={this.onAddNewSpec}
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
