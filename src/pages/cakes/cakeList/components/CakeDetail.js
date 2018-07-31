import { connect } from "dva";
import { Button, Drawer, Form, Input, Select, Col, Row } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.cakeDetailInfo.name.value
      })
    };
  }
})(props => {
  const { getFieldDecorator } = props.form;
  const { cakeType, cakeDetailInfo, editing } = props;
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="甜品名称">
            {editing
              ? getFieldDecorator("name", {
                  rules: [{ required: true, message: "please enter user name" }]
                })(<Input placeholder="please enter user name" />)
              : cakeDetailInfo.name}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="甜品类型">
            {editing
              ? getFieldDecorator("type", {
                  rules: [
                    {
                      required: true,
                      message: "Please select your habitual residence!"
                    }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {cakeType.map(type => {
                      return (
                        <Select.Option key={type.id} value={type.id}>
                          {type.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )
              : cakeDetailInfo.type}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {getFieldDecorator("specs", {
          valuePropName: "specs",
          initialValue: {}
        })(
          <CakeSpec
            onSpecChange={specs => {
              this.props.form.setFieldsValue({
                specs: specs
              });
            }}
          />
        )}
      </Row>
    </Form>
  );
});

function CakeDetail({
  dispatch,
  cakeId,
  cakeDetailInfo,
  editing,
  visible,
  cakeType
}) {
  cakeType = [{ id: 1, name: "奶油蛋糕" }, { id: 2, name: "慕斯" }];
  cakeDetailInfo = {
    id: 2,
    name: "爆浆海盐奶盖",
    type: "奶油蛋糕",
    specs: [
      {
        name: "巧克力",
        price: "98.00",
        materials: [
          {
            name: "面粉",
            quantity: "50",
            price: 10
          },
          {
            name: "巧克力",
            quantity: "20",
            price: 10
          },
          {
            name: "糖",
            quantity: "20",
            price: 10
          }
        ],
        isGroupPurchase: true
      },
      {
        name: "抹茶",
        price: "98.00",
        materials: [
          {
            name: "面粉",
            quantity: "50",
            price: 10
          },
          {
            name: "抹茶",
            quantity: "20",
            price: 15
          },
          {
            name: "糖",
            quantity: "20",
            price: 10
          }
        ],
        isGroupPurchase: false
      },
      {
        name: "酸奶奶油",
        price: "98.00",
        materials: [
          {
            name: "面粉",
            quantity: "50",
            price: 10
          },
          {
            name: "酸奶",
            quantity: "20",
            price: 10
          },
          {
            name: "糖",
            quantity: "30",
            price: 12
          }
        ],
        isGroupPurchase: true
      }
    ]
  };
  function visibleHandler() {
    dispatch({
      type: "cakeDetail/showCakeDetail",
      payload: {
        visible: false
      }
    });
  }
  function onSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  return (
    <Drawer
      onClose={visibleHandler}
      width={720}
      maskClosable={false}
      visible={visible}
    >
      <CakeDetailForm
        editing={editing}
        cakeType={cakeType}
        cakeDetailInfo={cakeDetailInfo}
      />

      <div className={styles.formFooter}>
        <Button className={styles.cancelButton}>Cancel</Button>
        <Button onClick={onSubmit} type="primary">
          Submit
        </Button>
      </div>
    </Drawer>
  );
}

function mapStateToProps(state) {
  const { cakeDetailInfo, editing, visible } = state.cakeDetail;
  return {
    cakeDetailInfo,
    editing,
    visible
  };
}

export default connect(mapStateToProps)(CakeDetail);
