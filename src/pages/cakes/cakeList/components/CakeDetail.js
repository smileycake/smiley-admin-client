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
  Table
} from "antd";
import CakeSpec from "./CakeSpec";
import CakeMaterial from "./CakeMaterial";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create({
  mapPropsToFields(props) {}
})(props => {
  const { getFieldDecorator } = props.form;
  const {
    cakeType,
    cakeDetailInfo,
    editing,
    activeSpecTab,
    onChangeSpec
  } = props;

  function onChange(activeSpecTab) {
    onChangeSpec(activeSpecTab);
  }

  function onEdit() {}
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      width: "25%"
    },
    {
      title: "数量",
      dataIndex: "quantity",
      width: "25%",
      editable: true
    },
    {
      title: "单价（元）",
      dataIndex: "price",
      width: "25%"
    }
  ];
  return (
    <Form layout="inline" hideRequiredMark>
      <Row>
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
        <Tabs onChange={onChange} activeKey={activeSpecTab} onEdit={() => {}}>
          {cakeDetailInfo.specs.map(spec => (
            <Tabs.TabPane tab={spec.name} key={spec.name} closable={false}>
              <Row>
                <Col span={10}>
                  <Form.Item label="规格名称">
                    {editing ? (
                      <Input placeholder="please enter user name" />
                    ) : (
                      spec.name
                    )}
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item label="售价">
                    {editing ? (
                      <Input placeholder="please enter user name" />
                    ) : (
                      spec.price
                    )}
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
                <Form.Item label="配方">
                  <Table
                    size="small"
                    bordered
                    dataSource={spec.materials}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                    footer={() => {
                      return <span>aaaa</span>;
                    }}
                  />
                </Form.Item>
              </Row>
            </Tabs.TabPane>
          ))}
        </Tabs>
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
      {loading ? (
        <Spin />
      ) : (
        <CakeDetailForm
          editing={editing}
          cakeType={cakeType}
          cakeDetailInfo={cakeDetailInfo}
          activeSpecTab={activeSpecTab}
          onChangeSpec={onChangeSpec}
        />
      )}

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
    visible,
    activeSpecTab
  } = state.cakeDetail;
  return {
    cakeId,
    cakeDetailInfo,
    cakeType,
    editing,
    visible,
    activeSpecTab,
    loading: state.loading.models.cakeDetail
  };
}

export default connect(mapStateToProps)(CakeDetail);
