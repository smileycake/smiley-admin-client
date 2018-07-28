import { Component } from 'react';
import { Button, Table, Popconfirm } from 'antd';

class CakeMaterialTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '名称',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '数量',
                dataIndex: 'age',
                width: '30%',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '30%',
                render: (text, record) => {
                    return (
                        this.state.dataSource.length > 1
                        ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                            </Popconfirm>
                        ) : null
                    );
                },
            }
        ];
        this.state = {
            dataSource: [{
                key: '0',
                name: 'Edward King 0',
                age: '32',
                address: 'London, Park Lane no. 0',
              }, {
                key: '1',
                name: 'Edward King 1',
                age: '32',
                address: 'London, Park Lane no. 1',
              }],
        }
    }

    render() {
        const { dataSource } = this.state;
        const columns = this.columns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
              }),
            };
          });
        return (
            <div>
                <Table
                    size='small'
                    bordered={true}
                    showHeader={true}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
                <Button onClick={this.handleAdd} type="default" icon='plus'  style={{ marginTop: 16, width: '100%' }}/>
            </div>
        );
    }
}

export default CakeMaterialTable;