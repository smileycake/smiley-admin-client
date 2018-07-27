import { connect } from 'dva';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import { routerRedux } from 'dva/router';

function CakeInfo({ dispatch, visible}) {

    function closeHandler(event) {
        dispatch({
            type: 'cakes/openCakeInfo',
            payload: {
                cakeInfoVisible: false
            }
        });
    }

    return (
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={closeHandler}
          closable={false}
          visible={visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    );
}

function mapStateToPrpos(state) {
    const { cakeInfoVisible } = state.cakes;
    return {
        visible: cakeInfoVisible
    };
}

export default connect(mapStateToPrpos)(CakeInfo);