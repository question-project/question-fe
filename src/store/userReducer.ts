import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
    username: string
    nickname: string
}

const INIT_STATE: UserStateType = {
    username: '',
    nickname: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: INIT_STATE,
    reducers: {
        loginReducer: (_, action: PayloadAction<UserStateType>) => {
            // 登录时 设置 username 和 nickname 到 redux store 中
            return action.payload
        },
        logoutReducer: () => INIT_STATE,
    },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
