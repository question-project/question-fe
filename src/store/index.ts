import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'

export type StateType = {
    user: UserStateType
}
export default configureStore({
    reducer: {
        // 分模块
        // 用户信息
        user: userReducer,
        // 问卷信息
    },
})
