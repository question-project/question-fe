import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    selectNextComponent,
    selectPrevComponent,
} from '../store/componentsReducer'
import { ActionCreators } from 'redux-undo'

// 当前鼠标选中的元素 判断 activeElement 是否合法
const isActiveElementValid = () => {
    const activeEl = document.activeElement
    // 光标没有 focus 到 input 没选中
    if (activeEl === document.body) return true
    // 解决 dnd-kit 选中不能使用快捷键的问题
    if (activeEl?.matches('div[role="button"]')) return true
    return false
}

export const useBindCanvasKeyPress = () => {
    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(['backspace', 'delete'], () => {
        isActiveElementValid() && dispatch(removeSelectedComponent())
    })

    // 复制
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        isActiveElementValid() && dispatch(copySelectedComponent())
    })

    // 粘贴
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        isActiveElementValid() && dispatch(pasteCopiedComponent())
    })

    // 选中上一个
    useKeyPress('uparrow', () => {
        isActiveElementValid() && dispatch(selectPrevComponent())
    })

    // 选中下一个
    useKeyPress('downarrow', () => {
        isActiveElementValid() && dispatch(selectNextComponent())
    })

    // 撤销
    useKeyPress(
        ['ctrl.z', 'meta.z'],
        () => {
            isActiveElementValid() && dispatch(ActionCreators.undo())
        },
        {
            // 严格匹配
            exactMatch: true,
        }
    )

    // 重做
    useKeyPress(
        ['ctrl.shift.z', 'meta.shift.z'],
        () => {
            isActiveElementValid() && dispatch(ActionCreators.redo())
        },
        {
            // 严格匹配
            exactMatch: true,
        }
    )
}
