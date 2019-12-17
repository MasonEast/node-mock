import { Table, Input, Radio, Select, Button, Popconfirm, Form } from 'antd';
import React, { useState, useContext } from 'react'
import './headers-table.css'
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
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    initialValue: record[dataIndex],
                })(<Input style={{ width: '240px' }} ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}>

                </Input>)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
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

const BodyTable = (props) => {

    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            Key: '',
            Value: '',
        }
    ])
    const [radioValue, setRadioValue] = useState('none')
    
    const AppContext = useContext(Context)

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
        AppContext.dispatch({ type: 'ADD_BODY', data: newData, dataType: radioValue })
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
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    return (
        <div>
            <header>
                <Button onClick={handleAdd} type="primary" style={{ margin: '0 16px 16px 0' }}>
                    Add a row
                </Button>
                <Radio.Group onChange={(e) => {
                    // e.persist()
                    console.log(e.target)
                    setRadioValue(e.target.value)
                }}
                    value={radioValue}
                >
                    <Radio value={'form-data'}>form-data</Radio>
                    <Radio value={'x-www-form-urlencoded'}>x-www-form-urlencoded</Radio>
                    <Radio value={'raw'}>raw</Radio>
                </Radio.Group>
            </header>
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

export default BodyTable

