import { connect } from "dva";
import { Button, Drawer, Form, Input, Select, Col, Row, Spin } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.cakeDetailInfo.name
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
  loading,
  editing,
  visible,
  cakeType
}) {
  function visibleHandler(e) {
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
      {loading ? <Spin /> : null}
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
  const {
    cakeId,
    cakeDetailInfo,
    cakeType,
    editing,
    visible
  } = state.cakeDetail;
  return {
    cakeId,
    cakeDetailInfo,
    cakeType,
    editing,
    visible,
    loading: true
  };
}

export default connect(mapStateToProps)(CakeDetail);
