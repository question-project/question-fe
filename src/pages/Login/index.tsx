import React, { FC, useEffect } from 'react'
import styles from './index.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../../router'
const { Title } = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
}
const delUserFromStorage = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfoFromStorage = () => {
    return {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY),
    }
}

const Login: FC = () => {
    const [form] = Form.useForm()

    useEffect(() => {
        const { username, password } = getUserInfoFromStorage()
        form.setFieldsValue({ username, password })
    }, [])

    const onFinish = (values: any) => {
        const { username, password } = values || {}
        if (values.remember) {
            rememberUser(username, password)
        } else {
            delUserFromStorage()
        }
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    form={form}
                >
                    <Form.Item
                        label="用户名"
                        name={'username'}
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
                            { pattern: /^\w+$/, message: '只能是字母数字下划线' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name={'password'}
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name={'remember'}
                        valuePropName="checked"
                        wrapperCol={{ offset: 2, span: 16 }}
                    >
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login
