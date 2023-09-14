/**
 * @description 组件列表 store
 * @author: wangqiaoling
 * @date: 2023/09/13
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'

export type ComponentInfoType = {
    // 前端生成的 id
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType
}

export type ComponentsStateType = {
    componentList: Array<ComponentInfoType>
    selectedId: string
}

const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (_, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        },

        // 修改 selectedId
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload
        }),

        // 添加新组件
        addComponent: produce(
            (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
                const newComponent = action.payload
                const { selectedId, componentList } = draft
                const selectIndex = componentList.findIndex(item => item.fe_id === selectedId)
                if (selectIndex < 0) {
                    // 未选中组件
                    draft.componentList.push(newComponent)
                } else {
                    // 插入到当前选中的组件后面
                    draft.componentList.splice(selectIndex + 1, 0, newComponent)
                }
                draft.selectedId = newComponent.fe_id
            }
        ),
    },
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer
