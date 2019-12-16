import Link from 'next/link'
import { Table, Button, Input, Divider, Form } from 'antd'
import { requestGet, requestPost } from '../utils/request'
import Router, { withRouter } from 'next/router'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'

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
        title: 'Header',
        key: 'header',
        dataIndex: 'header'
    },
    {
        title: 'Body',
        key: 'body',
        dataIndex: 'body'
    },
    {
        title: 'Data',
        key: 'data',
        dataIndex: 'data'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>Invite {record.name}</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];


const Project = ({ router, res, form }) => {

    const { getFieldDecorator } = form;
    const [list, setList] = useState(res)


    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                console.log()
                console.log('Received values of form: ', values);
                values.id = router.query.id
                await requestPost({ url: 'http://localhost:3000/api/addInterface', body: values })
                let result = await requestPost({ url: 'http://localhost:3000/api/getInterface', body: { id: router.query.id } })

                console.log(result)
                setList(result.data.data)
            }
        });
    };

    const goHome = () => {
        Router.push('/')
    }

    return (
        <div>
            <Button onClick={goHome}>返回首页</Button>
            <Button onClick={handleSubmit}>新增接口</Button>
            <Form onSubmit={handleSubmit} layout="inline" className="project-newInterface-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '接口名称不能为空!' }],
                    })(
                        <Input
                            placeholder="接口名称"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('url', {
                        rules: [{ required: true, message: '请求url不能为空!' }],
                    })(
                        <Input
                            placeholder="请求url"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('desc')(
                        <Input
                            placeholder="接口描述"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('head')(
                        <Input
                            placeholder="请求头"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('method')(
                        <Input
                            placeholder="请求方法"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('body')(
                        <Input
                            placeholder="请求体"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('data')(
                        <Input
                            placeholder="接口返回值"
                        />,
                    )}
                </Form.Item>
            </Form>
            <h3>接口列表</h3>
            <Table columns={columns} dataSource={list.reverse()} />
        </div>
    )
}

Project.getInitialProps = async ({ query }) => {
    let result = await requestPost({ url: 'http://localhost:3000/api/getInterface', body: { id: query.id } })

    return { res: result.data.data }
}

const WrappedProject = Form.create({ name: 'interface_create' })(Project);

export default withRouter(WrappedProject)




