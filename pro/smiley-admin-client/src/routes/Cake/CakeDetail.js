import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Dropdown, Icon, Row, Col, Card, Badge, Table, Input, Tag, Menu } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeDetail.less';

const { Description } = DescriptionList;

const action = (
  <Fragment>
    <Button icon="save" type="primary">保存</Button>
  </Fragment>
);

const recipeExtra = <Button icon="download">导入配方</Button>;

@connect(({ cakes, loading }) => ({
  cakes,
  loading: loading.effects['cakes/fetchCakeDetail'],
}))
export default class CakeDetail extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakeDetail',
    });
  }

  render() {
    const { cakes, loading } = this.props;
    const { cakeDetail } = cakes;
    let materials = [];
    /*
    if (advancedOperation1.length) {
      materials = advancedOperation1.concat({
        id: '总计',
        updatedAt: 30,
      });
    }
    */

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      /*
      if (index === advancedOperation1.length) {
        obj.props.colSpan = 0;
      }
      */
      return obj;
    };

    const columns = [
      {
        title: '名称',
        dataIndex: 'type',
        key: 'type',
        width: '25%',
        render: (text, row, index) => {
          if (index < advancedOperation1.length) {
            return text;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 3,
            },
          };
        },
      },
      {
        title: '数量',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'status',
        key: 'status',
        width: '25%',
        render: renderContent,
      },
      {
        title: '操作',
        dataIndex: 'updatedAt',
        width: '25%',
        key: 'updatedAt',
      },
    ];

    const menu = (
      <Menu>
        <Menu.Item key="0">1st menu item</Menu.Item>
        <Menu.Item key="1">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>成本</div>
          <div className={styles.heading}>¥ 30-30</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>售价</div>
          <div className={styles.heading}>¥ 98-113</div>
        </Col>
      </Row>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="1">
        <Description term="甜品类型">
          {cakeDetail.type}
          <a style={{ marginLeft: 10 }}>
            <Icon type="edit" />
          </a>
        </Description>
        <Description term="口味">
          {!loading && cakeDetail.tastes.map(taste => {
            return <Tag>{taste.name}</Tag>
          })}
        </Description>
        <Description term="规格">
          {!loading && cakeDetail.specs.map(spec => {
            return <Tag>{spec.name}</Tag>
          })}
        </Description>
      </DescriptionList>
    );

    return (
      <PageHeaderLayout
        title={
          <Fragment>
            <Dropdown overlay={menu} trigger={['click']}>
              <span>{cakeDetail.name}</span>
            </Dropdown>
            <a style={{ marginLeft: 10 }}>
              <Icon type="edit" />
            </a>
          </Fragment>
        }
        loading={loading}
        content={description}
        extraContent={extra}
        action={action}
      >
        <Card title="配方" className={styles.recipeCard} bordered={false} extra={recipeExtra}>
          <Button type="dashed" icon="plus" className={styles.addRecipe}>
            添加配方
          </Button>
          <Table
            title={() => (
              <div className={styles.recipeTitle}>
                <div className={styles.name}>
                  <span>退货商品</span>
                  <a>
                    <Icon type="edit" />
                  </a>
                </div>
                <Button icon="book">存为常用配方</Button>
              </div>
            )}
            size="small"
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={materials}
            columns={columns}
          />
          <Table
            title={() => (
              <div className={styles.recipeTitle}>
                <div className={styles.name}>
                  <span>退货商品</span>
                  <a>
                    <Icon type="edit" />
                  </a>
                </div>
                <Button icon="book">存为常用配方</Button>
              </div>
            )}
            size="small"
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={materials}
            columns={columns}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
