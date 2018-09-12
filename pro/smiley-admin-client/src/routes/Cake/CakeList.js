import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { List, Card, Input, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CakeList.less';
import { getRoutes } from '../../utils/utils';
import RadioTag from '../../components/CustomComponents/RadioTag';

const { Search } = Input;

@connect(({ cakes, loading }) => ({
  cakes: cakes.cakes,
  loading: loading.effects['cakes/fetchCakes'],
}))
export default class CakeList extends PureComponent {
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

  render() {
    const { cakes, loading, match, routerData } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      pageSize: 5,
      total: 50,
    };

    return (
      <Switch>
        {getRoutes(match.path, routerData).map(item => (
          <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
        ))}
        <>
          <PageHeaderLayout>
            <div className={styles.standardList}>
              <Card
                className={styles.listCard}
                bordered={false}
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                extra={extraContent}
              >
                <Button
                  type="dashed"
                  style={{ width: '100%', marginBottom: 8 }}
                  icon="plus"
                  onClick={this.handleCreateCake}
                >
                  添加
                </Button>
                <List
                  size="large"
                  rowKey="id"
                  loading={loading}
                  pagination={paginationProps}
                  dataSource={cakes}
                  renderItem={item => (
                    <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
                      <List.Item.Meta
                        title={<a href={item.href}>{item.name}</a>}
                        description={
                          <Fragment>
                            <RadioTag.Group dataSource={item.tastes} />
                          </Fragment>
                        }
                      />
                      <div className={styles.listContent}>
                        <div className={styles.listContentItem} style={{ width: 100 }}>
                          <span>价格</span>
                          <p>0</p>
                        </div>
                        <div className={styles.listContentItem} style={{ width: 100 }}>
                          <span>类型</span>
                          <p>{item.type}</p>
                        </div>
                        <div className={styles.listContentItem}>
                          <span>开始时间</span>
                          <p>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </PageHeaderLayout>
        </>
      </Switch>
    );
  }
}
