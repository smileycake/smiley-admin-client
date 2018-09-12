import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import shallowEqual from 'shallowequal';
import { Button, Icon, Input, Row, Col, Card, Select, Skeleton } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeDetail.less';
import RadioTag from '../../components/CustomComponents/RadioTag';
import CakeRecipeForm from './CakeRecipeForm';

@connect(({ materials, cakes, loading }) => ({
  cakeDetail: cakes.cakeDetail,
  cakeType: cakes.cakeType,
  materials,
  loading:
    loading.effects['cakes/fetchCakeDetail'] ||
    loading.effects['materials/fetchMaterials'] ||
    loading.effects['cakes/fetchCakeType'],
}))
export default class CakeDetail extends Component {
  newRecipeItemId = 0;
  newTasteId = 0;
  newSpecId = 0;
  cacheOriginName = null;
  cacheOriginPrice = null;
  cacheOriginType = null;

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
      editingType: false,
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
      this.setState(
        {
          ...cakeDetail,
        },
        () => this.updateSelectedRecipe()
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  updateSelectedRecipe(selectedTaste, selectedSpec) {
    const { tastes, specs, recipes } = this.state;
    selectedTaste = selectedTaste || (tastes.length === 0 ? null : tastes[0].id);
    selectedSpec = selectedSpec || (specs.length === 0 ? null : specs[0].id);
    let selectedRecipe = null;
    recipes.forEach((recipe, index) => {
      if (recipe.tasteId === selectedTaste && recipe.specId === selectedSpec) {
        selectedRecipe = index;
      }
    });
    this.newRecipeItemId = recipes[selectedRecipe] ? recipes[selectedRecipe].detail.length : 0;
    this.newTasteId = tastes.length;
    this.newSpecId = specs.length;
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
    const { recipes, selectedRecipe } = this.state;
    if (loading || !selectedRecipe) {
      return 0;
    }
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
    const { tastes, specs } = this.state;
    const newTastes = tastes.map(taste => ({ ...taste }));
    const id = ++this.newTasteId;
    newTastes.push({ id, name: taste });
    const newRecipes = this.copyRecipes();
    specs.forEach(spec => {
      newRecipes.push({
        tasteId: id,
        specId: spec.id,
        price: 0,
        detail: [],
      });
    });
    this.setState({
      tastes: newTastes,
      recipes: newRecipes,
    });
  };

  onDeleteTaste = id => {
    const { tastes, specs, selectedTaste } = this.state;
    const newTastes = tastes.filter(taste => taste.id != id);
    this.setState(
      {
        tastes: newTastes,
      },
      () => {
        if (id === selectedTaste) {
          this.updateSelectedRecipe();
        }
      }
    );
  };

  onAddNewSpec = spec => {
    const { tastes, specs } = this.state;
    const newSpecs = specs.map(spec => ({ ...spec }));
    const id = ++this.newSpecId;
    newSpecs.push({ id, name: spec });
    const newRecipes = this.copyRecipes();
    tastes.forEach(taste => {
      newRecipes.push({
        tasteId: taste.id,
        specId: id,
        price: 0,
        detail: [],
      });
    });
    this.setState({
      specs: newSpecs,
      recipes: newRecipes,
    });
  };

  onDeleteSpec = id => {
    const { tastes, specs, selectedSpec } = this.state;
    const newSpecs = specs.filter(spec => spec.id != id);
    this.setState(
      {
        specs: newSpecs,
      },
      () => {
        if (id === selectedSpec) {
          this.updateSelectedRecipe();
        }
      }
    );
  };

  onTasteNameChange = (id, name) => {
    const { tastes } = this.state;
    const newTastes = tastes.map(taste => {
      return taste.id === id ? { id, name } : { ...taste };
    });
    this.setState({
      tastes: newTastes,
    });
  };

  onSpecNameChange = (id, name) => {
    const { specs } = this.state;
    const newSpecs = specs.map(spec => {
      return spec.id === id ? { id, name } : { ...spec };
    });
    this.setState({
      specs: newSpecs,
    });
  };

  cancelEditType = () => {
    const { type, editingType } = this.state;
    this.setState({
      type: this.cacheOriginType,
      editingType: !editingType,
    });
  };

  onCakeTypeConfirm = () => {
    this.toggleEditType();
  };

  onChangeCakeType = id => {
    const { cakeType } = this.props;
    const newType = cakeType.filter(type => type.id === id)[0];
    this.setState({
      type: newType,
    });
  };

  toggleEditType = () => {
    const { editingType, type } = this.state;
    if (!editingType) {
      this.cacheOriginType = type;
    }
    this.setState({
      editingType: !editingType,
    });
  };

  render() {
    const { loading, materials, cakeType } = this.props;
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
      editingType,
    } = this.state;

    let totalCost = this.getTotalCost();

    const action = loading ? null : (
      <Fragment>
        <Button type="primary" disabled={selectedRecipe === null}>
          保存
        </Button>
      </Fragment>
    );

    const recipeExtra = loading ? null : (
      <Fragment>
        <Button
          icon="plus"
          className={styles.addRecipeItem}
          onClick={this.addRecipeItem}
          disabled={selectedRecipe === null}
        >
          添加配方
        </Button>
        <Button icon="download" disabled={selectedRecipe === null}>
          导入配方
        </Button>
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

    const extra =
      loading || selectedRecipe === null ? null : (
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
                  {selectedRecipe !== null && (
                    <a style={{ marginLeft: 10 }} onClick={this.toggleEditPrice}>
                      <Icon type="edit" />
                    </a>
                  )}
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
              {!editingType && (
                <Fragment>
                  {type.name}
                  <a style={{ marginLeft: 10 }} onClick={this.toggleEditType}>
                    <Icon type="edit" />
                  </a>
                </Fragment>
              )}
              {editingType && (
                <Fragment>
                  <Select
                    size="small"
                    style={{ width: 100 }}
                    defaultValue={type.id}
                    onSelect={this.onChangeCakeType}
                  >
                    {cakeType.map(type => {
                      return <Select.Option value={type.id}>{type.name}</Select.Option>;
                    })}
                  </Select>
                  <a style={{ marginLeft: 10 }} onClick={this.cancelEditType}>
                    <Icon type="stop" />
                  </a>
                  <a style={{ marginLeft: 10 }} onClick={this.onCakeTypeConfirm}>
                    <Icon type="check" />
                  </a>
                </Fragment>
              )}
            </DescriptionList.Description>
            <DescriptionList.Description term="口味">
              <RadioTag.Group
                defaultValue={selectedTaste}
                dataSource={tastes}
                onChange={this.onTasteChange}
                onAddTag={this.onAddNewTaste}
                onDeleteTag={this.onDeleteTaste}
                onLabelChange={this.onTasteNameChange}
                newTagPlaceholder="新口味"
              />
            </DescriptionList.Description>
            <DescriptionList.Description term="规格">
              <RadioTag.Group
                defaultValue={selectedSpec}
                dataSource={specs}
                onChange={this.onSpecChange}
                onAddTag={this.onAddNewSpec}
                onDeleteTag={this.onDeleteSpec}
                onLabelChange={this.onSpecNameChange}
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
              selectedRecipe !== null &&
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
              (selectedRecipe === null || recipes[selectedRecipe].detail.length === 0) && (
                <div className={styles.noData}>暂无配方...</div>
              )}
          </Skeleton>
        </Card>
      </PageHeaderLayout>
    );
  }
}
