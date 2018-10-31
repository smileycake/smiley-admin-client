import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Table, Cascader, Input, Button, Select, Popconfirm, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 24,
  },
};

@connect(({ form, cakes, loading }) => ({
  data: form.step,
  cakes: cakes.cakes,
  loading: loading.effects['cakes/fetchCakes'],
}))
@Form.create()
export default class CakeSelect extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cakes/fetchCakeList',
      payload: {
        count: 5,
      },
    });
  }

  onChange(value) {
    console.log(value);
  }

  getCakes() {
    const { cakes } = this.props;
    if (cakes === null) {
      return [];
    }
    return cakes.map(cake => {
      const tastes = cake.tastes.map(taste => {
        const specs = taste.specs.map(spec => {
          return {
            value: spec.id,
            label: spec.name,
          };
        });
        return {
          value: taste.id,
          label: taste.name,
          children: specs,
        };
      });
      return {
        value: cake.id,
        label: cake.name,
        children: tastes,
      };
    });
  }

  render() {
    const availableCakes = this.getCakes();
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        width: '25%',
      },
      {
        title: '口味',
        width: '20%',
        render: () => {
          return '巧克力';
        },
      },
      {
        title: '规格',
        width: '20%',
        render: () => {
          return '6寸 + 装饰';
        },
      },
      {
        title: '价格',
        width: '10%',
        render: () => {
          return '288';
        },
      },
      {
        title: '操作',
        width: '25%',
        render: () => {
          return (
            <Fragment>
              <a href="">编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除嘛?~"
                onConfirm={() => {
                  this.onDeleteCake(record.id, index);
                }}
              >
                <a href="">删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ];
    const { form, dispatch, loading, cakes } = this.props;
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/order/timeline/newOrder/reciver'));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <div className={styles.cakeSelectPanel}>
            <Cascader options={availableCakes} onChange={this.onChange} placeholder="选择甜品" />
            <Button>添加</Button>
          </div>
          <Form.Item {...formItemLayout}>
            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              dataSource={cakes}
              columns={columns}
              pagination={false}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}
