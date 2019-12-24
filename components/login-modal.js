import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd'
import { requestPost } from '../utils/request'
import URL from '../config/url'

const { loginURL, registerURL } = URL

class LoginModal extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        e.persist()
        let formData = ''
        this.props.form.validateFields((err, values) => {
            if (!err) {
                formData = values
            }
        });
        if (e.target.innerText === 'Login') {
            requestPost({ url: loginURL, body: formData }).then(res => {
                !res.data.status && this.loginSuccess(res.data.data.email)
            })

        } else {
            requestPost({ url: registerURL, body: formData }).then(res => {
                console.log(res)
                !res.data.status && this.loginSuccess(res.data.data.email)
            })
        }
    };

    loginSuccess (email) {
        this.props.onCancel()
        this.props.onLogin(email)
    }

    render () {
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title='登录/注册'
                visible={visible}
                onCancel={onCancel}
                footer={[]}
                className="login-modal"
            >

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item >
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input placeholder="请输入您的邮箱~" />)}
                    </Form.Item>
                    <Form.Item key="password" >
                        {getFieldDecorator('password', {})(
                            <Input type="password" placeholder="请输入您的密码~" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ marginRight: '5px' }} type="primary" onClick={this.handleSubmit}>Login</Button>
                        <Button onClick={this.handleSubmit}>Register</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const Loginmodal = Form.create({ name: 'Loginmodal' })(LoginModal);

export default Loginmodal