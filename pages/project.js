import Link from 'next/link'
import { Table, Button, Input, Select, Form } from 'antd'
import { requestGet, requestPost } from '../utils/request'
import Router, { withRouter } from 'next/router'
import 'antd/dist/antd.css'
import { useState } from 'react'
import URL from '../config/url'
import InterfaceTabs from '../components/tabs'

const { getInterfaceURL, addInterfaceURL, deleteInterfaceURL } = URL
const { Option } = Select

const Project = ({ router, res, form }) => {

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
            title: 'Head',
            key: 'head',
            dataIndex: 'head'
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
                console.log('Received values of form: ', values);
                values.id = router.query.id
                await requestPost({ url: addInterfaceURL, body: values })
                let result = await requestPost({ url: getInterfaceURL, body: { id: router.query.id } })

                console.log(result)
                setList(result.data.data)
            }
        });
    };

    const handleChange = (e) => {
        console.log(e)
    }

    const handleDelete = async (record) => {
        await requestPost({ url: deleteInterfaceURL, body: { id: record.id }, method: 'delete' })
        let result = await requestPost({ url: getInterfaceURL, body: { id: router.query.id } })
        setList(result.data.data)
    }

    const goHome = () => {
        Router.push('/')
    }

    return (
        <div className="project-box">
            <header className="project-header">
                <Button onClick={goHome}>返回首页</Button>
                <Button onClick={handleSubmit}>新增接口</Button>
            </header>
            <InterfaceTabs />
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
                <Form.Item label="content-type">
                    {getFieldDecorator('head')(
                        <Select placeholder="请求类型" defaultValue="application/json" style={{ width: 240 }} onChange={handleChange}>
                            <Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</Option>
                            <Option value="multipart/form-data">multipart/form-data</Option>
                            <Option value="application/json">application/json</Option>
                            <Option value="text/html">text/html</Option>
                            {/* <Option value=""></Option> */}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="method">
                    {getFieldDecorator('method')(
                        <Input
                            placeholder="请求方法"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="body">
                    {getFieldDecorator('body')(
                        <Input.TextArea style={{ width: '80vw', height: '20vh' }}
                            placeholder="请求体"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="data">
                    {getFieldDecorator('data')(
                        <Input.TextArea style={{ width: '80vw', height: '20vh' }}
                            placeholder="接口返回值"
                        />,
                    )}
                </Form.Item>
            </Form>
            <h3>接口列表</h3>
            <Table columns={columns} dataSource={list} />
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
                `}
            </style>

        </div>
    )
}

Project.getInitialProps = async ({ query }) => {
    let result = await requestPost({ url: getInterfaceURL, body: { id: query.id } })
    return { res: result.data.data }
}

const WrappedProject = Form.create({ name: 'interface_create' })(Project);

export default withRouter(WrappedProject)




