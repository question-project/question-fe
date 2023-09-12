import React from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../../router'
import { UserAddOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import useGetUserInfo from '../../hook/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../../store/userReducer'

const UserInfo = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { username, nickname } = useGetUserInfo()

    const logout = () => {
        // 清空了 redux 的 user 数据
        dispatch(logoutReducer())
        // 登出
        message.success('退出成功')
        nav(LOGIN_PATHNAME)
    }
    const UserInfoElem = (
        <>
            <span>
                <UserAddOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={logout}>
                退出
            </Button>
        </>
    )
    const LoginElem = <Link to={LOGIN_PATHNAME}>登录</Link>
    return <div className={styles.container}>{username ? UserInfoElem : LoginElem}</div>
}
export default UserInfo
