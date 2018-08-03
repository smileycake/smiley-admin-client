import { connect } from "dva";
import { Button, Drawer, Form, Input, Select, Col, Row, Spin } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  onFieldsChange(props, changedFields) {
    console.log(props);
    console.log(changedFields);
  },
  mapStateToProps(props) {},
  onValuesChange(props, changedValues, allValues) {
    console.log(props);
  }
})(props => {
  const { getFieldDecorator } = props.form;
  const {
    cakeType,
    cakeDetailInfo,
    cakeMaterials,
    editing,
    onChangeSpec
  } = props;

  function onEditSpec(targetKey, action) {
    if (action === "add") {
    }
  }

  function onSubmit() {
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
            {editing ? <Input style={{ width: 200 }} /> : cakeDetailInfo.name}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="甜品类型">
            {editing ? (
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
            ) : (
              cakeDetailInfo.type
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <CakeSpec
          editing={editing}
          cakeMaterials={cakeMaterials}
          specs={cakeDetailInfo.specs}
        />
      </Row>
      {editing ? (
        <div className={styles.formFooter}>
          <Button className={styles.cancelButton}>Cancel</Button>
          <Button onClick={onSubmit} type="primary">
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
