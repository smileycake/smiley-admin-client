import { connect } from 'dva';
import { Button, Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import * as constants from '../constants';
import * as commonConstants from '../../../utils/commonConstants';

function Stocks({ dispatch, list: dataSource, loading, total, page: current }) {
    const colums = [
        {
            title: constants.MATERIAL_NAME,
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: text => <a href=''>{text}</a>
        },
        {
            title: constants.MATERIAL_TYPE,
            dataIndex: 'type',
            key: 'email',
            width: '10%',
        },
        {
            title: constants.MATERIAL_REMAIN,
            dataIndex: 'remain',
            key: 'website',
            width: '10%',
        },
        {
            title: constants.MATERIAL_PRICE,
            dataIndex: 'price',
            key: 'website',
            width: '10%',
        },
        {
            title: constants.MATERIAL_REMAIN_ALERT,
            dataIndex: 'remainAlert',
            key: 'website',
            width: '10%',
        },
        {
            title: commonConstants.TABLE_OPERATION,
            key: 'operation',
            width: '20%',
            render: (text, { id }) => (
                <span >
                    <a href=''>Edit</a>
                    <Popconfirm title='Confirm to delete?' >
                        <a href=''>Delete</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    return (
        <div>
            <div>
                <Button type="primary">Primary</Button>
            </div>
            <div>
                <Table
                    loading={loading}
                    columns={colums}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    current={current}
                    pageSize={commonConstants.PAGE_SIZE}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(Stocks);