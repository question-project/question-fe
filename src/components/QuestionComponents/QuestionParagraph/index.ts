/**
 * @description: 问卷段落组件
 * @author: wangqiaoling
 * @date: 2023/09/17
 */
import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'
export * from './Component'

export default {
    title: '段落',
    // 要统一
    type: 'questionParagraph',
    // 组件在画布中渲染时的组件
    Component,
    // 默认熟悉
    defaultProps: QuestionParagraphDefaultProps,
    // 属性面板中的属性
    PropComponent,
}
