import Component from './Components'
import { QuestionTitleDefaultProps } from './interface'
import { PropComponent } from './PropComponent'

export * from './interface'
export * from './Components'

export default {
    title: '输入框',
    // 要统一
    type: 'questionTitle',
    Component,
    defaultProps: QuestionTitleDefaultProps,
    PropComponent,
}
