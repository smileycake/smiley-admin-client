import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Cakes.css';
import * as constants from '../constants';
import * as commonConstants from '../../../utils/commonConstants';

function Cakes({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandler(id) {
        console.warn(`TODO: ${id}`);
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/cakes',
            query: { page }
        }))
    }

    const colums = [
        {
            title: constants.CAKE_NAME,
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: text => <a href=''>{text}</a>
        },
        {
            title: constants.CAKE_TYPE,
            dataIndex: 'email',
            key: 'email',
            width: '10%',
        },
        {
            title: constants.CAKE_COST,
            dataIndex: 'website',
            key: 'website',
            width: '10%',
        },
        {
            title: constants.CAKE_PRICE,
            dataIndex: 'website',
            key: 'website',
            width: '10%',
        },
        {
            title: constants.CAKE_GROUP_PURCHASE,
            dataIndex: 'website',
            key: 'website',
            width: '10%',
        },
        {
            title: commonConstants.TABLE_OPERATION,
            key: 'operation',
            width: '20%',
            render: (text, { id }) => (
                <span className={styles.operation}>
                    <a href=''>Edit</a>
                    <Popconfirm title='Confirm to delete?' onConfirm={deleteHandler.bind(null, id)}>
                        <a href=''>Delete</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    return (
        <div className={styles.normal}>
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
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToPrpos(state) {
    const { list, total, page } = state.cakes;
    return {
        list,
        total,
        page,
        loading: state.loading.models.cakes
    };
}

export default connect(mapStateToPrpos)(Cakes);