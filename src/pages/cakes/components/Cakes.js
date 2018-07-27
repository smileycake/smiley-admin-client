import { connect } from 'dva';
import { Divider, Table, Pagination, Popconfirm } from 'antd';
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

    function expandedRowRender(record) {
        return null;
    }

    const colums = [
        {
            key: 'expand',
            width: '5%',
        },
        {
            title: constants.CAKE_NAME,
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: text => <a href=''>{text}</a>
        },
        {
            title: constants.CAKE_TYPE,
            dataIndex: 'type',
            key: 'type',
            width: '10%',
        },
        {
            title: constants.CAKE_COST,
            dataIndex: 'cost',
            key: 'cost',
            width: '15%',
        },
        {
            title: constants.CAKE_PRICE,
            dataIndex: 'price',
            key: 'price',
            width: '15%',
        },
        {
            title: constants.CAKE_GROUP_PURCHASE,
            dataIndex: 'isGroupPurchase',
            key: 'isGroupPurchase',
            width: '10%',
            render: isGroupPurchase => {
                let text = '';
                if (isGroupPurchase !== undefined) {
                    text = isGroupPurchase ? '是' : '否'
                }
                return (
                    <span>{text}</span>
                );
            }
        },
        {
            title: commonConstants.TABLE_OPERATION,
            key: 'operation',
            width: '20%',
            render: (text, { id }) => {
                return text.type === undefined ? null : (
                    <span className={styles.operation}>
                        <a href=''>{commonConstants.OPERATION_CHECK}</a>
                        <Divider type="vertical" />
                        <a href=''>{commonConstants.OPERATION_EDIT}</a>
                        <Divider type="vertical" />
                        <Popconfirm title={commonConstants.ALERT_DELETE} onConfirm={deleteHandler.bind(null, id)}>
                            <a href=''>{commonConstants.OPERATION_DELETE}</a>
                        </Popconfirm>
                    </span>
                )
            }
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
                    expandIconAsCell={true}
                    expandIconColumnIndex={0}
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