import { Table, Button, Input, Select, Form, message } from 'antd'
import { requestGet, requestPost } from '../utils/request'
import Router, { withRouter } from 'next/router'
import URL from '../config/url'
import InterfaceTabs from '../components/tabs'
import { createContext, useReducer, useState } from 'react'
import Head from '../components/head'

const { Option } = Select
export const Context = createContext(null)

const { getInterfaceURL, addInterfaceURL, deleteInterfaceURL } = URL

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_HEADERS':
            let headers = {}
            action.data.forEach(item => {
                headers[item['Key']] = item['Value']
            })
            return { ...state, headers }
        case 'ADD_BODY':
            let body = {}
            action.data.forEach(item => {
                body[item['Key']] = item['Value']
            })
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
                values.url.charAt(0) === '/' && (values.url = values.url.substr(1))
                values.id = router.query.id
                values.body = state.body
                values.headers = state.headers
                values.bodyType = state.bodyType
                values.data = state.data
                let res = await requestPost({ url: addInterfaceURL, body: values })
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
        <Head>
            <Context.Provider value={{ state, dispatch }}>
                <div className="project-box">
                    <header className="project-header">
                        <Button style={{ marginRight: '20px' }} onClick={goHome}>返回首页</Button>
                        <Button type="primary" onClick={handleSubmit}>新增接口</Button>
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
                        <Form.Item label="method">
                            {getFieldDecorator('method', {
                                initialValue: 'get',
                            })(
                                <Select style={{ width: '140px' }}>
                                    <Option value="get">get</Option>
                                    <Option value="post">post</Option>
                                    <Option value="delete">delete</Option>
                                    <Option value="update">update</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>

                    <InterfaceTabs />

                    <h3>接口使用规则</h3>
                    <div style={{ marginBottom: '25px' }}>
                        <p>使用mock接口需要在你的接口前面加上/mock/项目id， 以此来做区分；</p>
                        <p>http://47.100.38.254:5001/mock/project_id/你的接口url</p>
                        <p>eg: <span style={{ color: 'pink', fontSize: '18px' }}>http://47.100.38.254:5001/mock/{router.query.id}/url</span></p>
                        <hr />
                    </div>

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

        </Head>
    )
}

Project.getInitialProps = async ({ query }) => {
    let result = await requestPost({ url: getInterfaceURL, body: { id: query.id } })
    return { res: result.data.data }
}

const WrappedProject = Form.create({ name: 'interface_create' })(Project);

export default withRouter(WrappedProject)




