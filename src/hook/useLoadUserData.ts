import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
import { getUserInfoService } from '../services/user'
import useGetUserInfo from './useGetUserInfo'

const useLoadUserData = () => {
    const [waiting, setWaiting] = useState(true)

    const { username } = useGetUserInfo()

    const dispatch = useDispatch()

    useEffect(() => {
        // redux 中已经有了 user 的数据
        if (username) {
            setWaiting(false)
            return
        }
        // 没用户信息 加载
        run()
    }, [username])

    const { run } = useRequest(async () => await getUserInfoService(), {
        manual: true,
        onSuccess: res => {
            const { username, nickname } = res
            // 将信息存储到 redux 中
            dispatch(loginReducer({ username, nickname }))
        },
        onFinally: () => {
            setWaiting(false)
        },
    })
    // 加载完用户信息之后，放在 redux 中，不用返回
    return { waiting }
}

export default useLoadUserData
