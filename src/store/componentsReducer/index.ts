/**
 * @description 组件列表 store
 * @author: wangqiaoling
 * @date: 2023/09/13
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
    // 前端生成的 id
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType
    isHidden?: boolean
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

        // 修改组件的属性
        changeComponentProps: produce(
            (
                draft: ComponentsStateType,
                action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
            ) => {
                const { fe_id, newProps } = action.payload
                const currentComp = draft.componentList.find(c => c.fe_id === fe_id)
                if (currentComp) {
                    currentComp.props = {
                        ...currentComp.props,
                        ...newProps,
                    }
                }
            }
        ),

        // 删除选中的组件
        removeSelectedComponent: produce((draft: ComponentsStateType) => {
            const { componentList, selectedId } = draft
            // 自动选中下一个组件
            draft.selectedId = getNextSelectedId(selectedId, componentList)
            // 删除选中的组件
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
            componentList.splice(selectedIndex, 1)
        }),

        // 隐藏、显示组件
        changeComponentHidden: produce(
            (
                draft: ComponentsStateType,
                action: PayloadAction<{ fe_id: string; isHidden: boolean }>
            ) => {
                const { componentList } = draft
                const { fe_id, isHidden } = action.payload

                // 重新计算 selected
                let newSelectedId = ''
                if (isHidden) {
                    // 隐藏
                    newSelectedId = getNextSelectedId(fe_id, componentList)
                } else {
                    // 显示 就选中当前的组件
                    newSelectedId = fe_id
                }
                draft.selectedId = newSelectedId

                const currentComp = componentList.find(c => c.fe_id === fe_id)
                if (currentComp) {
                    currentComp.isHidden = isHidden
                }
            }
        ),
    },
})

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
} = componentsSlice.actions

export default componentsSlice.reducer
