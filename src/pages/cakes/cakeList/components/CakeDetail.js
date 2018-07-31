import { connect } from "dva";
import { Button, Drawer, Form, Input, Select, Col, Row } from "antd";
import CakeSpec from "./CakeSpec";
import styles from "./CakeEditDrawer.css";

const CakeDetailForm = Form.create()(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="甜品名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "please enter user name" }]
            })(<Input placeholder="please enter user name" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="甜品类型">
            {getFieldDecorator("type", {
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
              />
            )}
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

function CakeDetail({ dispatch, cakeDetailInfo, editing, visible, cakeType }) {
  function onSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  return (
    <Drawer onClose={() => {}} width={720} maskClosable={false} visible={true}>
      <CakeDetailForm cakeType={[]} editing={false} />

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
