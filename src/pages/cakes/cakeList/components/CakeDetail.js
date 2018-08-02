import { connect } from "dva";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Col,
  Row,
  Spin,
  Tabs,
  Switch,
  Table,
  Transfer
} from "antd";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  onFieldsChange(props, changedFields) {
    console.log(props);
    console.log(changedFields);
  },
  mapPropsToFields(props) {}
})(props => {
  const { getFieldDecorator } = props.form;
  const {
    cakeType,
    cakeDetailInfo,
    cakeMaterials,
    editing,
    activeSpecTab,
    onChangeSpec
  } = props;

  function onChange(activeSpecTab) {
    onChangeSpec(activeSpecTab);
  }

  function onEdit() {}

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
            {editing
              ? getFieldDecorator("name", {
                  rules: [{ required: true, message: "please enter user name" }]
                })(<Input style={{ width: 200 }} />)
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
      <Row gutter={16}>
        {getFieldDecorator("specs", {
          rules: [{ required: true, message: "no spec" }]
        })(
          <Tabs onChange={onChange} activeKey={activeSpecTab} onEdit={() => {}}>
            {cakeDetailInfo.specs.map(spec => (
              <Tabs.TabPane tab={spec.name} key={spec.name} closable={false}>
                <Row>
                  <Col span={10}>
                    <Form.Item label="规格名称">
                      {editing
                        ? getFieldDecorator("specName", {
                            rules: [{ required: true, message: "no spec name" }]
                          })(<Input />)
                        : spec.name}
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item label="售价">
                      {editing ? <Input /> : spec.price}
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label="团购否">
                      {editing ? (
                        <Switch checkedChildren="是" unCheckedChildren="否" />
                      ) : spec.isGroupPurchase ? (
                        "是"
                      ) : (
                        "否"
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item
                    style={{ width: "100%" }}
                    wrapperCol={{ span: 24 }}
                    label="配方"
                  >
                    <Transfer
                      dataSource={cakeMaterials}
                      listStyle={{
                        width: "46.5%",
                        height: 300
                      }}
                      render={item => item.name}
                      showSearch
                    />
                    <Table
                      size="small"
                      bordered
                      dataSource={spec.materials}
                      rowClassName="editable-row"
                      pagination={false}
                      footer={() => {
                        return <span>aaaa</span>;
                      }}
                    >
                      <Table.Column title="名称" dataIndex="name" width="25%" />
                      <Table.Column
                        title="数量"
                        dataIndex="quantity"
                        width="25%"
                      />
                      <Table.Column
                        title="单价（元）"
                        dataIndex="price"
                        width="25%"
                      />
                    </Table>
                  </Form.Item>
                </Row>
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
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
  cakeType,
  activeSpecTab
}) {
  function onChangeSpec(activeSpecTab) {
    dispatch({
      type: "cakeDetail/changeCakeSpecTab",
      payload: {
        activeSpecTab: activeSpecTab
      }
    });
  }

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
          activeSpecTab={activeSpecTab}
          onChangeSpec={onChangeSpec}
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
    visible,
    activeSpecTab
  } = state.cakeDetail;
  return {
    cakeId,
    cakeDetailInfo,
    cakeMaterials,
    cakeType,
    editing,
    visible,
    activeSpecTab,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(CakeDetail);
