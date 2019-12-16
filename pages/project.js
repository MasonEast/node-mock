import Link from 'next/link'
import { Button, Input, Select, Form } from 'antd'
import { requestGet, requestPost } from '../utils/request'
import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'



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
    return (
        <div>
            <content>
                <h3>接口列表</h3>
                <ul>
                    {list.length && list.map(item => {
                        return <li>{item.name}</li>
                    })}
                </ul>

                <Button onClick={handleSubmit}>新增接口</Button>
                <Form onSubmit={handleSubmit} className="project-newInterface-form">
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
            </content>
        </div>
    )
}

Project.getInitialProps = async ({ query }) => {
    console.log(query)
    let result = await requestPost({ url: 'http://localhost:3000/api/getInterface', body: { id: query.id } })

    return { res: result.data.data }
}

const WrappedProject = Form.create({ name: 'interface_create' })(Project);

export default withRouter(WrappedProject)