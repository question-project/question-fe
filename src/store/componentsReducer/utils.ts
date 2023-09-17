import { ComponentInfoType, ComponentsStateType } from '.'

/**
 * 获取下一个 selectedId
 * @param fe_id 当前的id
 * @param componentList 组件列表
 * @returns 下一个 selectedId
 */
export const getNextSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
    const visibleComponentList = componentList.filter(c => !c.isHidden)
    const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
    if (index < 0) {
        return ''
    }

    let newSelectedId = ''
    const len = visibleComponentList.length
    if (len <= 1) {
        // 组件中只有一个 被删除了 就没有组件了
        newSelectedId = ''
    } else {
        if (index + 1 === len) {
            // 要删除的是最后一个组件
            newSelectedId = visibleComponentList[index - 1].fe_id
        } else {
            // 被删除后 选中下一个
            newSelectedId = visibleComponentList[index + 1].fe_id
        }
    }

    return newSelectedId
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
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
