import { connect } from "dva";
import { Button, Drawer, Form, Input, Select, Col, Row, Spin } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        value: props.cakeDetailInfo.name
      }),
      type: Form.createFormField({
        value: props.cakeDetailInfo.type
      }),
      specs: Form.createFormField(props.cakeDetailInfo.specs)
    };
  }
})(props => {
  const { getFieldDecorator } = props.form;
  const { cakeType, cakeDetailInfo, cakeMaterials, editing } = props;

  function submitHandler() {
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  return (
    <Form layout="inline" hideRequiredMark>
      <Row>
        <Col span={12}>
          <Form.Item label="甜品名称">
            {editing
              ? getFieldDecorator("name", {
                  rules: [{ required: true }]
                })(<Input style={{ width: 200 }} />)
              : cakeDetailInfo.name}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="甜品类型">
            {editing
              ? getFieldDecorator("type", {
                  rules: [{ required: true }]
                })(
                  <Select
                    style={{ width: 200 }}
                    showSearch
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
      <Row gutter={16} style={{ marginTop: 20, marginBottom: 20 }}>
        {getFieldDecorator("specs", {
          rules: [{ required: true }],
          valuePropName: "specs",
          initialValue: cakeDetailInfo.specs
        })(<CakeSpec editing={editing} cakeMaterials={cakeMaterials} />)}
      </Row>

      {editing ? (
        <div className={styles.formFooter}>
          <Button className={styles.cancelButton}>Cancel</Button>
          <Button type="primary" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      ) : null}
    </Form>
  );
});

function CakeDetail({
  dispatch,
  cakeId,
  cakeDetailInfo,
  cakeMaterials,
  loading,
  editing,
  visible,
  cakeType
}) {
  function visibleHandler(e) {
    dispatch({
      type: "cakeDetail/showCakeDetailPanel",
      payload: {
        visible: false
      }
    });
  }

  return (
    <Drawer
      onClose={visibleHandler}
      width={720}
      maskClosable={false}
      visible={visible}
      title={cakeDetailInfo.name === "" ? "添加甜品" : "甜品详情"}
      style={{
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: 53
      }}
    >
      {loading ? (
        <Spin />
      ) : (
        <CakeDetailForm
          editing={editing}
          cakeType={cakeType}
          cakeDetailInfo={cakeDetailInfo}
          cakeMaterials={cakeMaterials}
        />
      )}
    </Drawer>
  );
}

function mapStateToProps(state) {
  const {
    cakeId,
    cakeDetailInfo,
    cakeType,
    cakeMaterials,
    editing,
    visible
  } = state.cakeDetail;
  return {
    cakeId,
    cakeDetailInfo,
    cakeMaterials,
    cakeType,
    editing,
    visible,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(CakeDetail);
