import React, { PureComponent, createElement } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch } from 'dva/router';
import { Button, Row, Col, Form, Card, Select, List, Tag, Icon, Input } from 'antd';

import StandardFormRow from 'components/StandardFormRow';

import styles from './CakeList.less';

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ cakes, loading }) => ({
  cakes,
  loading: loading.models.cakes,
}))
export default class CakeList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakes',
      payload: {
        count: 8,
      },
    });
  }

  handleCreateCake = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/cake/cakeDetail'));
  };

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'cakes/fetchCakes',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  };

  render() {
    const {
      cakes: { cakes = [] },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = cakes ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={cakes}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={
                <div height={154}>
                  <img
                    alt={item.title}
                    src={item.cover}
                    style={{ maxWidth: '100%', wdith: 'auto', maxHeight: '100%', height: 'auto' }}
                  />
                </div>
              }
              actions={[<Icon type="delete" />]}
            >
              <Card.Meta title={<a>{item.name}</a>} />
              {item.prices.map(price => {
                return (
                  <div className={styles.priceContent}>
                    <span>
                      {price.taste} / {price.spec}
                    </span>
                    <span>￥{price.price}</span>
                  </div>
                );
              })}
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow grid last>
              <Row gutter={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col lg={4} md={10} sm={10} xs={24}>
                  <Button icon="plus" onClick={this.handleCreateCake}>
                    添加
                  </Button>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <Input.Search
                    className={styles.search}
                    placeholder="请输入"
                    onSearch={() => ({})}
                  />
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </>
    );
  }
}
