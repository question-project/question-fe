import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import { PropComponent } from './PropComponent'

export * from './interface'
export * from './Component'

export default {
    title: '输入框',
    // 要统一
    type: 'questionTitle',
    // 组件在画布中渲染时的组件
    Component,
    // 默认熟悉
    defaultProps: QuestionTitleDefaultProps,
    // 属性面板中的属性
    PropComponent,
}
