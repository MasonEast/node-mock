
import Router, { withRouter } from 'next/router'
import { Button, Modal, Form, Spin, Input, message } from 'antd'
import Card from '../components/card';
import { requestGet, requestPost } from '../utils/request'
import URL from '../config/url'
import { useState } from 'react'
import Head from '../components/head'
import LoginModal from '../components/login-modal'

const { getProjectURL, addProjectURL, deleteProjectURL } = URL

const Home = ({ res = [], form }) => {
    const [flag, setFlag] = useState(false)
    const [spinFlag, setSpinFlag] = useState(false)
    const [modalFlag, setModalFlag] = useState(false)
    const [isLogin, setIsLogin] = useState({
        status: false,
        email: ''
    })
    const [list, setList] = useState(res)
    const { getFieldDecorator } = form;
    const handleOk = e => {
        setFlag(false)
    };

    const handleCancel = e => {
        setFlag(false)
    };

    const handleSubmit = e => {
        if (!isLogin.status) {
            message.error('您还没有登录， 不能新建项目')
            setFlag(false)
            return
        }
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                values.user_id = isLogin.email
                await requestPost({ url: addProjectURL, body: values })
                let res = await requestGet({ url: getProjectURL, query: { user_id: isLogin.email } })
                res.data.status ? message(res.data.data) : setList(res.data.data)
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

    const onLogin = async (email) => {
        setIsLogin({
            status: true,
            email
        })
        console.log(email)
        let res = await requestGet({ url: getProjectURL, query: { user_id: email } })
        console.log(res)
        res.data.status ? message(res.data.data) : setList(res.data.data)
    }

    const deleteProject = async (e, id) => {
        e.stopPropagation()
        await requestPost({ url: deleteProjectURL, body: { id }, method: 'delete' })
        let res = await requestGet({ url: getProjectURL, query: { user_id: isLogin.email } })
        res.data.status ? message(res.data.data) : setList(res.data.data)
    }

    return (
        <Head>
            <Spin tip="Loading..." spinning={spinFlag}>
                <div className="home-box">
                    <LoginModal
                        visible={modalFlag}
                        onCancel={() => setModalFlag(false)}
                        isLogin={isLogin.status}
                        onLogin={onLogin}
                    />
                    <header className="home-header">
                        {
                            isLogin.status
                                ?
                                <div className="header-box-tab-login" >欢迎, {isLogin.email} <span onClick={() => setIsLogin({ status: false, email: '' })}>退出</span></div>
                                :
                                <div className="header-box-tab-nologin" onClick={() => setModalFlag(true)}>登录/注册</div>
                        }
                    </header>
                    <Button style={{ width: '100%', height: '50px', marginBottom: '50px' }} onClick={handleAdd}>添加项目</Button>
                    {
                        isLogin.status
                            ?
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
                            :
                            <h3 className='nologin-text'>登录之后才能看到自己的项目哦</h3>
                    }
                    <Modal
                        title="新增项目"
                        visible={flag}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form className="login-form">
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
                                {getFieldDecorator('desc', {
                                    rules: [{ required: true, message: '项目描述不能为空!' }],
                                })(
                                    <Input
                                        placeholder="项目描述"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleSubmit} className="login-form-button">
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

// Home.getInitialProps = async () => {
//     let result = await requestGet({ url: getProjectURL })
//     return { res: result.data.data }
// }

const WrappedHome = Form.create({ name: 'project_create' })(Home);

export default withRouter(WrappedHome)

