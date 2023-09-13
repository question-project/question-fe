/**
 * @description 组件列表 store
 * @author: wangqiaoling
 * @date: 2023/09/13
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
    // 前端生成的 id
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType
}

export type ComponentsStateType = {
    componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
    componentList: [],
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (
            state: ComponentsStateType,
            action: PayloadAction<ComponentsStateType>
        ) => {
            return action.payload
        },
    },
})

export const { resetComponents } = componentsSlice.actions

export default componentsSlice.reducer
