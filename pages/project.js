import Link from 'next/link'
import { Table, Button, Input, Select, Form } from 'antd'
import { requestGet, requestPost } from '../utils/request'
import Router, { withRouter } from 'next/router'
import 'antd/dist/antd.css'
import URL from '../config/url'
import InterfaceTabs from '../components/tabs'
import { createContext, useReducer, useState } from 'react'

export const Context = createContext(null)

const { getInterfaceURL, addInterfaceURL, deleteInterfaceURL } = URL

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_HEADERS':
            let headers = {}
            action.data.forEach(item => {
                headers[item['Key']] = item['Value']
            })
            console.log(headers)
            return { ...state, headers }
        case 'ADD_BODY':
            let body = {}
            action.data.forEach(item => {
                body[item['Key']] = item['Value']
            })
            console.log(body)
            return { ...state, body, bodyType: action.dataType };
        case 'ADD_DATA':
            return { ...state, data: action.data, };
        default:
            throw new Error();
    }
}


const Project = ({ router, res, form }) => {

    const [state, dispatch] = useReducer(reducer, {})

    const { getFieldDecorator } = form;
    const [list, setList] = useState(res)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Method',
            key: 'method',
            dataIndex: 'method'
        },
        {
            title: 'Headers',
            key: 'headers',
            dataIndex: 'headers'
        },
        {
            title: 'Body',
            key: 'body',
            dataIndex: 'body'
        },
        {
            title: 'Data',
            key: 'data',
            dataIndex: 'data',
            render: data => JSON.parse(data)
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {/* <a>Invite {record.name}</a>
                    <Divider type="vertical" /> */}
                    <a onClick={() => { handleDelete(record) }}>Delete</a>
                </span>
            ),
        },
    ];

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values, state);
                values.url.charAt(0) === '/' && (values.url = values.url.substr(1))
                values.id = router.query.id
                values.body = state.body
                values.headers = state.headers
                values.bodyType = state.bodyType
                values.data = state.data
                await requestPost({ url: addInterfaceURL, body: values })
                let result = await requestPost({ url: getInterfaceURL, body: { id: router.query.id } })
                setList(result.data.data)
            }
        });
    };

    const handleDelete = async (record) => {
        await requestPost({ url: deleteInterfaceURL, body: { id: record.id }, method: 'delete' })
        let result = await requestPost({ url: getInterfaceURL, body: { id: router.query.id } })
        setList(result.data.data)
    }

    const goHome = () => {
        Router.push('/')
    }

    return (
        <Context.Provider value={{ state, dispatch }}>
            <div className="project-box">
                <header className="project-header">
                    <Button onClick={goHome}>返回首页</Button>
                    <Button onClick={handleSubmit}>新增接口</Button>
                </header>
                <Form onSubmit={handleSubmit} layout="inline" className="project-newInterface-form">
                    <Form.Item label="name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '接口名称不能为空!' }],
                        })(
                            <Input
                                placeholder="接口名称"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="url">
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: '请求url不能为空!' }],
                        })(
                            <Input
                                placeholder="请求url"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="desc">
                        {getFieldDecorator('desc')(
                            <Input
                                placeholder="接口描述"
                            />,
                        )}
                    </Form.Item>
                    {/* <Form.Item label="content-type">
                        {getFieldDecorator('head')(
                            <Select placeholder="请求类型" style={{ width: 240 }} onChange={handleChange}>
                                <Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</Option>
                                <Option value="multipart/form-data">multipart/form-data</Option>
                                <Option value="application/json">application/json</Option>
                                <Option value="text/html">text/html</Option>
                            </Select>,
                        )}
                    </Form.Item> */}
                    <Form.Item label="method">
                        {getFieldDecorator('method')(
                            <Input
                                placeholder="请求方法"
                            />,
                        )}
                    </Form.Item>
                </Form>

                <InterfaceTabs />
                <h3>接口列表</h3>
                <Table rowKey={record => record.id} columns={columns} dataSource={list} />
                <style jsx>
                    {`
                    .project-box{
                        width: 100%;
                        height: 100%;
                        box-sizing: boder-box;
                        padding: 20px;
                    }
                    .project-header{
                        margin-bottom: 10px;
                    }
                    .project-newInterface-form{
                        margin: 30px;
                    }
                    .editable-cell {
                        position: relative;
                      }
                      
                      .editable-cell-value-wrap {
                        padding: 10px 12px;
                        cursor: pointer;
                      }
                      
                      .editable-row:hover .editable-cell-value-wrap {
                        border: 1px solid #d9d9d9;
                        border-radius: 4px;
                        padding: 9px 11px;
                      }
                    
                `}
                </style>

            </div>

        </Context.Provider>
    )
}

Project.getInitialProps = async ({ query }) => {
    let result = await requestPost({ url: getInterfaceURL, body: { id: query.id } })
    return { res: result.data.data }
}

const WrappedProject = Form.create({ name: 'interface_create' })(Project);

export default withRouter(WrappedProject)




