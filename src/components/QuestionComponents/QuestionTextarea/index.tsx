/**
 * @description: 多行输入
 * @author: wangqiaoling
 * @date: 2023/09/18
 */
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import { PropComponent } from './PropComponent'

export * from './interface'

export default {
    title: '输入框',
    // 要统一
    type: 'questionTextarea',
    Component,
    defaultProps: QuestionTextareaDefaultProps,
    PropComponent,
}
