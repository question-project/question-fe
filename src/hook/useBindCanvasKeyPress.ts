import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    selectNextComponent,
    selectPrevComponent,
} from '../store/componentsReducer'

// 当前鼠标选中的元素 判断 activeElement 是否合法
const isActiveElementValid = () => {
    const activeEl = document.activeElement
    // 光标没有 focus 到 input
    if (activeEl === document.body) return true
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
}
