import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    LOGIN_PATHNAME,
    MANAGE_INDEX_PATHNAME,
    isLoginOrRegister,
    isNoNeedUserInfo,
} from '../router'

const useNavPage = (waiting: boolean) => {
    const { username } = useGetUserInfo()

    const nav = useNavigate()

    const { pathname } = useLocation()

    useEffect(() => {
        if (waiting) {
            return
        }
        if (username) {
            if (isLoginOrRegister(pathname)) {
                // 已经登录
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }
        // 未登录
        if (!isNoNeedUserInfo(pathname)) {
            nav(LOGIN_PATHNAME)
        }
    }, [username, pathname, waiting])
}

export default useNavPage
