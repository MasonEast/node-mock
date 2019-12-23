
import Router, { withRouter } from 'next/router'
import { Button, Modal, Form, Spin, Input, message } from 'antd'
import Card from '../components/card';
import { requestGet, requestPost } from '../utils/request'
import URL from '../config/url'
import { useState } from 'react'
import Head from '../components/head'
import './index.css'

const { getProjectURL, addProjectURL, deleteProjectURL } = URL

const Home = ({ res = [], form }) => {
    const [flag, setFlag] = useState(false)
    const [spinFlag, setSpinFlag] = useState(false)
    const [list, setList] = useState(res)
    const { getFieldDecorator } = form;
    const handleOk = e => {
        setFlag(false)
    };

    const handleCancel = e => {
        setFlag(false)
    };

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                values.user_id = '123@qq.com'
                await requestPost({ url: addProjectURL, body: values })
                let result = await Home.getInitialProps()
                setList(result.res)
                setFlag(false)
            }
        });
    };

    const handleAdd = async () => {
        setFlag(true)
    }

    const goDetail = (e, id) => {
        setSpinFlag(true)
        Router.push({
            pathname: '/project',
            query: { id }
        })
    }

    const deleteProject = async (e, id) => {
        e.stopPropagation()
        let deleteResult = await requestPost({ url: deleteProjectURL, body: { id }, method: 'delete' })
        let result = await Home.getInitialProps()
        setList(result.res)
    }

    return (
        <Head>
            <Spin tip="Loading..." spinning={spinFlag}>
                <div className="home-box">
                    <Button style={{ width: '100%', height: '50px', marginBottom: '50px' }} onClick={handleAdd}>添加项目</Button>
                    <content className="home-content">
                        {
                            list.map(item => (
                                <Card
                                    projectName={item.name}
                                    url={item.url}
                                    id={item.id}
                                    key={item.id}
                                    deleteProject={deleteProject}
                                    goDetail={goDetail}
                                    desc={item.desc}
                                />
                            ))
                        }
                        <div className="empty-item"></div>
                        <div className="empty-item"></div>
                        <div className="empty-item"></div>
                    </content>
                    <Modal
                        title="新增项目"
                        visible={flag}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '项目名称不能为空!' }],
                                })(
                                    <Input
                                        placeholder="项目名称"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('url', {
                                    rules: [{ required: true, message: '项目url不能为空!' }],
                                })(
                                    <Input
                                        placeholder="项目url"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('desc')(
                                    <Input
                                        placeholder="项目描述"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    创建项目
                        </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                </div>

            </Spin>
            <style jsx >{`

            `}</style>
        </Head>
    )
}

Home.getInitialProps = async () => {
    let result = await requestGet({ url: getProjectURL })
    return { res: result.data.data }
}

const WrappedHome = Form.create({ name: 'project_create' })(Home);

export default withRouter(WrappedHome)

