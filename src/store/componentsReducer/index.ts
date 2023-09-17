/**
 * @description 组件列表 store
 * @author: wangqiaoling
 * @date: 2023/09/13
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'

export type ComponentInfoType = {
    // 前端生成的 id
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType
    isHidden?: boolean
    isLocked?: boolean
}

export type ComponentsStateType = {
    componentList: Array<ComponentInfoType>
    selectedId: string
    copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
    copiedComponent: null,
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
                insertNewComponent(draft, newComponent)
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

        // 锁定 / 解锁 组件
        toggleComponentLocked: produce(
            (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
                const { fe_id } = action.payload
                const currentComp = draft.componentList.find(c => c.fe_id === fe_id)
                if (currentComp) {
                    currentComp.isLocked = !currentComp.isLocked
                }
            }
        ),

        // 拷贝当前选中的组件
        copySelectedComponent: produce((draft: ComponentsStateType) => {
            const { selectedId, componentList } = draft
            const currentComp = componentList.find(c => c.fe_id === selectedId)
            if (currentComp == null) return
            // 必须深拷贝
            draft.copiedComponent = cloneDeep(currentComp)
        }),

        // 粘贴
        pasteCopiedComponent: produce((draft: ComponentsStateType) => {
            const { copiedComponent } = draft
            if (copiedComponent == null) return

            // 修改 fe_id
            copiedComponent.fe_id = nanoid()
            // 插入 copiedComponent
            insertNewComponent(draft, copiedComponent)
        }),

        // 选中上一个
        selectPrevComponent: produce((draft: ComponentsStateType) => {
            const { selectedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
            // 未选中
            if (selectedIndex < 0) return
            // 选中了第一个
            if (selectedIndex === 0) return

            draft.selectedId = componentList[selectedIndex - 1].fe_id
        }),

        // 选中下一个
        selectNextComponent: produce((draft: ComponentsStateType) => {
            const { selectedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
            // 未选中
            if (selectedIndex < 0) return
            // 选中了最后一个
            if (selectedIndex + 1 === componentList.length) return
            draft.selectedId = componentList[selectedIndex + 1].fe_id
        }),
    },
})

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
