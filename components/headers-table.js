import { Table, Input, Select, Button, Popconfirm, Form } from 'antd';
import React, { useState, useContext } from 'react'
import { Context } from '../pages/project'

const EditableContext = React.createContext();
const { Option } = Select

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, options } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                })(<Select style={{ width: '240px' }} ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}>
                    {options.map(item => <Option key={item} value={item}>{item}</Option>)}
                </Select>)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={e => this.toggleEdit(e)}
                >
                    {children}
                </div>
            );
    };

    render () {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

const HeadersTable = (props) => {

    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            Key: '',
            Value: '',
        }
    ])
    const AppContext = useContext(Context)
    const [options, setOptions] = useState([])

    let columns = [
        {
            key: 0,
            title: 'Key',
            dataIndex: 'Key',
            width: '30%',
            editable: true,
        },
        {
            key: 1,
            title: 'Value',
            dataIndex: 'Value',
            width: '30%',
            editable: true,
        },
        {
            key: 2,
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleDelete = key => {
        setDataSource(pre => {
            return pre.filter(item => item.key !== key)
        })
    };

    const handleAdd = () => {
        const newData = {
            Key: '',
            Value: '',
        };
        setDataSource([...dataSource, newData])
    };

    const handleSave = row => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(() => newData)
        AppContext.dispatch({ type: 'ADD_HEADERS', data: newData })
    };


    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    };

    columns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record, rowIndex) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
                options,
                onClick: () => {
                    if (col.title === 'Key') {
                        setOptions(['contentType'])
                    } else {
                        setOptions(['application/x-www-form-urlencoded', 'multipart/form-data', 'application/json', 'text/html'])
                    }
                }
            }),
        };
    });

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                新增一行
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}

            />
        </div>
    );

}

export default HeadersTable

